var express = require('express');
var router = express.Router();

var Utilisateur = require('../../model/Utilisateur.model');
var utilisateurDao = require('../../dao/utilisateurs.dao');

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