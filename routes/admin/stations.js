var express = require('express');
var router = express.Router();

var Station = require('../../model/Station.model');
var stationDao = require('../../dao/stations.dao');

router.get('/', (req, res) => {

  stationDao.getStations().then(function (stations) {
    res.render('admin/station/lister', { stations })
  })
    .catch(error => {
      res.render('admin/station/lister')
    })
})


router.get('/ajout', (req, res) => {
  res.render('admin/station/ajout')
})

router.post('/ajout', function (req, res) {
  let { chef, nom, ville, tel } = req.body;

  let station = new Station(nom, ville, tel, chef)

  stationDao.addStation(station)
    .then(result => {
      if (Object.keys(result) && result.affectedRows > 0) {
        res.render('admin/index', { msg: 'une station a été bien ajoutée' });
      }
      else {
        res.render('admin/index', { msg: 'station deja existe!' });
      }
    })
    .catch(error => {
      res.render('admin/index', { msg: 'erreur d\'ajout!' });
    })
});

router.post('/modifier', function (req, res) {
  res.render('admin/index');
});


router.post('/supprimer', function (req, res) {
  res.render('admin/index');
});


module.exports = router;