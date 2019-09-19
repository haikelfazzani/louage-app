const db = require('../database/connection');
var SqlString = require('sqlstring');

const table = {
  name: 'utilisateurs',
  id: 'id',
  nom: 'nom',
  prenom: 'prenom',
  email: 'email',
  password: 'password',
  avatar: 'avatar',
  tel: 'tel',
  role: 'role',
  timestamp: 'timestamp'
}

const UtilisateurDao = {

  addUser (User) {

    let { email, password, role } = User;

    const rq = `INSERT INTO ${table.name} 
    (${table.email}, ${table.password}, ${table.role}, ${table.timestamp}) 
    values(?, ? , ?, ?)`;

    const sql = SqlString.format(rq, [email, password, role, new Date().toString()]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  updateUser (user) {

    let { nom, prenom, email, tel } = user;

    const rq = `update ${table.name} 
    set ${table.nom} = ? ,
        ${table.prenom} = ? ,
        ${table.tel} = ? 
    where ${table.email} = ? `;

    const sql = SqlString.format(rq, [nom, prenom, tel, email]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  updateUserPassword (email, password) {

    const rq = `update ${table.name} 
    set ${table.password} = ? 
    where ${table.email} = ? `;

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
    const sql = `select * from ${table.name} ORDER BY ${table.id} DESC`;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })

  },

  updateAvatar (avatar, email) {

    const rq = `update ${table.name} 
    set ${table.avatar} = ? 
    where ${table.email} = ? `;

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
  },
}

module.exports = UtilisateurDao;