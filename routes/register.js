var router = require('express').Router();
var UtilisateurDao = require('../dao/utilisateurs.dao');
var UtilisateurModel = require('../model/Utilisateur.model');

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', function (req, res) {
  res.render('register')
});

router.post('/', function (req, res) {

  let { email, password } = req.body;


  bcrypt.hash(password, saltRounds)
    .then(function (hash) {

      let User = new UtilisateurModel('', '', email, hash, '', 'client')

      UtilisateurDao.addUser(User)
        .then(result => {

          if (Object.keys(result).length > 0 && result.affectedRows > 0) {
            res.render('register', {
              msg: 'vous êtes maintenant inscrit'
            })
          }
        })
        .catch(error => {
          res.render('register', { msg: 'vous êtes deja inscrit!' })
        })
    })
    .catch(errHash => { res.render('error', { appErrors: errHash }) });

});

module.exports = router;