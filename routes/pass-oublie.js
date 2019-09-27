var router = require('express').Router()
var utilisateurDao = require('../dao/utilisateurs.dao')
var { isConnected } = require('../middleware/authorisation')

var jwt = require('jsonwebtoken')

router.get('/', isConnected, (req, res) => {
  res.render('pass-oublie/pass-oublie-email')
})

router.post('/', isConnected, (req, res) => {
  let { email } = req.body
  utilisateurDao.getUser(email)
    .then(result => {
      if (result.length < 1) throw 404;

      let token = jwt.sign({ email }, 'shhhhh')

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
    .catch(error => {
      res.render('pass-oublie/pass-oublie-email', { msg: 'Ce compte n\'existe pas' })
    })
})

router.get('/reinitialiser', isConnected, (req, res) => {
  let email = req.cookies.passoublieemail;
  res.cookie('passoublieemail', email, { maxAge: 1000 * 60 * 5, httpOnly: true })
  res.render('pass-oublie/reinitialiser')
})

router.post('/reinitialiser', isConnected, (req, res) => {
  let { key, password } = req.body
  let email = req.cookies.passoublieemail

  jwt.verify(key, 'shhhhh', function (errJwt, decoded) {
    if (errJwt) {
      res.render('pass-oublie/reinitialiser', { msg: 'Erreur de verification' })
      return
    }
    utilisateurDao.updateUserPassword(email, password)
      .then(result => {
        if (Object.keys(result).length < 1 && result.affectedRows !== 1) throw 404
        res.render('pass-oublie/reinitialiser', { msg: 'Maintenant vous pouvez ' })
      })
      .catch(error => {
        res.render('pass-oublie/reinitialiser', { msg: 'Erreur de verification' })
      })
  })
})
module.exports = router