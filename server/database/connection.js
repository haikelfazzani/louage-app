const mysql = require('mysql');

const remoteDB = {
    host: 'remotemysql.com',
    user: 'LPx4ioQKlk',
    password: 'V638WJNvfq',
    database: 'LPx4ioQKlk'
};

const localDB = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestion_parc'
}

const db = mysql.createConnection(remoteDB);

db.connect( async (err) => {
    if (err) throw err;
    await console.log("connected")
});

module.exports = db;
