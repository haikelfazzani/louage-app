function checkUserConnected (req, res, next) {
  if (!req.session['userInfo']) {
    res.redirect('/login')
  }
  else next()
}

module.exports = { checkUserConnected }