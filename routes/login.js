var router = require('express').Router()
var { isConnected } = require('../middleware/authorisation')
var UtilisateurDao = require('../dao/utilisateurs.dao');
const bcrypt = require('bcrypt')
const checkValidEmail = require('../middleware/checkValidEmail')

router.get('/', isConnected, function (req, res) {
  res.render('login')
});

router.post('/', [isConnected, checkValidEmail], function (req, res) {
  let { email, password } = req.body

  UtilisateurDao.getUser(email)
    .then(result => {
      let connectedUser = result[0]
      bcrypt.compare(password, connectedUser.password)
        .then(async (hashRes) => {

          if (hashRes && email === connectedUser.email) {
            req.session.userInfo = connectedUser
            res.redirect('/')
          }
          else {
            res.render('login', { msg: 'vous devez s\'inscire avant de se connecter!' })
          }
        })
        .catch(errHash => { res.render('error', { appErrors: errHash }) });
    })
    .catch(error => {
      res.render('login', { msg: 'ce compte n\'existe pas!' })
    })
})
module.exports = router