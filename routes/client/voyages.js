var router = require('express').Router()
var voyagesDao = require('../../dao/voyages.dao')

router.post('/', (req, res) => {

  let { nomstation } = req.body

  Promise.all([
    voyagesDao.getVoyages(),
    voyagesDao.getVoyageByNomStation(nomstation)
  ])
    .then(values => {
      
      let compDate = (dp, h, d) => (Date.parse(dp) + (1000 * 60 * 60 * (parseInt(h, 10) - 1))) >= Date.parse(d)
      let voyages = values[1]
        .filter(v => v.nb_places > 0 && compDate(v.date_depart, v.heure_depart, new Date()))

      let allVoyages = values[0]

      res.cookie('allvoyages', JSON.stringify(allVoyages), { maxAge: 1000 * 60 * 30, httpOnly: true })
      res.render('client/voyages', { voyages, allVoyages })
    })
    .catch(error => {
      res.render('client/voyages')
    })
})


router.post('/result', (req, res) => {

  let { station, destination, date } = req.body
  date = date.trim().length > 4 && Date.parse(date) >= Date.parse(new Date())
    ? date
    : (new Date()).toISOString().slice(0, 10);

  voyagesDao.voyagesByDestAndStationAndDate(station.trim(), destination.trim(), date)
    .then(voyages => {
      res.render('client/voyages', { voyages, allVoyages: JSON.parse(req.cookies.allvoyages) })
    })
    .catch(error => {
      res.render('client/voyages')
    })
})

module.exports = router