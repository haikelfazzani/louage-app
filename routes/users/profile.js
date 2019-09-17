var express = require('express');
var router = express.Router();
var utilisateurDao = require('../../dao/utilisateurs.dao');
var UtilisateurModel = require('../../model/Utilisateur.model')

var { checkUserConnected } = require('../../middleware/authorisation');

var objectTrim = require('../../util/objectTrim')

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/profile', checkUserConnected, function (req, res) {
  res.render('utilisateur/profile')
});

router.post('/', checkUserConnected, function (req, res) {

  let { nom, prenom, email, password, tel } = req.body;

  let User = new UtilisateurModel(nom, prenom, email, password, tel)

  utilisateurDao.updateUser(objectTrim(User))
    .then(result => {
      if (Object.keys(result).length > 0 && result.affectedRows)
        res.render('user/profile', { msg: 'votre profile a été bien modifiée' });
    })
    .catch(error => {
      console.log(error)
      res.render('user/profile', { msg: 'erreur de modification!' });
    })
});


router.get('/profile/password', checkUserConnected, function (req, res) {
  res.render('utilisateur/password')
});


router.post('/profile/password', checkUserConnected, function (req, res) {
  let { password } = req.body
  let { email } = req.session.userInfo

  bcrypt.hash(password, saltRounds)
    .then(function (hash) {

      utilisateurDao.updateUserPassword(email, hash)
        .then(result => {
          res.render('utilisateur/password', { msg: 'votre mot de passe a été bien modifiée' })
        })
        .catch(error => {
          res.render('utilisateur/password', { msg: 'erreur de modification!' })
        })
    })
    .catch(errHash => { res.render('error', { appErrors: errHash }) });

});

module.exports = router