var router = require('express').Router()
var voyagesDao = require('../../dao/voyages.dao')

router.post('/', (req, res) => {

  Promise.all([
    voyagesDao.getVoyages(),
    voyagesDao.getVoyageByNomStation(req.body.nomstation)
  ])
    .then(values => {

      let compDate = (dp, h, d) => (Date.parse(dp) + (1000 * 60 * 60 * (parseInt(h, 10) - 1))) >= Date.parse(d)
      let voyages = values[1]
        .filter(v => v.nb_places > 0 && compDate(v.date_depart, v.heure_depart, new Date()))

      let stations = values[0].filter((v, i, self) =>
        i === self.findIndex((t) => (t.nom_station === v.nom_station))
      )

      let destinations = values[0].filter((v, i, self) =>
        i === self.findIndex((t) => (t.destination === v.destination))
      )

      res.cookie('allvoyages', JSON.stringify({
        allVoyages: values[0], stations, destinations
      }), { maxAge: 1000 * 60 * 30, httpOnly: true })
      res.render('client/voyages', { voyages, stations, destinations })
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

  let { allVoyages, stations, destinations } = JSON.parse(req.cookies.allvoyages);

  voyagesDao.voyagesByDestAndStationAndDate(station.trim(), destination.trim(), date)
    .then(voyages => {
      res.render('client/voyages', { voyages, allVoyages, stations, destinations })
    })
    .catch(error => {
      res.render('client/voyages')
    })
})

module.exports = router