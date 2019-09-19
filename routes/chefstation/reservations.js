var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var reservDao = require('../../dao/reservations.dao')
var Reservation = require('../../model/Reservation')

router.get('/', (req, res) => {
  res.render('reservations')
})


router.get('/ajout', (req, res) => {
  stationDao.getStations()
    .then(stations => {
      res.render('admin/vehicule/ajout', { stations })
    })
    .catch(error => {
      res.render('admin/vehicule/ajout')
    })
})

router.post('/ajout', (req, res) => {

  let { proprietaire, numSerie, nbPlaces, tel, station } = req.body
  let newVehicule = new Vehicule(proprietaire, numSerie, nbPlaces, tel, station)

  vehiculeDao.addVehicule(newVehicule)
    .then(result => {
      res.redirect('/admin/vehicules')
    })
    .catch(error => {
      res.redirect('/admin/vehicules')
    })
})


router.get('/supprimer', checkUserConnected, function (req, res) {
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