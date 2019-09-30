var router = require('express').Router()
var { checkUserConnected, checkIsClient } = require('../../middleware/authorisation')
var uniqid = require('uniqid')

var reservDao = require('../../dao/reservations.dao')
var voyageDao = require('../../dao/voyages.dao')
var paymentDao = require('../../dao/payments.dao')
var Payment = require('../../model/Payment.model')
var Reservation = require('../../model/Reservation')

router.get('/', [checkUserConnected, checkIsClient], (req, res) => {

  let reservInfo = JSON.parse(req.cookies.vosreservations)
  let { nbplaces, total, uidvoyage } = reservInfo

  voyageDao.getVoyageById(uidvoyage)
    .then(voyages => {
      res.render('client/payments', {
        nbplacesreserv: nbplaces, total, voyage: voyages[0], uidvoyage
      })
    })
    .catch(e => {
      res.redirect('/404')
    })
})

router.post('/confirmer', [checkUserConnected, checkIsClient], (req, res) => {
  let { numcarte, nbplacesreserv, total, nb_places, uidvoyage } = req.body
  let { id } = req.session.userInfo

  let newReserv = new Reservation(uidvoyage, nbplacesreserv, total, 'payer', id, uidvoyage)
  let newPayment = new Payment(uidvoyage, numcarte, uidvoyage)

  Promise.all([
    voyageDao.updateNbPlaces(((+nb_places) - (+nbplacesreserv)), uidvoyage),
    reservDao.addReservation(newReserv),
    paymentDao.addPayment(newPayment)
  ])
    .then(values => {
      res.cookie('payment', JSON.stringify({ newReserv, numcarte, uidvoyage }), { maxAge: 1000 * 60 * 30 })
      res.redirect('/ticket')
    })
    .catch(error => {
      res.render('client/payments')
    })
})

module.exports = router