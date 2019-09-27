var router = require('express').Router()
var { checkUserConnected, checkIsClient } = require('../../middleware/authorisation')

var reservDao = require('../../dao/reservations.dao')
var voyageDao = require('../../dao/voyages.dao')
var paymentDao = require('../../dao/payments.dao')

router.get('/', [checkUserConnected, checkIsClient], (req, res) => {

  let selectedVoyage = JSON.parse(Buffer.from(req.query.v, 'base64').toString())
  let { destination, nom_station, timestamp_voyage } = selectedVoyage

  Promise.all([
    voyageDao.nbPlacesByDestination(destination, timestamp_voyage, nom_station),
    voyageDao.getVoyageByDateAndStation(destination, timestamp_voyage, nom_station)
  ])
    .then(values => {

      res.render('client/reservations', {
        voyage: selectedVoyage,
        nbPlaces: values[0][0].nb,
        station: nom_station
      })
    })
    .catch(errorV => {
      res.redirect('/404')
    })
})

router.get('/all', (req, res) => {

  let { email } = req.session.userInfo
  let { b, e } = req.query

  reservDao.getReservByUser(email)
    .then(reservations => {

      let current = Date.parse(new Date());
      reservations = reservations.map(v => {
        let hToMilli = (1000 * 60 * 60 * (parseInt(v.heure_depart, 10) - 1))
        let d = Date.parse(v.date_depart) + hToMilli - (1000 * 60 * 15)
        v.out = current > d
        return v
      })

      reservations = isNaN(+b) || isNaN(+e)
        ? reservations.slice(0, 10) : b < 0 && e < 10
          ? reservations.slice(0, 10) : reservations.slice(b || 0, e || 10);

      reservations.sort((i, j) => Date.parse(j.date_depart) - Date.parse(i.date_depart))

      res.render('client/profile/reservations', { reservations })
    })
    .catch(error => {
      res.redirect('/utilisateur/profile')
    })
})

router.post('/ajout', checkUserConnected, (req, res) => {
  let { nbplaces, total, idvoyage } = req.body

  res.cookie('vosreservations',
    JSON.stringify({ nbplaces, total, idvoyage }), { maxAge: 1000 * 60 * 10 })
  res.redirect('/payments')
})

router.get('/annuler', [checkUserConnected, checkIsClient], function (req, res) {
  let { r } = req.query

  Promise.all([
    reservDao.updateEtatReserv('annuler', r),
    paymentDao.cancelPayment(r)
  ])
    .then(values => {
      res.redirect('/reservations/all')
    })
    .catch(error => {
      res.redirect('/404')
    })
})
module.exports = router