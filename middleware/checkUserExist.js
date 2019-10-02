var utilisateurDao = require('../dao/utilisateurs.dao')
module.exports = function checkUserExist (req, res, next) {
  let { email } = req.body
  utilisateurDao.getUser(email)
    .then(r => {
      if (r.length < 1) throw 404
      else {        
        req.body.connectedUser = r[0]
        next()
      }
    })
    .catch(e => {
      res.render('pass-oublie/pass-oublie-email', { msg: 'Ce compte n\'existe pas' })
      return
    })
}