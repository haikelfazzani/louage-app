const db = require('../database/connection');
var SqlString = require('sqlstring')
var EtatReservation = require('../model/EtatReservation.enum')

var knex = require('../database/knex')

const table = {
  name: 'reservations',
  uidReservation: 'uid_reservation',
  nbPlaceReserv: 'nb_place_reserver',
  totalPrixPlaces: 'total_prix_places',
  etatReserv: 'etat_reservation',
  idClient: 'id_client',
  idVoyage: 'id_voyage',
  timestamp: 'timestamp_reservation'
}

module.exports = ReservationsDao = {

  addReservation (Reservation) {

    let { uidReservation, nbPlaceReserv, totalPrixPlaces, idClient, idVoyage } = Reservation;

    return knex(table.name)
      .insert({
        uid_reservation: uidReservation,
        nb_place_reserver: nbPlaceReserv,
        total_prix_places: totalPrixPlaces,
        etat_reservation: EtatReservation.payer,
        id_client: idClient,
        id_voyage: idVoyage,
        timestamp_reservation: new Date().toISOString()
      })
  },

  updateEtatReserv (etat, uidReservation) {

    const rq = `update ${table.name} 
    set ${table.etatReserv} = ? where ${table.uidReservation} = ? `;

    const sql = SqlString.format(rq, [etat, uidReservation]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  deleteReservByEtat () {
    const rq = `delete from ${table.name} where ${table.etatReserv} = ?`;

    const sql = SqlString.format(rq, EtatReservation.enAttente);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getReservByUser (email) {
    const rq = `select * from ${table.name} t 
    join utilisateurs u on t.id_client = u.id 
    join voyages v on t.id_voyage = v.id_voyage
    join stations s on s.id_station = v.id_station
    WHERE u.email = ? 
    ORDER BY t.uid_reservation DESC`;

    const sql = SqlString.format(rq, email);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getReservations () {
    const sql = `select * from ${table.name} t join utilisateurs u
    on t.id_client = u.id ORDER BY t.id_reservation DESC`;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })

  },

  getAllReservationsByStation (idStation) {
    const rq = `SELECT * from ${table.name} r join voyages v
    ON r.id_voyage = v.id_voyage WHERE v.id_station = ? `;

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
    join voyages v on t.id_voyage = v.id_voyage 
    WHERE v.id_station = ?
    ORDER BY t.uid_reservation DESC`;

    const sql = SqlString.format(rq, idStation);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}