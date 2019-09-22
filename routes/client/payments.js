var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var reservDao = require('../../dao/reservations.dao')
var paymentDao = require('../../dao/payments.dao')
var Payment = require('../../model/Payment.model')

router.get('/', [checkUserConnected], (req, res) => {

  let { id_reservation } = req.body
  let { email } = req.session.userInfo

  reservDao.getReservByUser(email)
    .then(reservs => {
      res.render('client/payments', { reservation: reservs[0] })
    })
    .catch(error => {
      res.render('client/payments', { reservation: id_reservation })
    })
})

router.post('/confirmer', checkUserConnected, (req, res) => {
  let { idreservation, numcarte } = req.body
  let { id } = req.session.userInfo

  let newPayment = new Payment(numcarte, idreservation, id)

  paymentDao.addPayment(newPayment)
    .then(result => {
      if (Object.keys(result).length > 2 && result.affectedRows === 1) {
        reservDao.updateEtatReserv('payer', idreservation)
          .then(resEtat => {
            res.render('client/payments', { msg: 'Merci, votre paiment a été bien effectuer' })
          })
          .catch(errEtat => {
            res.redirect('/404')
          })
      }
      else res.render('client/payments', { msg: 'erreur de paiment! ressayer plutard..' })
    })
    .catch(error => {
      res.render('/404')
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