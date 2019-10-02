var router = require('express').Router()
var utilisateurDao = require('../dao/utilisateurs.dao')
var { isConnected } = require('../middleware/authorisation')
var nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt'), saltRounds = 10;

var checkUserExist = require('../middleware/checkUserExist')

router.get('/', isConnected, (req, res) => {
  res.render('pass-oublie/pass-oublie-email')
})

router.post('/', [isConnected, checkUserExist], (req, res) => {
  let { email } = req.body, token = jwt.sign({ email }, 'shhhhh')

  let transporter = nodemailer.createTransport({
    service: 'zoho',
    host: 'smtp.zoho.com',
    port: 465,
    secure: false,
    auth: { user: process.env.EMAIL, pass: process.env.PASS_EMAIL }
  })

  let mailOptions = {
    from: `"Louage 👻" <${process.env.EMAIL}>`,
    to: email.trim(),
    subject: 'Réinitialiser le mot de passe, envoyé par Louage.com',
    text: 'Merci de valider votre email',
    html: `
        <div><img src="https://i.ibb.co/K7KK032/logo.png" alt="logo" ></div>
        <h2>Votre clé secret : </h2>
        <h3> ${token}</h3>
        <div><small>louage.com</small></div>`
  }

  transporter.sendMail(mailOptions, function (errMail, info) {
    res.cookie('passoublieemail', email, { maxAge: 1000 * 60 * 5, httpOnly: true })
    res.redirect('/pass-oublie/reinitialiser')
  })
})

router.get('/reinitialiser', isConnected, (req, res) => {
  let email = req.cookies.passoublieemail;
  res.cookie('passoublieemail', email, { maxAge: 1000 * 60 * 5, httpOnly: true })
  res.render('pass-oublie/reinitialiser')
})

function checkKey (req, res, next) {
  let { key } = req.body

  jwt.verify(key, 'shhhhh', function (errJwt, decoded) {
    if (errJwt) {
      res.render('pass-oublie/reinitialiser', { msg: 'Votre clé n\'est pas valide' })
      return
    }
    else {
      next()
    }
  })
}

router.post('/reinitialiser', [isConnected, checkKey], (req, res) => {
  let { password } = req.body
  let email = req.cookies.passoublieemail

  bcrypt.hash(password, saltRounds)
    .then(hash => {
      utilisateurDao.updateUserPassword(email, hash)
        .then(result => {
          if (Object.keys(result).length < 1 && result.affectedRows !== 1) throw 404
          res.render('pass-oublie/reinitialiser', { msg: 'Maintenant vous pouvez ' })
        })
        .catch(error => {
          res.render('pass-oublie/reinitialiser', { msg: 'Erreur de verification' })
        })
    })
    .catch(e => {
      res.render('pass-oublie/reinitialiser', { msg: 'Erreur de verification' })
    })
})
module.exports = router