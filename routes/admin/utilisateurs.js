var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('admin/utilisateurs');
});

router.post('/ajout', function (req, res) {
  res.render('admin/utilisateurs');
});

router.post('/modifier', function (req, res) {
  res.render('admin/utilisateurs');
});


router.post('/supprimer', function (req, res) {
  res.render('admin/utilisateurs');
});


module.exports = router;