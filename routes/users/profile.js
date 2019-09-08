var express = require('express');
var router = express.Router();
var utilisateurDao = require('../../dao/utilisateurs.dao');

router.get('/', function (req, res) {
  res.render('user/profile');
});

router.post('/', function (req, res) {

  let { email, password } = req.body;

  utilisateurDao.updateUser(email.trim(), password.trim())
    .then(result => {
      if(Object.keys(result).length > 0 && result.affectedRows)
      res.render('user/profile', { msg: 'votre mote de passe a été bien modifiée' });
    })
    .catch(error => {
      res.render('user/profile', { msg: 'erreur de modification!' });
    })
});

module.exports = router;
