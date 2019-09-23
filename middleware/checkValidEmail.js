var UtilisateurDao = require('../dao/utilisateurs.dao');
module.exports = function checkValidEmail (req, res, next) {

  let { email } = req.body

  UtilisateurDao.getUser(email)
    .then(result => {
      if (result && result.length > 0) {
        if (result[0].etat_email === 1) {
          next()
        }
        else {
          res.render('login', { msg: `Vous devez valider votre email avant de se connecter!`, c: 1 })
        }
      }
      else {
        res.render('login', { msg: 'Ce compte n\'existe pas!' })
      }
    })
    .catch(error => {
      res.render('login', { msg: 'vous devez s\'inscire avant de se connecter!' })
    })
}