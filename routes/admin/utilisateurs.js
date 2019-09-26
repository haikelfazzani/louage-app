var express = require('express');
var router = express.Router();
var { checkUserConnected } = require('../../middleware/authorisation')

const bcrypt = require('bcrypt');
const saltRounds = 10;

var Utilisateur = require('../../model/Utilisateur.model');
var utilisateurDao = require('../../dao/utilisateurs.dao');

router.get('/', checkUserConnected, (req, res) => {
  let { role } = req.query
  utilisateurDao.getUsers().then(function (utilisateurs) {

    let utilisateursByRole = role && role !== 'tous'
      ? utilisateurs.filter(v => v.role === role)
      : utilisateurs

    res.render('admin/utilisateur/lister', {
      utilisateurs: utilisateursByRole,
      roles: [...new Set(utilisateurs.map(u => u.role))]
    })
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