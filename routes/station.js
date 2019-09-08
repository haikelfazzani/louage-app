var express = require('express');
var router = express.Router();
var utilisateurDao = require('../../dao/utilisateurs.dao');

router.get('/', function (req, res) {
  res.render('user/profile');
});

router.post('/', function (req, res) {
  res.render('user/profile', { msg: 'erreur de modification!' });
});

module.exports = router;