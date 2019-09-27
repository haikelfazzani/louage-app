var express = require('express');
var router = express.Router();
var { checkUserConnected, checkAdminOrChef } = require('../../middleware/authorisation')
var Role = require('../../model/Role.enum')

var utilisateurDao = require('../../dao/utilisateurs.dao');
var stationDao = require('../../dao/stations.dao');
var voyageDao = require('../../dao/voyages.dao')
var reservDao = require('../../dao/reservations.dao')
var vehiculeDao = require('../../dao/vehicules.dao')

router.get('/', [checkUserConnected, checkAdminOrChef], function (req, res) {

    let { id, email, role } = req.session.userInfo

    stationDao.getStationByChef(email)
        .then(resStation => {
            req.session.chefStationInfo = resStation[0]
            const promises = (role && role === Role.admin)
                ? [
                    utilisateurDao.getUsers(),
                    stationDao.getStations()
                ]
                : [
                    voyageDao.getVoyageByNomStation(resStation[0].nom_station),
                    reservDao.getAllReservationsByStation(resStation[0].id_station),
                    vehiculeDao.getVehicules(id)
                ]

            Promise.all(promises).then(function (values) {
                let data = (role && role === Role.admin)
                    ? {
                        utilisateurs: values[0],
                        stations: values[1]
                    }
                    : {
                        voyages: values[0],
                        reservations: values[1],
                        vehicules: values[2]
                    }
                res.render('admin/index', { data });
            })
                .catch(error => {
                    res.render('admin/index');
                });
        })
        .catch(error => error)
});

router.get('/voyages.json', [checkUserConnected, checkAdminOrChef], function (req, res) {

    let { nom_station } = req.session.chefStationInfo

    voyageDao.getVoyageByNomStation(nom_station)
        .then(function (voyages) {
            res.status(200).json(voyages);
        })
        .catch(error => {
            res.status(404).json(voyages);
        });
});

router.get('/utilisateurs.json', [checkUserConnected, checkAdminOrChef], function (req, res) {

    utilisateurDao.getUsers()
        .then(function (utilisateurs) {
            res.status(200).json(utilisateurs);
        })
        .catch(error => {
            res.status(404).json(utilisateurs);
        });
});

module.exports = router;