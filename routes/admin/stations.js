var express = require('express');
var router = express.Router();

var Station = require('../../model/Station.model');
var stationDao = require('../../dao/stations.dao');
var utilisateurDao = require('../../dao/utilisateurs.dao');

var { checkUserConnected, checkUserRoleAdmin } = require('../../middleware/authorisation')

router.get('/', [checkUserConnected, checkUserRoleAdmin], (req, res) => {

  stationDao.getStations()
    .then(function (stations) {
      res.render('admin/station/lister', { stations })
    })
    .catch(error => {
      res.render('admin/station/lister')
    })
})

router.get('/ajout', [checkUserConnected, checkUserRoleAdmin], (req, res) => {
  utilisateurDao.getUserByRole('chef_station')
    .then(chefStations => {
      req.session.chefStations = chefStations
      res.render('admin/station/ajout', { chefStations })
    })
    .catch(e => {
      res.redirect('/admin')
    })
})

router.post('/ajout', [checkUserConnected, checkUserRoleAdmin], function (req, res) {
  let { chef, nom, ville, tel } = req.body;

  let station = new Station(nom, ville, tel, chef)

  stationDao.addStation(station)
    .then(result => {
      res.render('admin/station/ajout', { msg: 'une station a été bien ajoutée' });
    })
    .catch(error => {
      res.render('admin/station/ajout', {
        msg: 'Erreur d\'ajout! chef station est deja affecté une station'
      });
    })
});


router.get('/supprimer', [checkUserConnected, checkUserRoleAdmin], function (req, res) {
  let nomStation = req.query.nom

  stationDao.deletStation(nomStation.trim())
    .then(result => {
      res.redirect('/admin/stations')
    })
    .catch(error => {
      res.redirect('/admin/stations')
    })
});

router.post('/supprimer', [checkUserConnected, checkUserRoleAdmin], function (req, res) {
  res.render('admin/station/ajout');
});

router.get('/modifier', [checkUserConnected, checkUserRoleAdmin], function (req, res) {
  let { nom } = req.query

  stationDao.getStation(nom)
    .then(station => {
      res.render('admin/station/modifier', { station: station[0] })
    })
    .catch(error => {
      res.redirect('/404')
    })
});

router.post('/modifier', [checkUserConnected, checkUserRoleAdmin], function (req, res) {
  let { idstation, nom, ville, tel } = req.body

  let newStation = new Station(nom, ville, tel, '')

  stationDao.updateStation(newStation, idstation)
    .then(result => {
      res.redirect('/admin/stations')
    })
    .catch(error => {
      res.redirect('/404')
    })
});

module.exports = router