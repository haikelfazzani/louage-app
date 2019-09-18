var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var vehiculeDao = require('../../dao/vehicules.dao')
var stationDao = require('../../dao/stations.dao')
var Vehicule = require('../../model/Vehicule.model')

router.get('/', checkUserConnected, (req, res) => {
  vehiculeDao.getVehicules()
    .then(vehicules => {
      res.render('admin/vehicule/lister', { vehicules })
    })
    .catch(error => {
      res.render('admin/vehicule/lister')
    })
})


router.get('/ajout', checkUserConnected, (req, res) => {
  stationDao.getStations()
    .then(stations => {
      res.render('admin/vehicule/ajout', { stations })
    })
    .catch(error => {
      res.render('admin/vehicule/ajout')
    })
})

router.post('/ajout', checkUserConnected, (req, res) => {

  let { proprietaire, numSerie, nbPlaces, tel, station } = req.body
  let newVehicule = new Vehicule(proprietaire, numSerie, nbPlaces, tel, station)

  vehiculeDao.addVehicule(newVehicule)
    .then(result => {
      res.render('admin/vehicule/ajout', { msg: 'une nouvelle véhicule à été bien ajoutée' })
    })
    .catch(error => {
      res.render('admin/vehicule/ajout', { msg: 'erreur d\'ajout' })
    })
})

module.exports = router