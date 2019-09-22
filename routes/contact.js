const router = require('express').Router()
const nodemailer = require('nodemailer')

router.get('/', (req, res) => {
  res.render('contact')
})

router.post('/', (req, res) => {

  const propEmail = process.env.EMAIL
  const pass = process.env.PASS_EMAIL

  let { nom, sujet, email, message } = req.body

  let transporter = nodemailer.createTransport({
    service: 'zoho',
    host: 'smtp.zoho.com',
    port: 465,
    secure: false,
    auth: { user: propEmail.trim(), pass }
  });

  let mailOptions = {
    from: `"${nom} 👻" <${email}>`,
    to: propEmail.trim(),
    subject: sujet.trim(),
    text: message.trim()
  };

  transporter.sendMail(mailOptions, function (error, info) {
    let errorMail = error
    res.render('contact', {
      msg: errorMail
        ? "Cette adresse mail n'est pas valide!"
        : "un email a été bien envoyé"
    });
  });
})

module.exports = router