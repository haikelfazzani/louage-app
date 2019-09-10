var express = require('express');
var router = express.Router();

var Station = require('../../model/Station.model');
var stationDao = require('../../dao/stations.dao');

router.post('/ajout', function (req, res) {
  res.render('admin/index');
});

router.post('/modifier', function (req, res) {
  res.render('admin/index');
});


router.post('/supprimer', function (req, res) {
  res.render('admin/index');
});


module.exports = router;