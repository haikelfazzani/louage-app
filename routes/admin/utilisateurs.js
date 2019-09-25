var express = require('express');
var router = express.Router();
var { checkUserConnected } = require('../../middleware/authorisation')

const bcrypt = require('bcrypt');
const saltRounds = 10;

var Utilisateur = require('../../model/Utilisateur.model');
var utilisateurDao = require('../../dao/utilisateurs.dao');

router.get('/', checkUserConnected, (req, res) => {
  let { b, e } = req.query
  utilisateurDao.getUsers().then(function (utilisateurs) {
    utilisateurs = isNaN(b) || isNaN(e)
      ? utilisateurs = utilisateurs.slice(0, 5) : b < 0 && e < 5
        ? utilisateurs = utilisateurs.slice(0, 5) : utilisateurs.slice(b || 0, e || 5)
    res.render('admin/utilisateur/lister', { utilisateurs })
  })
    .catch(error => {
      res.render('admin/utilisateur/lister')
    });
})


router.get('/ajout', checkUserConnected, (req, res) => {
  res.render('admin/utilisateur/ajout')
})


router.post('/ajout', checkUserConnected, function (req, res) {
  let { email, password, role } = req.body;

  bcrypt.hash(password, saltRounds)
    .then(function (hash) {

      let utilisateur = new Utilisateur('', '', email, hash, '', '', role);

      utilisateurDao.addUser(utilisateur)
        .then(result => {
          utilisateurDao.updateEtat(email)
            .then(resultEtat => {
              res.render('admin/utilisateur/ajout', { msg: 'un utilisateur a été bien ajouté' });
            })
            .catch(errorUpdate => {
              res.redirect('/404')
            })
        })
        .catch(error => {
          res.render('admin/utilisateur/ajout', { msg: 'erreur d\'ajout' });
        })
    })
    .catch(errHash => { res.render('error', { appErrors: errHash }) });
});

router.post('/modifier', checkUserConnected, function (req, res) {
  res.render('admin/utilisateur');
});


router.get('/supprimer', checkUserConnected, function (req, res) {
  let { email } = req.query

  utilisateurDao.deleteUserByEmail(email)
    .then(result => {
      res.redirect('/admin/utilisateurs')
    })
    .catch(error => {
      res.redirect('/admin/utilisateurs')
    })
});


module.exports = router;