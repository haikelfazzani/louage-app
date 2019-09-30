var router = require('express').Router()
var notifsDao = require('../../dao/notifications.dao')
var Notification = require('../../model/Notification')
var { checkUserConnected, checkUserRoleChef } = require('../../middleware/authorisation')

router.get('/', [checkUserConnected, checkUserRoleChef], (req, res) => {
  let { id } = req.session.userInfo
  notifsDao.getNotifisByChefStation(id)
    .then(notifications => {
      res.render('chefstation/notifs/lister', { notifications })
    })
    .catch(e => {
      res.render('chefstation/notifs/lister')
    })
})

router.get('/envoyer', [checkUserConnected, checkUserRoleChef], (req, res) => {
  res.render('chefstation/notifs/ajout')
})

router.post('/envoyer', [checkUserConnected, checkUserRoleChef], (req, res) => {
  let { id } = req.session.userInfo
  let { nom_station } = req.session.chefStationInfo
  let { sujet, msg } = req.body

  notifsDao.addNotification(new Notification(sujet, msg, nom_station, id))
    .then(result => {
      res.render('chefstation/notifs/ajout', { msg: 'votre message a été bien enovyé' })
    })
    .catch(e => {
      res.render('chefstation/notifs/ajout', { msg: 'Erreur d\'envoie, réessayez plus tard' })
    })
})

router.get('/modifier', [checkUserConnected, checkUserRoleChef], (req, res) => {
  let { notif } = req.query
  notifsDao.getNotifisById(notif)
    .then(result => {
      res.render('chefstation/notifs/modifier', { notification: result[0] })
    })
    .catch(e => {
      res.render('chefstation/notifs')
    })
})

router.post('/modifier', [checkUserConnected, checkUserRoleChef], (req, res) => {
  let { sujet, message, idnotif } = req.body
  let notif = new Notification(sujet, message, '', '')

  notifsDao.updateNotification(notif, idnotif)
    .then(result => {
      res.redirect('/chefstation/notifications')
    })
    .catch(e => {
      res.redirect('/chefstation/notifications')
    })
})

router.get('/supprimer', [checkUserConnected, checkUserRoleChef], (req, res) => {
  let { notif } = req.query
  notifsDao.deletNotification(notif)
    .then(result => {
      res.redirect('/chefstation/notifications')
    })
    .catch(e => {
      res.render('chefstation/notifications')
    })
})

module.exports = router