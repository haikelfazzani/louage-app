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
  timestamp: 'timestamp_vehicule'
}

module.exports = VehiculesDao = {

  addVehicule (Vehicule) {

    let { proprietaire, numSerie, nbPlaces, tel, idStation } = Vehicule;

    const rq = `INSERT INTO ${table.name} 
    (${table.proprietaire}, ${table.numSerie}, 
      ${table.nbPlaces}, ${table.tel}, ${table.idStation}, ${table.timestamp}) 
    values(?, ? , ? , ? , ?, ?)`;

    const sql = SqlString.format(rq,
      [proprietaire, numSerie, nbPlaces, tel, idStation, new Date().toISOString()]
    );

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  updateVehicule (Vehicule, idVehicule) {
    let { proprietaire, numSerie, nbPlaces, tel } = Vehicule;

    const rq = `update ${table.name} 
    set  ${table.proprietaire} = ? , ${table.numSerie} = ?, ${table.nbPlaces} = ?, ${table.tel} = ?
    where ${table.idVehicule} = ?`;

    const sql = SqlString.format(rq, [proprietaire, numSerie, nbPlaces, tel, idVehicule]);

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
    const rq = `select * from ${table.name} v
    join stations s on v.id_station = s.id_station
    where v.num_serie = ?`;

    const sql = SqlString.format(rq, numSerie);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getVehicules (chefStation) {
    const rq = `select * from ${table.name} t join stations s 
    on t.id_station = s.id_station WHERE s.chef_station = ?`;

    const sql = SqlString.format(rq, chefStation);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}