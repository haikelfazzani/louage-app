var router = require('express').Router()
var notifDao = require('../../dao/notifications.dao')
var { checkUserConnected } = require('../../middleware/authorisation')

router.get('/', checkUserConnected, (req, res) => {
  notifDao.getNotifications()
    .then(notifications => {
      res.render('client/profile/notifs', { notifications })
    })
    .catch(error => {
      res.render('client/profile')
    })
})

module.exports = router