var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var reservDao = require('../../dao/reservations.dao')
var voyageDao = require('../../dao/voyages.dao')
var paymentDao = require('../../dao/payments.dao')

function checkValidParam (req, res, next) {

  try {
    let { destination, station, date } = req.query

    if (destination && station && date) {
      res.redirect('/404')
    }
    else next()
  } catch (error) {
    res.redirect('/404')
  }
}

router.get('/', checkUserConnected, (req, res) => {

  let allVoyages = JSON.parse(Buffer.from(req.query.v, 'base64').toString())
  let { destination, nom_station, timestamp_voyage } = allVoyages

  Promise.all([
    voyageDao.nbPlacesByDestination(destination, timestamp_voyage, nom_station),
    voyageDao.getVoyageByDateAndStation(destination, timestamp_voyage, nom_station)
  ])
    .then(values => {

      res.render('client/reservations', {
        voyage: allVoyages,
        nbPlaces: values[0][0].nb,
        station: nom_station
      })
    })
    .catch(errorV => {
      res.redirect('/404')
    })
})


router.get('/all', checkUserConnected, (req, res) => {

  let { email } = req.session.userInfo
  let { b, e } = req.query

  reservDao.getReservByUser(email)
    .then(reservations => {

      reservations = isNaN(b) || isNaN(e)
        ? reservations = reservations.slice(0, 5) : b < 0 && e < 5
        ? reservations = reservations.slice(0, 5) : reservations.slice(b || 0, e || 5)

      reservations.sort((i, j) => i.heure_depart >= j.heure_depart && Date.parse(i.date_depart) >= Date.parse(j.date_depart))
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


router.get('/annuler', checkUserConnected, function (req, res) {
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
});

module.exports = router