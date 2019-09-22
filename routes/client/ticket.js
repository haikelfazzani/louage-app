var router = require('express').Router()

var paymentDao = require('../../dao/payments.dao')

router.get('/', (req, res) => {
  let { id, email } = req.session.userInfo

  paymentDao.getPayments(id)
    .then(result => {
      console.log(result)
      res.render('client/ticket', {
        msg: 'Merci, votre paiment a été bien effectuer', paymentInfo: result[0],
        email
      })
    })
    .catch(error => {
      console.log(error)
      res.render('client/ticket', { msg: 'Merci, votre paiment a été bien effectuer' })
    })
})

module.exports = router