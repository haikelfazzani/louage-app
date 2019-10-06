var express = require('express')
var router = express.Router()
var { checkUserConnected, checkUserRoleAdmin } = require('../../middleware/authorisation')

var bcrypt = require('bcrypt')
var saltRounds = 10;

var Utilisateur = require('../../model/Utilisateur.model')
var utilisateurDao = require('../../dao/utilisateurs.dao')

router.get('/', [checkUserConnected, checkUserRoleAdmin], (req, res) => {
  utilisateurDao.getUsers()
    .then(function (utilisateurs) {
      res.render('admin/utilisateur/lister', { utilisateurs })
    })
    .catch(e => {
      res.render('admin/utilisateur/lister')
    })
})

router.get('/ajout', [checkUserConnected, checkUserRoleAdmin], (req, res) => {
  res.render('admin/utilisateur/ajout')
})

router.post('/ajout', [checkUserConnected, checkUserRoleAdmin], (req, res) => {
  let { email, password, role } = req.body;
  bcrypt.hash(password, saltRounds)
    .then(function (hash) {
      let utilisateur = new Utilisateur('', '', email, hash, '', '', role)
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
        .catch(e => {
          res.render('admin/utilisateur/ajout', { msg: 'erreur d\'ajout' })
        })
    })
    .catch(errHash => { res.redirect('/404') })
})

router.post('/modifier', [checkUserConnected, checkUserRoleAdmin], (req, res) => {
  res.render('admin/utilisateur')
})

router.get('/supprimer', [checkUserConnected, checkUserRoleAdmin], (req, res) => {
  let { email } = req.query
  utilisateurDao.deleteUserByEmail(email)
    .then(r => {
      res.redirect('/admin/utilisateurs')
    })
    .catch(e => {
      res.redirect('/admin/utilisateurs')
    })
})

module.exports = router