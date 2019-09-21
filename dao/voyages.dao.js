const db = require('../database/connection');
var SqlString = require('sqlstring');

const table = {
  name: 'voyages',
  idVoyage: 'id_voyage',
  destination: 'destination',
  heureDepart: 'heure_depart',
  dateDepart: 'date_depart',
  prixPlace: 'prix_place',
  nbPlaces: 'nb_places',
  idStation: 'id_station',
  timestamp: 'timestamp_voyage'
}

module.exports = VoyagesDao = {

  addVoyage (Voyage) {

    let { destination, heureDepart, dateDepart, prixPlace, nbPlaces, idStation } = Voyage;

    const rq = `INSERT INTO ${table.name} 
    (${table.destination}, ${table.heureDepart}, 
      ${table.dateDepart}, ${table.prixPlace}, 
      ${table.nbPlaces}, ${table.idStation}, 
      ${table.timestamp}) 
    values(?, ? , ? , ? , ?, ?, ?)`;

    const sql = SqlString.format(rq,
      [destination, heureDepart, dateDepart, prixPlace, nbPlaces, idStation, new Date().toISOString()]
    );

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  updateVoyage (Voyage, idVoyage) {
    let { destination, heureDepart, dateDepart, prixPlace, nbPlaces } = Voyage;

    const rq = `update ${table.name} 
    set ${table.destination} = ? ,
        ${table.heureDepart} = ?,
        ${table.dateDepart} = ?,
        ${table.prixPlace} = ?,
        ${table.nbPlaces} = ?
    where ${table.idVoyage} = ? `;

    const sql = SqlString.format(rq,
      [destination, heureDepart, dateDepart, prixPlace, nbPlaces, idVoyage]
    );

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  updateNbPlaces (nbPlaces, idVoyage) {

    const rq = `update ${table.name} 
    set ${table.nbPlaces} = ? where ${table.idVoyage} = ? `;

    const sql = SqlString.format(rq, [nbPlaces, idVoyage]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  deletVoyage (idVoyage) {
    const rq = `delete from ${table.name} where ${table.idVoyage} = ?`;

    const sql = SqlString.format(rq, idVoyage);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getVoyageByNomStation (nomStation) {
    const rq = `SELECT * FROM ${table.name} v JOIN stations s 
    ON v.id_station = s.id_station WHERE s.nom_station = ? 
    ORDER BY v.id_voyage DESC`;

    const sql = SqlString.format(rq, nomStation);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getVoyages () {
    const sql = `select * from ${table.name} v join stations u 
    on v.id_station = u.id_station ORDER BY v.id_voyage DESC`;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  nbPlacesByDestination (destination, station) {
    const rq = `SELECT sum(v.nb_places) as nb
    FROM ${table.name} v join stations s
    on v.id_station = s.id_station
    where v.destination = ? and s.nom_station = ? 
    GROUP BY v.nb_places`;

    const sql = SqlString.format(rq, [destination, station]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getVoyageByDateAndStation (date, station) {
    const rq = `select * from ${table.name} v join stations u 
    on v.id_station = u.id_station 
    WHERE v.timestamp_voyage = ? and u.nom_station = ?
    ORDER BY v.id_voyage DESC`;

    const sql = SqlString.format(rq, [date, station]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}