const db = require('../database/connection');
var SqlString = require('sqlstring');

const table = {
  name='vehicules',
  idVehicule: 'id_vehicule',
  proprietaire: 'proprietaire',
  nbPlaces: 'nb_places',
  tel: "tel",
  idStation: 'id_station' // clé étrangaire
}

module.exports = VehiculesDao = {

  addVehicule (Vehicule) {

    let { proprietaire, nbPlaces, tel, idStation } = Vehicule;

    const rq = `INSERT INTO ${table.name} 
    (${table.proprietaire}, ${table.nbPlaces}, ${table.tel}, ${table.idStation}) values(?, ? , ? , ?)`;

    const sql = SqlString.format(rq, [proprietaire, nbPlaces, tel, idStation]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  updateVehicule (idVehicule) {
    let { proprietaire, nbPlaces, tel, idStation } = Vehicule;

    const rq = `update ${table.name} 
    set ${table.proprietaire} = ? ,
        ${table.nbPlaces} = ?,
        ${table.tel} = ?,
        ${table.idStation} = ?
    where ${table.idVehicule} = ? `;

    const sql = SqlString.format(rq, [proprietaire, nbPlaces, tel, idStation, idVehicule]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  deletVehicule (idVehicule) {
    const rq = `delete from ${table.name} where ${table.idVehicule} = ?`;

    const sql = SqlString.format(rq, idVehicule);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getVehicule (proprietaire) {
    const rq = `select * from ${table.name} where ${table.proprietaire} = ?`;

    const sql = SqlString.format(rq, proprietaire);

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