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
  timestamp: 'timestamp'
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
      [destination, heureDepart, dateDepart, prixPlace, nbPlaces, idStation, new Date().toString()]
    );

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  updateVoyage (idVoyage) {
    let { proprietaire, nbPlaces, tel, idStation } = Voyage;

    const rq = `update ${table.name} 
    set ${table.proprietaire} = ? ,
        ${table.nbPlaces} = ?,
        ${table.tel} = ?,
        ${table.idStation} = ?
    where ${table.idVoyage} = ? `;

    const sql = SqlString.format(rq, [proprietaire, nbPlaces, tel, idStation, idVoyage]);

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

  getVoyage (station) {
    const rq = `select * from ${table.name} 
    where ${table.idVoyage} = ?`;

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
    ON v.id_station = s.id_station WHERE s.nom_station = ? ORDER BY v.id_voyage DESC`;

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

  nbPlacesByDestination(destination) {
    const rq = `SELECT sum(${table.nbPlaces}) as nb
    FROM ${table.name} where ${table.destination} = ? GROUP BY ${table.nbPlaces}`;

    const sql = SqlString.format(rq, destination);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}