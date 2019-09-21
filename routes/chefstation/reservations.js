var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var reservDao = require('../../dao/reservations.dao')
var Reservation = require('../../model/Reservation')

router.get('/', checkUserConnected, (req, res) => {
  reservDao.getReservsVoyagesUsers()
    .then(reservations => {
      res.render('admin/reservation/index', { reservations })
    })
    .catch(error => {
      res.render('admin/reservation/index')
    })
})

module.exports = router