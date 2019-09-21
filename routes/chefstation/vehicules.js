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
      res.redirect('/admin/vehicules')
    })
    .catch(error => {
      res.redirect('/404')
    })
})


router.get('/supprimer', checkUserConnected, function (req, res) {
  vehiculeDao.deletVehicule(req.query.numserie)
    .then(result => {
      res.redirect('/admin/vehicules')
    })
    .catch(error => {
      res.redirect('/404')
    })
});

router.get('/modifier', checkUserConnected, function (req, res) {
  vehiculeDao.getVehicule(req.query.numserie)
    .then(vehicule => {
      res.render('admin/vehicule/modifier', { vehicule: vehicule[0] })
    })
    .catch(error => {
      res.redirect('/404')
    })
});


router.post('/modifier', checkUserConnected, function (req, res) {

  let { proprietaire, numserie, nbPlaces, tel, idvehicule } = req.body
  let newVehicule = new Vehicule(proprietaire, numserie, nbPlaces, tel, '')

  vehiculeDao.updateVehicule(newVehicule, idvehicule)
    .then(result => {
      res.redirect('/admin/vehicules')
    })
    .catch(error => {
      res.redirect('/404')
    })
});


module.exports = router