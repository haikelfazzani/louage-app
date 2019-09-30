var express = require('express'),
  router = express.Router(),
  utilisateurDao = require('../../dao/utilisateurs.dao'),
  UtilisateurModel = require('../../model/Utilisateur.model'),
  { checkUserConnected } = require('../../middleware/authorisation'),
  objectTrim = require('../../util/objectTrim')

var bcrypt = require('bcrypt'), saltRounds = 10;

var multer = require('multer'), storage = multer.memoryStorage(), upload = multer({ storage: storage });
var sharp = require('sharp');

//let IMG_BASE_URL='https://api.imgbb.com/1/upload?key=bd564129d4a8eccb275c4cc0c637cff3'

router.get('/profile', checkUserConnected, async (req, res) => {
  let { id } = req.session.userInfo

  const users = await utilisateurDao.getUserById(id)
  let encode = 'data:image/png;base64,' + users[0].avatar
  req.session.avatar = encode
  res.render('client/profile/index', { user: users[0], avatar: encode })
});

router.post('/profile', checkUserConnected, function (req, res) {
  let { nom, prenom, email, password, tel } = req.body;
  let { id } = req.session.userInfo

  let User = new UtilisateurModel(nom, prenom, email, password, tel)

  utilisateurDao.updateUser(id, objectTrim(User))
    .then(result => {
      res.render('client/profile/index', {
        user: User,
        msg: 'votre profile a été bien modifiée'
      });
    })
    .catch(error => {
      res.render('client/profile/index', { msg: 'erreur de modification!' });
    })
});

/** user change password */
router.get('/profile/password', checkUserConnected, function (req, res) {
  res.render('client/profile/password')
});


router.post('/profile/password', checkUserConnected, function (req, res) {
  let { password } = req.body
  let { email } = req.session.userInfo

  bcrypt.hash(password, saltRounds)
    .then(function (hash) {

      utilisateurDao.updateUserPassword(email, hash)
        .then(result => {
          res.render('client/profile/password', { msg: 'votre mot de passe a été bien modifiée' })
        })
        .catch(error => {
          res.render('client/profile/password', { msg: 'erreur de modification!' })
        })
    })
    .catch(errHash => { res.render('error', { appErrors: errHash }) });

});

/** user change avatar */
router.post('/profile/avatar', [checkUserConnected, upload.single("avatar")], (req, res) => {
  /*
  fieldname: 'avatar',
  originalname: 'classe.PNG',
  encoding: '7bit',
  mimetype: 'image/png',
  buffer:
  */
  sharp(req.file.buffer)
    .resize(300, 300)
    .jpeg()
    .toBuffer()
    .then(function (data) {

      const encoded = data.toString("base64");

      utilisateurDao.updateAvatar(encoded, req.session.userInfo.email)
        .then(result => {
          res.redirect('/utilisateur/profile')
        })
        .catch(error => {
          res.render('client/profile/index', { msg: 'erreur de modification' })
        })
    })
    .catch(errd => { res.redirect('/404') })
});

/** Suppression compte (profile) */
router.get('/profile/supprimer', checkUserConnected, function (req, res) {
  res.render('client/profile/supprimer')
});

router.post('/profile/supprimer', checkUserConnected, function (req, res) {
  let { password } = req.body
  let userPassword = req.session.userInfo.password

  bcrypt.compare(password, userPassword)
    .then(function (hashRes) {

      if (hashRes) {
        utilisateurDao.deleteUser(userPassword)
          .then(result => {
            req.session.destroy()
            req.session = null
            res.locals = null
            res.redirect('/register')
          })
          .catch(error => {
            res.render('client/profile/supprimer', { msg: 'erreur de suppression!' })
          })
      }
      else {
        res.render('login', { msg: 'mot de passe incorrect' })
      }
    })
    .catch(errHash => {
      res.render('client/profile/supprimer', { msg: 'erreur de suppression!' })
    });
})

module.exports = router