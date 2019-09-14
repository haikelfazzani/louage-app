var router = require('express').Router();
var UtilisateurDao = require('../dao/utilisateurs.dao');

router.get('/', function (req, res) {
  res.render('login')
});


router.post('/', function (req, res) {
  let { email, password } = req.body;

  UtilisateurDao.getUser(email)
    .then(result => {
      if (email === result[0].email && password === result[0].password) {        
        res.redirect('/')
      }
      else {
        res.render('login', { msg: 'vous devez s\'inscire avant de se connecter!' })
      }
    })
    .catch(error => {
      if(req.app.get('env') === 'development') console.log(error)
      res.render('login', {
        msg: 'Impossible de se connecter pour le moment. Veuillez réessayer ultérieurement!'
      })
    })
});



process.env.bilel

module.exports = router;