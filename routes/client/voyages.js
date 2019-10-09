var router = require('express').Router()
var voyagesDao = require('../../dao/voyages.dao')

router.post('/', (req, res) => {
  let { nomstation, arrive, date } = req.body

  Promise.all([
    voyagesDao.getVoyages(),
    voyagesDao.getVoyageByNomStation(nomstation)
  ])
    .then(values => {

      date = date && date.trim().length > 4 && Date.parse(date) >= Date.parse(new Date())
        ? date
        : (new Date()).toISOString().slice(0, 10);

      if (arrive && arrive.length > 3) {
        values[1] = values[1].filter(v => v.arrive === arrive && v.date_depart === date)
      }

      let compDate = (dp, h, d) => (Date.parse(dp) + (1000 * 60 * 60 * (parseInt(h, 10) - 1))) >= Date.parse(d)
      let voyages = values[1]
        .filter(v => v.nb_places > 0 && compDate(v.date_depart, v.heure_depart, new Date()))

      let stations = values[0].filter((v, i, self) =>
        i === self.findIndex((t) => (t.nom_station === v.nom_station))
      )

      let arrives = values[0].filter((v, i, self) =>
        i === self.findIndex((t) => (t.arrive === v.arrive))
      )

      res.render('client/voyages', { voyages, stations, arrives })
    })
    .catch(error => {
      res.render('client/voyages')
    })
})

module.exports = router