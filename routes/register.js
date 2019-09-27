var router = require('express').Router()
var knex = require('../database/knex')
var { isConnected } = require('../middleware/authorisation')

const sgMail = require('@sendgrid/mail')
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;

router.get('/', isConnected, function (req, res) {
  res.render('register')
});

router.post('/', isConnected, function (req, res) {

  let { email, password } = req.body;

  bcrypt.hash(password, saltRounds)
    .then(function (hash) {

      knex('utilisateurs').insert({
        email,
        password: hash, role: 'client',
        timestamp_utilisateur: new Date().toISOString()
      })
        .then(result => {
          var token = jwt.sign({ email }, 'shhhhh')
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
            to: email.trim(),
            from: process.env.GMAIL_EMAIL,
            subject: 'Clé de validation, envoyé par Louage.com',
            text: 'Merci de valider votre email',
            html: `
            <div><img src="/img/logo.png" alt="logo" ></div>
            <h2>Votre clé secret : </h2><h3> ${token}</h3>
            <div><small>louage.com</small></div>`,
          }

          sgMail.send(msg)
          res.redirect('/register/email/validation')
        })
        .catch(error => {
          res.render('register', { msg: 'Vous êtes deja inscrit!' })
        })
    })
    .catch(errHash => { res.render('error', { appErrors: errHash }) });
});

router.get('/email/validation', isConnected, (req, res) => {
  res.render('register-valider')
})

router.post('/email/validation', isConnected, (req, res) => {

  let { key } = req.body

  jwt.verify(key, 'shhhhh', function (err, decoded) {

    if (!err) {
      knex('utilisateurs').where({ email: decoded.email }).update({ etat_email: 1 })
        .then(result => {
          res.render('register-valider', {
            msg: 'Votre email a été bien validée, vous pouvez se connecter maintenant', c: 0
          })
        })
        .catch(error => {
          res.render('register-valider', { msg: 'Erreur de validation clé secret' })
        })
    }
    else {
      res.render('register-valider', { msg: 'Clé n\'est pas valide! verifier votre boite email', c: 0 })
    }
  })
})

module.exports = router;