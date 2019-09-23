module.exports = function validContactForm (req, res, next) {
  let { nom, sujet, email } = req.body
  if ((nom && sujet && email) && nom.length > 3) {
    next()
  }
  else {
    res.render('contact', { msg: 'Vos données ne sont pas valides' })
  }
}