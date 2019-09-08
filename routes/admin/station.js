var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('admin/index');
});

router.post('/ajout', function(req, res) {
  res.render('admin/index');
});

router.post('/modifier', function(req, res) {
  res.render('admin/index');
});


router.post('/supprimer', function(req, res) {
  res.render('admin/index');
});


module.exports = router;