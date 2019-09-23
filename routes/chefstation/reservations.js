var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var reservDao = require('../../dao/reservations.dao')
var paymentDao = require('../../dao/payments.dao')

router.get('/', checkUserConnected, (req, res) => {

  let { id_station, nom_station } = req.session.chefStationInfo

  reservDao.getReservsVoyagesUsers(id_station)
    .then(reservations => {
      res.render('admin/reservation/index', { reservations, nom_station })
    })
    .catch(error => {
      res.render('admin/reservation/index')
    })
})

router.get('/annuler', checkUserConnected, (req, res) => {

  let { r } = req.query

  Promise.all([
    paymentDao.cancelPayment(r),
    reservDao.updateEtatReserv('annuler', r)
  ])
    .then(values => {
      res.redirect('/admin/reservations')
    })
    .catch(error => {
      res.redirect('/404')
    })
})

module.exports = router