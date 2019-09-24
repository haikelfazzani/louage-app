const db = require('../database/connection');
var SqlString = require('sqlstring');
var knex = require('../database/knex')

const table = {
  name: 'utilisateurs',
  id: 'id',
  nom: 'nom',
  prenom: 'prenom',
  email: 'email',
  password: 'password',
  avatar: 'avatar',
  tel: 'tel',
  etatEmail: 'etat_email',
  role: 'role',
  timestamp: 'timestamp_utilisateur'
}

const UtilisateurDao = {

  addUser (User) {
    let { email, password, role } = User;

    const rq = `INSERT INTO ${table.name} 
    (${table.email}, ${table.password}, ${table.role}, ${table.timestamp}) values(?, ? , ?, ?)`;

    const sql = SqlString.format(rq, [email, password, role, new Date().toISOString()]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },
  updateEtat (email) {
    return knex(table.name).where({ email }).update({ etat_email: 1 })
  },

  updateUser (id, user) {
    let { nom, prenom, email, tel } = user
    return knex(table.name).where({ id }).update({ nom, prenom, email, tel })
  },

  updateUserPassword (email, password) {

    const rq = `update ${table.name} set ${table.password} = ? where ${table.email} = ? `;
    const sql = SqlString.format(rq, [password, email]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  deleteUser (password) {
    const rq = `delete from ${table.name} where ${table.password} = ?`;
    const sql = SqlString.format(rq, password);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  deleteUserByEmail (email) {
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
    const rq = `select * from ${table.name} where ${table.role} = ? ORDER BY ${table.id} DESC`;
    const sql = SqlString.format(rq, role);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getUser (email) {
    return knex(table.name).where({ email })
  },

  getUserById (id) {
    return knex(table.name).where({ id })
  },
  getUsers () {
    return knex(table.name).orderBy(table.id, 'DESC')
  },

  updateAvatar (avatar, email) {

    const rq = `update ${table.name} set ${table.avatar} = ? where ${table.email} = ? `;
    const sql = SqlString.format(rq, [avatar, email]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getAvatar (email) {
    const rq = `select ${table.avatar} from ${table.name} where ${table.email} = ?`;

    const sql = SqlString.format(rq, email);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}
module.exports = UtilisateurDao