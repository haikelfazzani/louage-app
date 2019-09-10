var express = require('express');
var router = express.Router();

var Utilisateur = require('../../model/Utilisateur.model');
var utilisateurDao = require('../../dao/utilisateurs.dao');

router.post('/ajout', function (req, res) {
  let { email, password, role } = req.body;

  let utilisateur = new Utilisateur('', '', email, password, '', role);

  utilisateurDao.addUser(utilisateur)
    .then(result => {
      if (Object.keys(result) && result.affectedRows > 0) {
        res.render('admin/index', { msg: 'un utilisateur a été bien ajouté' });
      }
      else {
        res.render('admin/index', { msg: 'utilisateur deja existe!' });
      }
    })
    .catch(error => {
      res.render('admin/index', { msg: 'erreur d\'ajout' });
    })
});

router.post('/modifier', function (req, res) {
  res.render('admin/index');
});


router.post('/supprimer', function (req, res) {
  res.render('admin/index');
});


module.exports = router;