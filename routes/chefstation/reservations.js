var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var reservDao = require('../../dao/reservations.dao')
var Reservation = require('../../model/Reservation')

router.get('/', checkUserConnected, (req, res) => {
  let { id_station } = req.session.chefStationInfo
  reservDao.getReservsVoyagesUsers(id_station)
    .then(reservations => {
      res.render('admin/reservation/index', { reservations })
    })
    .catch(error => {
      res.render('admin/reservation/index')
    })
})

module.exports = router