var express = require('express')
var router = express.Router()
var { checkUserConnected, checkAdminOrChef } = require('../../middleware/authorisation')

var voyageDao = require('../../dao/voyages.dao')
var reservDao = require('../../dao/reservations.dao')
var vehiculeDao = require('../../dao/vehicules.dao')

router.get('/', [checkUserConnected, checkAdminOrChef], function (req, res) {

    const promises = [
        voyageDao.getVoyageByNomStation(resStation[0].nom_station),
        reservDao.getAllReservationsByStation(resStation[0].id_station),
        vehiculeDao.getVehicules()
    ]

    Promise.all(promises)
        .then((values) => {
            let data = {
                voyages: values[0], reservations: values[1], vehicules: values[2]
            }
            res.render('chefstation/index', { data })
        })
        .catch(error => {
            res.render('chefstation/index')
        })
})

router.get('/voyages.json', [checkUserConnected, checkAdminOrChef], function (req, res) {

    let { nom_station } = req.session.chefStationInfo

    voyageDao.getVoyageByNomStation(nom_station)
        .then(function (voyages) {
            res.status(200).json(voyages);
        })
        .catch(error => {
            res.status(404).json(voyages);
        })
})

router.get('/utilisateurs.json', [checkUserConnected, checkAdminOrChef], function (req, res) {

    utilisateurDao.getUsers()
        .then(function (utilisateurs) {
            res.status(200).json(utilisateurs);
        })
        .catch(error => {
            res.status(404).json(utilisateurs);
        })
})

module.exports = router