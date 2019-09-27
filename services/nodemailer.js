var nodemailer = require('nodemailer')
module.exports = function sendEmail () {
  return nodemailer.createTransport({
    service: 'zoho',
    host: 'smtp',
    port: 465,
    secure: false,
    auth: { user: process.env.EMAIL, pass: process.env.PASS_EMAIL }
  })
}