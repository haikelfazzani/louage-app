var router = require('express').Router()
var nodemailer = require('nodemailer')
var validContactForm = require('../middleware/validContactForm')
var checkValidCaptcha = require('../middleware/checkValidCaptcha')

router.get('/', (req, res) => {
  res.render('contact')
})

router.post('/', [checkValidCaptcha, validContactForm], (req, res) => {
  let { nom, sujet, email, message } = req.body
  let transporter = nodemailer.createTransport({
    service: 'zoho',
    host: 'smtp.zoho.com',
    port: 465,
    secure: false,
    auth: { user: process.env.EMAIL.trim(), pass: process.env.PASS_EMAIL }
  })

  let mailOptions = {
    from: `"${nom} 👻" <${email}>`,
    to: process.env.EMAIL.trim(),
    subject: sujet.trim(),
    text: message.trim()
  }

  transporter.sendMail(mailOptions, function (error, info) {
    res.render('contact', {
      msg: error
        ? "Cette adresse e-mail n'est pas valide!"
        : "Votre e-mail a été bien envoyé"
    })
  })
})

module.exports = router