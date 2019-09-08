var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('admin/stations');
});

router.post('/ajout', function (req, res) {
  res.render('admin/stations');
});

router.post('/modifier', function (req, res) {
  res.render('admin/stations');
});


router.post('/supprimer', function (req, res) {
  res.render('admin/stations');
});


module.exports = router;