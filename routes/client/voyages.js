var router = require('express').Router()
var voyagesDao = require('../../dao/voyages.dao')

router.post('/', (req, res) => {
  let { nomstation, destination, date } = req.body

  Promise.all([
    voyagesDao.getVoyages(),
    voyagesDao.getVoyageByNomStation(nomstation)
  ])
    .then(values => {

      date = date && date.trim().length > 4 && Date.parse(date) >= Date.parse(new Date())
        ? date
        : (new Date()).toISOString().slice(0, 10);

      if (destination && destination.length > 3) {
        values[1] = values[1].filter(v => v.destination === destination && v.date_depart === date)
      }

      let compDate = (dp, h, d) => (Date.parse(dp) + (1000 * 60 * 60 * (parseInt(h, 10) - 1))) >= Date.parse(d)
      let voyages = values[1]
        .filter(v => v.nb_places > 0 && compDate(v.date_depart, v.heure_depart, new Date()))

      let stations = values[0].filter((v, i, self) =>
        i === self.findIndex((t) => (t.nom_station === v.nom_station))
      )

      let destinations = values[0].filter((v, i, self) =>
        i === self.findIndex((t) => (t.destination === v.destination))
      )

      res.render('client/voyages', { voyages, stations, destinations })
    })
    .catch(error => {
      res.render('client/voyages')
    })
})

module.exports = router