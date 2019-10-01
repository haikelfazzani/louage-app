var router = require('express').Router()
var { checkUserConnected, checkUserRoleChef } = require('../../middleware/authorisation')

var reservDao = require('../../dao/reservations.dao')
var paymentDao = require('../../dao/payments.dao')

router.get('/', [checkUserConnected, checkUserRoleChef], (req, res) => {

  let { id_station, nom_station } = req.session.chefStationInfo

  reservDao.getReservsVoyagesUsers(id_station)
    .then(reservations => {

      let current = Date.parse(new Date());
      reservations = reservations.map(v => {
        let hToMilli = (1000 * 60 * 60 * (parseInt(v.heure_depart, 10) - 1))
        let d = Date.parse(v.date_depart) + hToMilli - (1000 * 60 * 15)
        v.out = current > d
        return v
      })

      reservations.sort((i, j) => Date.parse(j.timestamp_reservation) - Date.parse(i.timestamp_reservation))
      res.render('chefstation/reservation/index', { reservations, nom_station })
    })
    .catch(error => {
      res.render('chefstation/reservation/index')
    })
})

router.get('/annuler', [checkUserConnected, checkUserRoleChef], (req, res) => {

  let { r } = req.query

  Promise.all([
    paymentDao.cancelPayment(r),
    reservDao.updateEtatReserv('annuler', r)
  ])
    .then(values => {
      res.redirect('/chefstation/reservations')
    })
    .catch(error => {
      res.redirect('/404')
    })
})

module.exports = router