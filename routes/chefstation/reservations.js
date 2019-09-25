var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var reservDao = require('../../dao/reservations.dao')
var paymentDao = require('../../dao/payments.dao')

router.get('/', checkUserConnected, (req, res) => {

  let { id_station, nom_station } = req.session.chefStationInfo
  let { b, e } = req.query

  reservDao.getReservsVoyagesUsers(id_station)
    .then(reservations => {
      reservations = isNaN(b) || isNaN(e)
        ? reservations = reservations.slice(0, 5) : b < 0 && e < 5
          ? reservations = reservations.slice(0, 5) : reservations.slice(b || 0, e || 5)
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