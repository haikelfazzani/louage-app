const db = require('../database/connection');
var SqlString = require('sqlstring');

const table = {
  name: 'vehicules',
  idVehicule: 'id_vehicule',
  proprietaire: 'proprietaire',
  numSerie: 'num_serie',
  nbPlaces: 'nb_places',
  tel: "tel",
  idStation: 'id_station', // clé étrangaire
  timestamp: 'timestamp'
}

module.exports = VehiculesDao = {

  addVehicule (Vehicule) {

    let { proprietaire, numSerie, nbPlaces, tel, idStation } = Vehicule;

    const rq = `INSERT INTO ${table.name} 
    (${table.proprietaire}, ${table.numSerie}, 
      ${table.nbPlaces}, ${table.tel}, ${table.idStation}, ${table.timestamp}) 
    values(?, ? , ? , ? , ?, ?)`;

    const sql = SqlString.format(rq,
      [proprietaire, numSerie, nbPlaces, tel, idStation, new Date().toString()]
    );

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  updateVehicule (numSerie) {
    let { proprietaire, nbPlaces, tel, idStation } = Vehicule;

    const rq = `update ${table.name} 
    set ${table.proprietaire} = ? ,
        ${table.nbPlaces} = ?,
        ${table.tel} = ?,
        ${table.idStation} = ?
    where ${table.numSerie} = ? `;

    const sql = SqlString.format(rq, [proprietaire, nbPlaces, tel, idStation, numSerie]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  deletVehicule (numSerie) {
    const rq = `delete from ${table.name} where ${table.numSerie} = ?`;

    const sql = SqlString.format(rq, numSerie);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getVehicule (numSerie) {
    const rq = `select * from ${table.name} where ${table.numSerie} = ?`;

    const sql = SqlString.format(rq, numSerie);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getVehicules () {
    const sql = `select * from ${table.name} t join stations u 
    on t.id_station = u.id_station ORDER BY t.id_station DESC`;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })

  }
}