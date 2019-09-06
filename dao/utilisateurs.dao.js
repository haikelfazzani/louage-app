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
  }
}

module.exports = UtilisateurDao;