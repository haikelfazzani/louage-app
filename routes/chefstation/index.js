var express = require('express')
var router = express.Router()
var { checkUserConnected, checkAdminOrChef } = require('../../middleware/authorisation')

var voyageDao = require('../../dao/voyages.dao')
var reservDao = require('../../dao/reservations.dao')
var vehiculeDao = require('../../dao/vehicules.dao')
var stationDao = require('../../dao/stations.dao')

router.get('/', [checkUserConnected, checkAdminOrChef], function (req, res) {

    stationDao.getStationByChef(req.session.userInfo.email)
        .then(r => {
            req.session.chefStationInfo = r[0]
            let { id_station, nom_station } = r[0]

            const promises = [
                vehiculeDao.getVehicules(),
                voyageDao.getVoyageByNomStation(nom_station),
                reservDao.getAllReservationsByStation(id_station),
            ]

            Promise.all(promises)
                .then((values) => {
                    let data = {
                        vehicules: values[0],
                        voyages: values[1],
                        reservations: values[2]
                    }
                    res.render('chefstation/index', { data })
                })
                .catch(error => {
                    res.render('chefstation/index')
                })
        })
        .catch(e => { res.redirect('/404') })
})

router.get('/voyages.json', [checkUserConnected, checkAdminOrChef], function (req, res) {

    voyageDao.getVoyageByNomStation(req.session.chefStationInfo.nom_station)
        .then(function (voyages) {
            res.status(200).json(voyages)
        })
        .catch(error => {
            res.status(404).json(voyages)
        })
})

module.exports = router