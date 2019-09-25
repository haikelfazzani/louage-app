var mysql = require('mysql');

var remoteDB = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

var db = mysql.createConnection(remoteDB);

db.connect((err) => {

    setInterval(() => {
        db.query('SELECT 1', (err, rows) => {
            if (err) throw err;
        });
    }, 10000);

    console.log(err || 'connected')
})
module.exports = db