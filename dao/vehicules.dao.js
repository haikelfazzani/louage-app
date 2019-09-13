const db = require('../database/connection');
var SqlString = require('sqlstring');

const table = {
  name: 'stations',
  idVehicule: 'id_vehicule',
  conducteur: 'conducteur',
  destination: 'destination',
  nbPlaces: 'nb_places',
  heureDepart: 'heure_depart',
  dateDepart: 'date_depart',
  prixPlace: 'prix_place',
  idStation: 'id_station' // clé étrangére
}

module.exports = VehiculesDao = {

  addVehicule (Vehicule) {

    let { conducteur, destination, nbrPlace, heurDepart, dateDepart, prixPalce, idStation } = Vehicule;

    const rq = `INSERT INTO ${table.name} 
    (${table.conducteur}, ${table.destination}, ${table.nbrPlace}, ${table.heurDepart},
      ${table.dateDepart}, ${table.prixPalce}, ${table.idStation})
    values(?, ? , ? , ?, ? , ? , ?)`;

    const sql = SqlString.format(rq, [conducteur, destination, nbrPlace, heurDepart, dateDepart, prixPalce, idStation]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  updateVehicule (conducteur) {
    let { conducteur, destination, nbrPlace, heurDepart, dateDepart, prixPalce, idStation } = Vehicule;

    const rq = `update ${table.name} 
    set ${table.destination} = ? ,
        ${table.nbrPlace} = ?,
        ${table.heurDepart} = ?,
        ${table.dateDepart} = ?,
        ${table.prixPalce} = ?
    where ${table.conducteur} = ? `;

    const sql = SqlString.format(rq, [destination, nbrPlace, heurDepart, dateDepart, prixPalce, conducteur]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  deletVehicule (conducteur) {
    const rq = `delete from ${table.name} where ${table.conducteur} = ?`;

    const sql = SqlString.format(rq, conducteur);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getVehicule (conducteur) {
    const rq = `select * from ${table.name} where ${table.conducteur} = ?`;

    const sql = SqlString.format(rq, conducteur);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getVehicules () {
    const sql = `select * from ${table.name} t join stations u on t.id_vehicule = u.id_vehicule`;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })

  }
}