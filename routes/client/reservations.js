var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var reservDao = require('../../dao/reservations.dao')
var Reservation = require('../../model/Reservation')
var voyageDao = require('../../dao/voyages.dao')
var EtatReser = require('../../model/EtatReservation.enum')

function checkValidParam (req, res, next) {
  try {
    let { destination, station, date } = req.query;

    if ((!destination && destination.length < 3) && !station && !date) {
      res.redirect('/404')
    }
    next()
  } catch (error) {
    res.redirect('/404')
  }
}

router.get('/', [checkUserConnected, checkValidParam], (req, res) => {

  let { destination, station, date } = req.query;

  Promise.all([
    voyageDao.nbPlacesByDestination(destination, station),
    voyageDao.getVoyageByDateAndStation(date, station)
  ])
    .then(values => {

      let nbPlaces = values[0][0].nb

      if (nbPlaces < 1) {
        res.redirect('/')
      }

      res.render('client/reservations', { voyage: values[1][0], nbPlaces })
    })
    .catch(errorV => {
      res.redirect('/')
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
  let { nbplaces, total, idvoyage, nbplacesv } = req.body
  let { id } = req.session.userInfo;

  let reserv = new Reservation(+nbplaces, total, EtatReser.enAttente, id, +idvoyage)

  Promise.all([
    reservDao.addReservation(reserv),
    voyageDao.updateNbPlaces(+(nbplacesv - nbplaces), idvoyage)
  ])
    .then(result => {
      res.redirect('/payments')
    })
    .catch(error => {
      res.redirect('/payments')
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