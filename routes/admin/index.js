var express = require('express')
var router = express.Router()
var { checkUserConnected, checkAdminOrChef } = require('../../middleware/authorisation')
var utilisateurDao = require('../../dao/utilisateurs.dao')
var stationDao = require('../../dao/stations.dao')

router.get('/', [checkUserConnected, checkAdminOrChef], (req, res) => {
  res.render('admin/index')
})

router.get('/utilisateurs.json', [checkUserConnected, checkAdminOrChef], (req, res) => {
  utilisateurDao.getUsers()
    .then(function (utilisateurs) {
      res.status(200).json(utilisateurs)
    })
    .catch(e => { res.status(404).json(utilisateurs) })
})

router.get('/stations.json', [checkUserConnected, checkAdminOrChef], (req, res) => {
  stationDao.getAllStations()
    .then(function (stations) {
      res.status(200).json(stations)
    })
    .catch(e => { res.status(404).json(stations) })
})

module.exports = router