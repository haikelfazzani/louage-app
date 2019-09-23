var router = require('express').Router();
var UtilisateurDao = require('../dao/utilisateurs.dao');
const bcrypt = require('bcrypt');

router.get('/', function (req, res) {
  res.render('login')
});

router.post('/', function (req, res) {
  let { email, password } = req.body;

  UtilisateurDao.getUser(email)
    .then(result => {

      if(result[0].etat_email === 1) {
        bcrypt.compare(password, result[0].password)
        .then(function (hashRes) {

          if (hashRes && email === result[0].email) {
            req.session.userInfo = result[0];
            res.redirect('/')
          }
          else {
            res.render('login', { msg: 'vous devez s\'inscire avant de se connecter!' })
          }
        })
        .catch(errHash => { res.render('error', { appErrors: errHash }) });
      }      
      else {
        res.render('login', { msg: `vous devez valider votre email avant de se connecter!`, c:1 })
      }
    })    
    .catch(error => {
      res.render('login', { msg: 'ce compte n\'existe pas!' })
    })
});

module.exports = router;