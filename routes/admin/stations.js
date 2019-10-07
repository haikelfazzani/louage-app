var express = require('express')
var router = express.Router()
var { checkUserConnected, checkUserRoleAdmin } = require('../../middleware/authorisation')
var Station = require('../../model/Station.model')
var stationDao = require('../../dao/stations.dao')
var utilisateurDao = require('../../dao/utilisateurs.dao')

router.get('/', [checkUserConnected, checkUserRoleAdmin], (req, res) => {
  stationDao.getStations()
    .then((stations) => {
      res.render('admin/station/lister', { stations })
    })
    .catch(e => {
      res.render('admin/station/lister')
    })
})

router.get('/ajout', [checkUserConnected, checkUserRoleAdmin], (req, res) => {
  utilisateurDao.getUserByRole('chef_station')
    .then(chefStations => {
      req.session.chefStations = chefStations
      res.render('admin/station/ajout', { chefStations })
    })
    .catch(e => { res.redirect('/admin') })
})

router.post('/ajout', [checkUserConnected, checkUserRoleAdmin], (req, res) => {
  let { chef, nom, ville, tel } = req.body
  let station = new Station(nom, ville, tel, chef)
  stationDao.addStation(station)
    .then(r => {
      res.render('admin/station/ajout', { msg: 'une station a été bien ajoutée' })
    })
    .catch(e => {
      res.render('admin/station/ajout', {
        msg: 'Erreur d\'ajout! chef station est deja affecté une station'
      })
    })
})

router.get('/supprimer', [checkUserConnected, checkUserRoleAdmin], (req, res) => {
  let nomStation = req.query.nom
  stationDao.deletStation(nomStation.trim())
    .then(r => { res.redirect('/admin/stations') })
    .catch(e => { res.redirect('/admin/stations') })
})

router.post('/supprimer', [checkUserConnected, checkUserRoleAdmin], (req, res) => {
  res.render('admin/station/ajout')
})

router.get('/modifier', [checkUserConnected, checkUserRoleAdmin], (req, res) => {
  let { nom } = req.query
  stationDao.getStation(nom)
    .then(station => {
      res.render('admin/station/modifier', { station: station[0] })
    })
    .catch(e => { res.redirect('/404') })
})

router.post('/modifier', [checkUserConnected, checkUserRoleAdmin], (req, res) => {
  let { idstation, nom, ville, tel } = req.body
  let newStation = new Station(nom, ville, tel, '')
  stationDao.updateStation(newStation, idstation)
    .then(r => { res.redirect('/admin/stations') })
    .catch(e => { res.redirect('/404') })
})
module.exports = router