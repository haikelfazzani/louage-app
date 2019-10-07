var router = require('express').Router()
var { isConnected } = require('../middleware/authorisation')
var bcrypt = require('bcrypt')
var checkValidEmail = require('../middleware/checkValidEmail')
var checkUserExist = require('../middleware/checkUserExist')

router.get('/', isConnected, (req, res) => {
  res.render('login')
})

router.post('/', [isConnected, checkValidEmail, checkUserExist], (req, res) => {
  let { email, password, connectedUser } = req.body
  bcrypt.compare(password, connectedUser.password)
    .then(async (hashRes) => {
      if (hashRes && email === connectedUser.email) {
        req.session.userInfo = connectedUser
        res.redirect('/')
      }
      else {
        res.render('login', { msg: 'Veuillez vérifier votre adresse e-mail ou mot de passe' })
      }
    })
    .catch(e => { res.render('login', { msg: 'Vous devez s\'inscire avant de se connecter!' }) })
})
module.exports = router