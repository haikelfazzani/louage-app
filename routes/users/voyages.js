var router = require('express').Router()
var voyagesDao = require('../../dao/voyages.dao')

router.post('/', (req, res) => {
  let { nomstation } = req.body

  voyagesDao.getVoyageByNomStation(nomstation)
    .then(voyages => {
      res.render('voyages', { voyages })
    })
    .catch(error => {
      res.render('voyages')
    })
})

module.exports = router