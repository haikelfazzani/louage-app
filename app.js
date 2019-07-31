const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.disable('x-powered-by');

require('dotenv').config();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// server static files
app.use(express.static(path.join(__dirname, 'build')));

// routes
app.use("/api", require("./server/routes/api"));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use("*", (req, res) => res.redirect("/"));

module.exports = app;
