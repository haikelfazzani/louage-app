var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var reservDao = require('../../dao/reservations.dao')
var Reservation = require('../../model/Reservation')
var voyageDao = require('../../dao/voyages.dao')
var EtatReser = require('../../model/EtatReservation.enum')

var objContainsSQL = require('../../util/objContainsSQL')

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

router.get('/', (req, res) => {
  
  let allVoyages = JSON.parse(req.query.v)
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

  reservDao.getReservByUser(email)
    .then(reservations => {
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