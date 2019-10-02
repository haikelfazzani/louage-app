const router = require('express').Router()
const nodemailer = require('nodemailer')
const validContactForm = require('../middleware/validContactForm')

router.get('/', (req, res) => {
  res.render('contact')
})

router.post('/', validContactForm, (req, res) => {

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
    let errorMail = error
    res.render('contact', {
      msg: errorMail
        ? "Cette adresse mail n'est pas valide!"
        : "Votre email a été bien envoyé"
    })
  })
})

module.exports = router