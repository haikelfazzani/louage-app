var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var stationDao = require('../../dao/stations.dao')
var voyagesDao = require('../../dao/voyages.dao')
var Voyage = require('../../model/Voyage.model')

router.get('/', checkUserConnected, (req, res) => {

  let { chefStationInfo } = req.session
  let { b, e } = req.query
  
  voyagesDao.getVoyageByNomStation(chefStationInfo.nom_station)
    .then(function (voyages) {
      res.cookie('voyages', JSON.stringify(voyages), { maxAge: 60 * 1000 * 5, httpOnly: true })
      voyages = isNaN(b) || isNaN(e)
        ? voyages = voyages.slice(0, 5) : b < 0 && e < 5
          ? voyages = voyages.slice(0, 5) : voyages.slice(b || 0, e || 5)
      res.render('admin/voyage/lister', { voyages });
    })
    .catch(error => {
      res.render('admin/voyage/lister');
    });
})


router.get('/ajout', checkUserConnected, (req, res) => {
  let { email } = req.session.userInfo
  stationDao.getStationByChef(email)
    .then(station => {
      res.render('admin/voyage/ajout', { station:station[0] })
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


router.get('/modifier', checkUserConnected, (req, res) => {

  let { v } = req.query
  let voyage = (JSON.parse(req.cookies.voyages)).find(vo => +vo.id_voyage === +v)
  res.render('admin/voyage/modifier', { voyage })
})

router.post('/modifier', checkUserConnected, (req, res) => {

  let { destination, heureDepart, dateDepart, prixPlace, nbPlaces, idvoyage } = req.body

  let newVoyage = new Voyage(destination, heureDepart, dateDepart, prixPlace, nbPlaces, '')

  voyagesDao.updateVoyage(newVoyage, idvoyage)
    .then(result => {
      res.redirect('/admin/voyages')
    })
    .catch(error => {
      res.redirect('/admin/voyages')
    })
})

module.exports = router