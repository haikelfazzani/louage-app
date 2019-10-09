var router = require('express').Router()
var { checkUserConnected, checkUserRoleChef } = require('../../middleware/authorisation')

var vehiculeDao = require('../../dao/vehicules.dao')
var voyagesDao = require('../../dao/voyages.dao')
var Voyage = require('../../model/Voyage.model')
var uniqid = require('uniqid')

router.get('/', [checkUserConnected, checkUserRoleChef], (req, res) => {
  let { id_station, nom_station } = req.session.chefStationInfo
  voyagesDao.getVoyageByStation(id_station)
    .then((voyages) => {
      voyages.sort((i, j) => Date.parse(j.timestamp_voyage) - Date.parse(i.timestamp_voyage))
      res.render('chefstation/voyage/lister', { voyages, nom_station })
    })
    .catch(e => {
      res.render('chefstation/voyage/lister')
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
  let { id_station, vehicule, arrive, heureDepart, dateDepart, prixPlace, nbPlaces } = req.body
  let newVoyage = new Voyage(uniqid(), arrive, heureDepart, dateDepart, prixPlace, nbPlaces, id_station, vehicule)

  voyagesDao.addVoyage(newVoyage)
    .then(r => {
      res.redirect('/chefstation/voyages')
    })
    .catch(e => {
      res.render('chefstation/voyage/ajout', { msg: 'erreur d\'ajout' })
    })
})

router.get('/supprimer', [checkUserConnected, checkUserRoleChef], function (req, res) {
  voyagesDao.deletVoyage(req.query.voyage)
    .then(r => { res.redirect('/chefstation/voyages') })
    .catch(e => { res.redirect('/chefstation/voyages') })
})

router.get('/modifier', [checkUserConnected, checkUserRoleChef], (req, res) => {
  voyagesDao.getVoyageById(req.query.v)
    .then(r => { res.render('chefstation/voyage/modifier', { voyage: r[0] }) })
    .catch(e => { res.render('chefstation/voyage/modifier') })
})

router.post('/modifier', [checkUserConnected, checkUserRoleChef], (req, res) => {
  let { uidvoyage, arrive, heureDepart, dateDepart, prixPlace, nbPlaces } = req.body
  let newVoyage = new Voyage(uidvoyage, arrive, heureDepart, dateDepart, prixPlace, nbPlaces, '', '')
  voyagesDao.updateVoyage(newVoyage)
    .then(r => { res.redirect('/chefstation/voyages') })
    .catch(e => { res.redirect('/chefstation/voyages') })
})
module.exports = router