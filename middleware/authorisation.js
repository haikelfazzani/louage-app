var Role = require('../model/Role.enum')

function isConnected (req, res, next) {
  let userAuth = req.session.userInfo
  if (userAuth && Object.keys(userAuth).length > 2) {
    res.redirect('/')
  }
  else next()
}

function checkUserConnected (req, res, next) {
  let userAuth = req.session.userInfo
  if (userAuth && Object.keys(userAuth).length > 2) {
    next()
  }
  else res.redirect('/login')
}

function checkUserRoleAdmin (req, res, next) {
  let userRole = req.session.userInfo.role
  if (userRole === Role.admin) {
    next()
  }
  else res.redirect('/')
}

function checkUserRoleChef (req, res, next) {
  let userRole = req.session.userInfo.role
  if (userRole === Role.chefStation) {
    next()
  }
  else res.redirect('/')
}

function checkAdminOrChef (req, res, next) {
  let userRole = req.session.userInfo.role
  if (userRole === Role.admin || userRole === Role.chefStation) {
    next()
  }
  else res.redirect('/')
}

function checkIsClient (req, res, next) {
  let userRole = req.session.userInfo.role
  if (userRole === Role.client) {
    next()
  }
  else res.redirect('/')
}

module.exports = {
  isConnected, checkUserConnected,
  checkAdminOrChef, checkUserRoleAdmin, checkUserRoleChef,
  checkIsClient
}