var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var stationDao = require('../../dao/stations.dao')
var voyagesDao = require('../../dao/voyages.dao')
var Voyage = require('../../model/Voyage.model')

router.get('/', checkUserConnected, (req, res) => {
  voyagesDao.getVoyages()
    .then(voyages => {
      res.render('admin/voyage/lister', { voyages })
    })
    .catch(error => {
      res.render('admin/voyage/lister')
    })
})


router.get('/ajout', checkUserConnected, (req, res) => {
  stationDao.getStations()
    .then(stations => {
      res.render('admin/voyage/ajout', { stations })
    })
    .catch(error => {
      res.render('admin/voyage/ajout')
    })
})

router.post('/ajout', checkUserConnected, (req, res) => {

  let { destination, heureDepart, dateDepart, prixPlace, nbPlaces, station } = req.body
  let newVoyage = new Voyage(destination, heureDepart, dateDepart, prixPlace, nbPlaces, station)

  voyagesDao.addVoyage(newVoyage)
    .then(result => {
      res.render('admin/voyage/ajout', { msg: 'un nouveaux voyage a été bien ajouté' })
    })
    .catch(error => {
      res.render('admin/voyage/ajout', { msg: 'erreur d\'ajout' })
    })
})

module.exports = router