var router = require('express').Router();
var UtilisateurDao = require('../dao/utilisateurs.dao');
var UtilisateurModel = require('../model/Utilisateur.model');

router.get('/', function (req, res) {
  res.render('register')
});

router.post('/', function (req, res) {

  let { email, password } = req.body;
  let User = new UtilisateurModel(email, password, '', 'client')

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
});


module.exports = router;