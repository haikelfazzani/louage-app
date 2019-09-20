var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var stationDao = require('../../dao/stations.dao')
var voyagesDao = require('../../dao/voyages.dao')
var Voyage = require('../../model/Voyage.model')

router.get('/', checkUserConnected, (req, res) => {
  const promises = [
    stationDao.getStations(),
    voyagesDao.getVoyages()
  ];

  Promise.all(promises).then(function (values) {

    res.render('admin/voyage/lister', { stations: values[0], voyages: values[1] });
  })
    .catch(error => {
      res.render('admin/voyage/lister');
    });
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
      //res.render('admin/voyage/ajout', { msg: 'un nouveaux voyage a été bien ajouté' })
      res.redirect('/admin/voyages')
    })
    .catch(error => {
      res.render('admin/voyage/ajout', { msg: 'erreur d\'ajout' })
    })
})


router.get('/supprimer', checkUserConnected, function (req, res) {
  let { voyage } = req.query

  voyagesDao.deletVoyage(voyage)
    .then(result => {
      res.redirect('/admin/voyages')
    })
    .catch(error => {
      res.redirect('/admin/voyages')
    })
});


router.post('/modifier', checkUserConnected, (req, res) => {

  let { destination, heureDepart, dateDepart, prixPlace, nbPlaces, station,idvoyage } = req.body

  let newVoyage = new Voyage(destination, heureDepart, dateDepart, prixPlace, nbPlaces, station)

  voyagesDao.updateVoyage(newVoyage, idvoyage)
  .then(result => {
    res.redirect('/admin/voyages')
  })
  .catch(error => {
    res.redirect('/admin/voyages')
  })  
})

module.exports = router