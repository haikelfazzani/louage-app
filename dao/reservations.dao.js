const db = require('../database/connection');
var SqlString = require('sqlstring');

const table = {
  name: 'reservations',
  idReserv: 'id_reservation',
  nbPlaceReserv: 'nb_place_reserver',
  totalPrixPlaces: 'total_prix_places',
  etatReserv: 'etat_reservation',
  idClient: 'id_client',
  idVoyage: 'id_voyage',
  timestamp: 'timestamp'
}

module.exports = ReservationsDao = {

  addReservation (Reservation) {

    let { nbPlaceReserv, totalPrixPlaces, etatReservation, idClient, idVoyage } = Reservation;

    const rq = `INSERT INTO ${table.name} 
    (${table.nbPlaceReserv}, ${table.totalPrixPlaces}, ${table.etatReserv}, 
      ${table.idClient}, ${table.idVoyage}, ${table.timestamp}) values(?, ? , ? , ?, ?, ?)`;

    const sql = SqlString.format(rq,
      [
        nbPlaceReserv, totalPrixPlaces, etatReservation,
        idClient, idVoyage, new Date().toISOString()
      ]
    );

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  updateEtatReserv (etat, idReserv) {

    const rq = `update ${table.name} 
    set ${table.etatReserv} = ? where ${table.idReserv} = ? `;

    const sql = SqlString.format(rq, [etat, idReserv]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  deleteReservation (idReserv) {
    const rq = `delete from ${table.name} where ${table.idReserv} = ?`;

    const sql = SqlString.format(rq, idReserv);

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
    WHERE u.email = ? ORDER BY t.id_reservation DESC`;

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

  getAllReservations () {
    const sql = `select * from ${table.name}`;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })

  }
}