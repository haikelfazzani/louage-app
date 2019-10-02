var router = require('express').Router()
var { isConnected } = require('../middleware/authorisation')
var bcrypt = require('bcrypt')
var checkValidEmail = require('../middleware/checkValidEmail')
var checkUserExist = require('../middleware/checkUserExist')

router.get('/', isConnected, function (req, res) {
  res.render('login')
})

router.post('/', [isConnected, checkValidEmail, checkUserExist], function (req, res) {
  let { email, password, connectedUser } = req.body
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
    .catch(e => { res.redirect('/404') })
})
module.exports = router