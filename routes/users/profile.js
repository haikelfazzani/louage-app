var express = require('express');
var router = express.Router();
var utilisateurDao = require('../../dao/utilisateurs.dao');
var UtilisateurModel = require('../../model/Utilisateur.model')

var { checkUserConnected } = require('../../middleware/authorisation');

var objectTrim = require('../../util/objectTrim')

router.get('/', checkUserConnected, function (req, res) {
  res.render('user/profile');
});

router.post('/', function (req, res) {

  let { nom, prenom, email, password } = req.body;

  let User = new UtilisateurModel(nom, prenom, email, password, '', '')

  utilisateurDao.updateUser(objectTrim(User))
    .then(result => {
      if (Object.keys(result).length > 0 && result.affectedRows)
        res.render('user/profile', { msg: 'votre profile a été bien modifiée' });
    })
    .catch(error => {
      res.render('user/profile', { msg: 'erreur de modification!' });
    })
});

module.exports = router;
