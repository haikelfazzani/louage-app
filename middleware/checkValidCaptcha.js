var axios = require('axios')
module.exports = function checkValidCaptcha (req, res, next) {
  let { originalUrl } = req
  let rendPage = originalUrl.split('/').includes('payments') ? 'payments' : 'contact'

  let captcha = req.body['g-recaptcha-response']
  const URL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;
  axios.get(URL)
    .then(r => {
      if (r.data.success) next()
      else res.render(rendPage, { msg: "Captcha invalide!" })
    })
    .catch(e => {
      res.render(rendPage, { msg: "Captcha invalide!" })
    })
}