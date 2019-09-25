var Role = require('../model/Role.enum')

function checkUserConnected (req, res, next) {
  if (!req.session['userInfo']) {
    res.redirect('/login')
  }
  else next()
}

function checkUserRoleAdmin (role) {
  if (!req.session['userInfo']) {
    res.redirect('/login')
  }
  else if (req.session.userInfo !== Role.admin) {
    res.redirect('/login')
  }
  next()
}

function checkUserRoleChef (role) {
  if (!req.session['userInfo']) {
    res.redirect('/login')
  }
  else if (req.session.userInfo !== Role.chefStation) {
    res.redirect('/login')
  }
  next()
}

module.exports = { checkUserConnected, checkUserRoleAdmin, checkUserRoleChef }