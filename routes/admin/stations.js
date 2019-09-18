var express = require('express');
var router = express.Router();

var Station = require('../../model/Station.model');
var stationDao = require('../../dao/stations.dao');
var utilisateurDao = require('../../dao/utilisateurs.dao');

var { checkUserConnected } = require('../../middleware/authorisation')

router.get('/', checkUserConnected, (req, res) => {
  
  stationDao.getStations().then(function (stations) {    
    res.render('admin/station/lister', { stations })
  })
    .catch(error => {
      res.render('admin/station/lister')
    })
})


router.get('/ajout', checkUserConnected, (req, res) => {
  utilisateurDao.getUserByRole('chef_station')
    .then(chefStations => {
      req.session.chefStations = chefStations      
      res.render('admin/station/ajout', { chefStations })
    })
    .catch(error => {
      res.redirect('/admin')
    })
})

router.post('/ajout', checkUserConnected, function (req, res) {
  let { chef, nom, ville, tel } = req.body;
  
  let station = new Station(nom, ville, tel, chef)

  stationDao.addStation(station)
    .then(result => {
      if (Object.keys(result) && result.affectedRows > 0) {
        res.render('admin/station/ajout', { msg: 'une station a été bien ajoutée' });
      }
      else {
        res.render('admin/station/ajout', { msg: 'station deja existe!' });
      }
    })
    .catch(error => {
      res.render('admin/station/ajout', { msg: 'erreur d\'ajout!' });
    })
});

router.post('/modifier', checkUserConnected, function (req, res) {
  res.render('admin/station/ajout');
});


router.post('/supprimer', checkUserConnected, function (req, res) {
  res.render('admin/station/ajout');
});


module.exports = router;