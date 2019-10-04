var router = require('express').Router()
var { checkUserConnected, checkUserRoleChef } = require('../../middleware/authorisation')

var vehiculeDao = require('../../dao/vehicules.dao')
var voyagesDao = require('../../dao/voyages.dao')
var Voyage = require('../../model/Voyage.model')
var uniqid = require('uniqid')

router.get('/', [checkUserConnected, checkUserRoleChef], (req, res) => {
  let { id_station, nom_station } = req.session.chefStationInfo

  voyagesDao.getVoyageByStation(id_station)
    .then(function (voyages) {
      res.cookie('voyages', JSON.stringify(voyages), { maxAge: 60 * 1000 * 5, httpOnly: true })

      voyages.sort((i, j) => Date.parse(j.timestamp_voyage) - Date.parse(i.timestamp_voyage))
      res.render('chefstation/voyage/lister', { voyages, nom_station })
    })
    .catch(e => {
      res.render('chefstation/voyage/lister');
    });
})

router.get('/ajout', [checkUserConnected, checkUserRoleChef], (req, res) => {
  let { id_station, nom_station } = req.session.chefStationInfo

  vehiculeDao.getVehicules()
    .then(result => {
      res.render('chefstation/voyage/ajout', { vehicules: result, id_station, nom_station })
    })
    .catch(v => {
      res.redirect('/404')
    })
})

router.post('/ajout', [checkUserConnected, checkUserRoleChef], (req, res) => {
  let { id_station, vehicule, destination, heureDepart, dateDepart, prixPlace, nbPlaces } = req.body
  let newVoyage = new Voyage(uniqid(), destination, heureDepart, dateDepart, prixPlace, nbPlaces, id_station, vehicule)

  voyagesDao.addVoyage(newVoyage)
    .then(result => {
      res.redirect('/chefstation/voyages')
    })
    .catch(error => {
      res.render('chefstation/voyage/ajout', { msg: 'erreur d\'ajout' })
    })
})

router.get('/supprimer', [checkUserConnected, checkUserRoleChef], function (req, res) {
  let { voyage } = req.query

  voyagesDao.deletVoyage(voyage)
    .then(result => {
      res.redirect('/chefstation/voyages')
    })
    .catch(error => {
      res.redirect('/chefstation/voyages')
    })
})

router.get('/modifier', [checkUserConnected, checkUserRoleChef], (req, res) => {
  let { v } = req.query
  let voyage = (JSON.parse(req.cookies.voyages)).find(vo => vo.uid_voyage === v)
  res.render('chefstation/voyage/modifier', { voyage })
})

router.post('/modifier', [checkUserConnected, checkUserRoleChef], (req, res) => {
  let { uidvoyage, destination, heureDepart, dateDepart, prixPlace, nbPlaces, idvoyage } = req.body
  let newVoyage = new Voyage(uidvoyage, destination, heureDepart, dateDepart, prixPlace, nbPlaces, '', '')

  voyagesDao.updateVoyage(newVoyage)
    .then(result => {
      res.redirect('/chefstation/voyages')
    })
    .catch(error => {
      res.redirect('/chefstation/voyages')
    })
})
module.exports = router