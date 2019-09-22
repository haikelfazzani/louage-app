const db = require('../database/connection');
var SqlString = require('sqlstring');
var knex = require('../database/knex')

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
    return knex('voyages')
      .join('stations', 'voyages.id_station', '=', 'stations.id_station')
      .orderBy(' voyages.id_voyage', 'desc')
  },

  getVoyageById (id_voyage) {
    return knex(table.name)
      .join('stations', { 'voyages.id_station': 'stations.id_station' })
      .where({ id_voyage })
  },

  nbPlacesByDestination (destination, timestampVoyage, station) {
    const rq = `SELECT sum(v.nb_places) as nb
    FROM ${table.name} v join stations s
    on v.id_station = s.id_station
    where v.destination = ? and v.timestamp_voyage = ? and s.nom_station = ? 
    GROUP BY v.nb_places`;

    const sql = SqlString.format(rq, [destination, timestampVoyage, station]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getVoyageByDateAndStation (destination, timestampVoyage, station) {
    const rq = `select * from ${table.name} v join stations u 
    on v.id_station = u.id_station 
    WHERE v.destination = ? and v.timestamp_voyage = ? and u.nom_station = ?
    ORDER BY v.id_voyage DESC`;

    const sql = SqlString.format(rq, [destination, timestampVoyage, station]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  voyagesByDestAndStationAndDate (station, destination, date) {
    const rq = `SELECT * from ${table.name} v join stations s
    on v.id_station = s.id_station
    where s.nom_station = ? and v.destination = ? and v.date_depart = ? `;

    const sql = SqlString.format(rq, [station, destination, date]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}