var router = require('express').Router()
var notifsDao = require('../../dao/notifications.dao')
var Notification = require('../../model/Notification')
var { checkUserConnected } = require('../../middleware/authorisation')

router.get('/', checkUserConnected, (req, res) => {
  let { id } = req.session.userInfo
  notifsDao.getNotifisByChefStation(id)
    .then(notifications => {
      res.render('admin/notifs/lister', { notifications })
    })
    .catch(error => {
      res.render('admin/notifs/lister')
    })
})

router.get('/envoyer', checkUserConnected, (req, res) => {
  res.render('admin/notifs/ajout')
})

router.post('/envoyer', checkUserConnected, (req, res) => {
  let { id } = req.session.userInfo
  let { nom_station } = req.session.chefStationInfo
  let { sujet, msg } = req.body

  notifsDao.addNotification(new Notification(sujet, msg, nom_station, id))
    .then(result => {
      res.render('admin/notifs/ajout', { msg: 'votre message a été bien enovyé' })
    })
    .catch(error => {
      res.render('admin/notifs/ajout', { msg: 'Erreur d\'envoie, réessayez plus tard' })
    })
})

router.get('/modifier', checkUserConnected, (req, res) => {
  let { notif } = req.query
  notifsDao.getNotifisById(notif)
    .then(result => {
      res.render('admin/notifs/modifier', { notification: result[0] })
    })
    .catch(error => {
      res.render('admin/notifs')
    })
})

router.post('/modifier', checkUserConnected, (req, res) => {
  let { sujet, message, idnotif } = req.body
  let notif = new Notification(sujet, message, '', '')

  notifsDao.updateNotification(notif, idnotif)
    .then(result => {
      res.redirect('/admin/notifications')
    })
    .catch(error => {
      res.redirect('/admin/notifications')
    })
})

router.get('/supprimer', checkUserConnected, (req, res) => {
  let { notif } = req.query
  notifsDao.deletNotification(notif)
    .then(result => {
      res.redirect('/admin/notifications')
    })
    .catch(error => {
      res.render('admin/notifications')
    })
})

module.exports = router