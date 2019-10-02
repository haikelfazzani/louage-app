var router = require('express').Router()
var { checkUserConnected, checkIsClient } = require('../../middleware/authorisation')

var reservDao = require('../../dao/reservations.dao')
var voyageDao = require('../../dao/voyages.dao')
var paymentDao = require('../../dao/payments.dao')

router.get('/', [checkUserConnected, checkIsClient], (req, res) => {

  voyageDao.getVoyageById(req.query.v)
    .then(r => {
      res.render('client/reservations', { voyage: r[0] })
    })
    .catch(e => {
      res.redirect('/404')
    })
})

router.get('/all', [checkUserConnected, checkIsClient], (req, res) => {

  let { email } = req.session.userInfo

  reservDao.getReservByUser(email)
    .then(reservations => {

      let current = Date.parse(new Date());
      reservations = reservations.map(v => {
        let hToMilli = (1000 * 60 * 60 * (parseInt(v.heure_depart, 10) - 1))
        let d = Date.parse(v.date_depart) + hToMilli - (1000 * 60 * 15)
        v.out = current > d
        return v
      })

      reservations.sort((i, j) => Date.parse(j.timestamp_reservation) - Date.parse(i.timestamp_reservation))
      res.render('client/profile/reservations', { reservations })
    })
    .catch(error => {
      res.redirect('/utilisateur/profile')
    })
})

router.post('/ajout', [checkUserConnected, checkIsClient], (req, res) => {
  res.cookie('vosreservations', JSON.stringify(req.body), { maxAge: 1000 * 60 * 10 })
  res.redirect('/payments')
})

router.get('/annuler', [checkUserConnected, checkIsClient], function (req, res) {
  let { r, v, nb } = req.query
  Promise.all([
    voyageDao.updateNbPlaces(nb, v, 'inc'),
    reservDao.updateEtatReserv('annuler', r),
    paymentDao.cancelPayment(r)
  ])
    .then(values => {
      res.redirect('/reservations/all')
    })
    .catch(e => {
      res.redirect('/404')
    })
})
module.exports = router