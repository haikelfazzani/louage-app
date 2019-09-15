const db = require('../database/connection');
var SqlString = require('sqlstring');

const table = {
  name: 'utilisateurs',
  id: 'id',
  nom: 'nom', prenom: 'prenom',
  email: 'email', password: 'password',
  avatar: 'avatar', role: 'role'
}

const UtilisateurDao = {

  addUser (User) {

    let { email, password, avatar, role } = User;

    const rq = `INSERT INTO 
    ${table.name} (${table.email}, ${table.password}, ${table.avatar}, ${table.role})
    values(?, ? , ? , ?)`;

    const sql = SqlString.format(rq, [email, password, avatar, role]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  updateUser (user) {

    let { nom, prenom, email, password } = user;

    const rq = `update ${table.name} 
    set ${table.password} = ? ,
        ${table.nom} = ? ,
        ${table.prenom} = ? 
    where ${table.email} = ? `;

    const sql = SqlString.format(rq, [nom, prenom, password, email]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  deleteUser (email) {
    const rq = `delete from ${table.name} where ${table.email} = ?`;

    const sql = SqlString.format(rq, email);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getUserByRole (role) {
    const rq = `select * from ${table.name} where ${table.role} = ?`;

    const sql = SqlString.format(rq, role);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getUser (email) {
    const rq = `select * from ${table.name} where ${table.email} = ?`;

    const sql = SqlString.format(rq, email);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getUsers () {
    const sql = `select * from ${table.name}`;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })

  }
}

module.exports = UtilisateurDao;