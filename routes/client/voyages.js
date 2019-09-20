var router = require('express').Router()
var voyagesDao = require('../../dao/voyages.dao')

router.post('/', (req, res) => {
  let { nomstation } = req.body

  voyagesDao.getVoyageByNomStation(nomstation)
    .then(voyages => {
      console.log(voyages)
      res.render('client/voyages', { voyages })
    })
    .catch(error => {
      res.render('client/voyages')
    })
})

module.exports = router