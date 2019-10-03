var db = require('../database/connection')
var knex = require('../database/knex')
var SqlString = require('sqlstring')
var EtatReservation = require('../model/EtatReservation.enum')

const table = {
  name: 'reservations',
  uidReservation: 'uid_reservation',
  nbPlaceReserv: 'nb_place_reserver',
  totalPrixPlaces: 'total_prix_places',
  etatReservation: 'etat_reservation',
  idClient: 'id_client',
  uidVoyage: 'uid_voyage',
  timestamp: 'timestamp_reservation'
}

module.exports = ReservationsDao = {

  addReservation (Reservation) {
    let { uidReservation, nbPlaceReserv, totalPrixPlaces, etatReservation, idClient, uidVoyage } = Reservation;

    return knex(table.name)
      .insert({
        uid_reservation: uidReservation,
        nb_place_reserver: nbPlaceReserv,
        total_prix_places: totalPrixPlaces,
        etat_reservation: etatReservation,
        id_client: idClient,
        uid_voyage: uidVoyage,
        timestamp_reservation: new Date().toISOString()
      })
  },
  updateEtatReserv (etat, uidReservation) {
    return knex(table.name).update({ etat_reservation: etat })
      .where(table.uidReservation, '=', uidReservation)
  },
  getReservByUser (email) {
    const rq = `select * from ${table.name} t 
    join utilisateurs u on t.id_client = u.id 
    join voyages v on t.uid_voyage = v.uid_voyage
    join stations s on s.id_station = v.id_station
    WHERE u.email = ?`;

    const sql = SqlString.format(rq, email);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },
  getAllReservationsByStation (idStation) {
    const rq = `SELECT * from ${table.name} r join voyages v ON r.uid_voyage = v.uid_voyage 
    WHERE v.id_station = ? `;

    const sql = SqlString.format(rq, idStation);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },
  getReservsVoyagesUsers (idStation) {
    const rq = `select * from ${table.name} t 
    join utilisateurs u on t.id_client = u.id 
    join voyages v on t.uid_voyage = v.uid_voyage 
    WHERE v.id_station = ?`;

    const sql = SqlString.format(rq, idStation);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}