const db = require('../database/connection');
var SqlString = require('sqlstring');

const table = {
  name: 'utilisateurs',
  id: 'id', email: 'email', password: 'password', avatar: 'avatar', role: 'role'
}

const UtilisateurDao = {

  addUser (email, password, avatar, role) {
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

  updateUser() {},

  deleteUser(email) {
    const rq = `delete from ${table.name} where ${table.email} = ?`;

    const sql = SqlString.format(rq, email);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getUsers() {
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