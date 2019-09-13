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

  updateVehicule (Vehicule) {
    let { conducteur, destination, nbrPlace, heurDepart, dateDepart, prixPalce, idStation } = Vehicule;

    const rq = `update ${table.name} 
    set ${table.ville} = ? ,
        ${table.tel} = ?,
        ${table.chefVehicule} = ?
    where ${table.nomVehicule} = ? `;

    const sql = SqlString.format(rq, [ville, tel, chefVehicule, nomVehicule]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  deletVehicule (nomVehicule) {
    const rq = `delete from ${table.name} where ${table.nomVehicule} = ?`;

    const sql = SqlString.format(rq, nomVehicule);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getVehicule (nomVehicule) {
    const rq = `select * from ${table.name} where ${table.nomVehicule} = ? limit 1`;

    const sql = SqlString.format(rq, nomVehicule);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getVehicules () {
    const sql = `select * from ${table.name} t join utilisateurs u
    on t.chef_station = u.id`;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })

  }
}