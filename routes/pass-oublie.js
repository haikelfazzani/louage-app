var router = require('express').Router()
var utilisateurDao = require('../dao/utilisateurs.dao')

const sgMail = require('@sendgrid/mail')
var jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
  res.render('pass-oublie/pass-oublie-email')
})

router.post('/', (req, res) => {
  let { email } = req.body
  utilisateurDao.getUser(email)
    .then(result => {
      if (result.length < 1) throw 404;

      var token = jwt.sign({ email }, 'shhhhh')
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email.trim(),
        from: 'haykelfezzani@gmail.com',
        subject: 'réinitialiser le mot de passe, envoyé par Louage.com',
        text: 'Merci de valider votre email',
        html: `
            <div><img src="https://i.ibb.co/K7KK032/logo.png" alt="logo" ></div>
            <h2>Votre clé de réinitialiser : </h2>
            <h3>${token}</h3>
            <div><small>louage.com</small></div>`,
      }
      sgMail.send(msg)

      res.cookie('passoublieemail', email, { maxAge: 1000 * 60 * 5, httpOnly: true })
      res.redirect('/pass-oublie/reinitialiser')
    })
    .catch(error => {
      res.render('pass-oublie/pass-oublie-email', { msg: 'Ce compte n\'existe pas' })
    })
})

router.get('/reinitialiser', (req, res) => {
  let email = req.cookies.passoublieemail;
  res.cookie('passoublieemail', email, { maxAge: 1000 * 60 * 5, httpOnly: true })
  res.render('pass-oublie/reinitialiser')
})

router.post('/reinitialiser', (req, res) => {
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