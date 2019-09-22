var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')
var uniqid = require('uniqid')

var reservDao = require('../../dao/reservations.dao')
var voyageDao = require('../../dao/voyages.dao')
var paymentDao = require('../../dao/payments.dao')
var Payment = require('../../model/Payment.model')
var Reservation = require('../../model/Reservation')

router.get('/', [checkUserConnected], (req, res) => {

  let reservInfo = JSON.parse(req.cookies.vosreservations)
  let { nbplaces, total, idvoyage } = reservInfo

  voyageDao.getVoyageById(idvoyage)
    .then(voyages => {
      res.render('client/payments', {
        nbplacesreserv: nbplaces, total, voyage: voyages[0], uidreserv: uniqid()
      })
    })
    .catch(error => {
      res.redirect('/404')
    })
})

router.post('/confirmer', checkUserConnected, (req, res) => {
  let { uidreserv, numcarte, nbplacesreserv, total, nb_places, idvoyage } = req.body
  let { id } = req.session.userInfo

  let newReserv = new Reservation(uidreserv, nbplacesreserv, total, 'payer', id, idvoyage)
  let newPayment = new Payment(uidreserv, numcarte, uidreserv, id)

  Promise.all([
    voyageDao.updateNbPlaces(((+nb_places) - (+nbplacesreserv)), idvoyage),
    reservDao.addReservation(newReserv),
    paymentDao.addPayment(newPayment)
  ])
    .then(values => {
      res.cookie('payment', JSON.stringify([newReserv,newPayment]),{maxAge:1000*60*30})
      res.redirect('/ticket')
    })
    .catch(error => {
      res.render('client/payments')
    })
})


router.get('/annuler', checkUserConnected, function (req, res) {
  let { numserie } = req.query

  vehiculeDao.deletVehicule(numserie)
    .then(result => {
      res.redirect('/admin/vehicules')
    })
    .catch(error => {
      res.redirect('/admin/vehicules')
    })
});

module.exports = router