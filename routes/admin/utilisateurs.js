var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

var Utilisateur = require('../../model/Utilisateur.model');
var utilisateurDao = require('../../dao/utilisateurs.dao');

router.get('/', (req, res) => {
  utilisateurDao.getUsers().then(function (values) {
    res.render('admin/utilisateur/lister', { utilisateurs: values })
  })
    .catch(error => {
      res.render('admin/utilisateur/lister')
    });
})


router.get('/ajout', (req, res) => {
  res.render('admin/utilisateur/ajout')
})


router.post('/ajout', function (req, res) {
  let { email, password, role } = req.body;

  bcrypt.hash(password, saltRounds)
    .then(function (hash) {

      let utilisateur = new Utilisateur('', '', email, hash, '', role || 'client');

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
    })
    .catch(errHash => { res.render('error', { appErrors: errHash }) });
});

router.post('/modifier', function (req, res) {
  res.render('admin/index');
});


router.post('/supprimer', function (req, res) {
  res.render('admin/index');
});


module.exports = router;