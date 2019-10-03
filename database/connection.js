var mysql = require('mysql')

var remoteDB = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}

var localDB = {
    host: 'localhost:3306',
    user: 'root',
    password: '',
    database: 'gestion_voyage'
}

var db = mysql.createConnection(remoteDB);

db.connect((err) => {
    setInterval(() => { db.query('SELECT 1') }, 1000 * 60 * 5)
    console.log(err || 'connected')
})
module.exports = db