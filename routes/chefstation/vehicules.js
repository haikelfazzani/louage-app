var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var vehiculeDao = require('../../dao/vehicules.dao')
var stationDao = require('../../dao/stations.dao')
var Vehicule = require('../../model/Vehicule.model')

router.get('/', checkUserConnected, (req, res) => {
  let { id } = req.session.userInfo
  vehiculeDao.getVehicules(id)
    .then(vehicules => {
      res.render('admin/vehicule/lister', { vehicules })
    })
    .catch(error => {
      res.render('admin/vehicule/lister')
    })
})


router.get('/ajout', checkUserConnected, (req, res) => {
  let { email } = req.session.userInfo
  stationDao.getStationByChef(email)
    .then(stations => {
      res.render('admin/vehicule/ajout', { station: stations[0] })
    })
    .catch(error => {
      res.render('admin/vehicule/ajout')
    })
})

router.post('/ajout', checkUserConnected, (req, res) => {

  let { id_station } = req.session.chefStationInfo
  let { proprietaire, numSerie, nbPlaces, tel } = req.body
  let newVehicule = new Vehicule(proprietaire, numSerie, nbPlaces, tel, id_station)

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