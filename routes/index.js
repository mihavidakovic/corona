const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Herbi123",
    database: "corona"
  });

let data = [];

connection.connect();

router.get('/data', (req, res) => {
    res.set('Content-Type', 'application/json');

    let querySelect = "SELECT * from data ";
    connection.query(querySelect, (error, response) => {
        console.log(response || error);
        data = response;
    });

    res.json({data});
});

module.exports = router;