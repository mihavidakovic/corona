var fs = require('fs'); 
var parse = require('csv-parse');
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Herbi123",
    database: "corona"
  });

  

var csvData=[];
fs.createReadStream("data/confirmed.csv")
    .pipe(parse({
        delimiter: ',',
        from_line: 2
    }))
    .on('data', function(csvrow) {
        //do something with csvrow
        csvData.push(csvrow);        
    })
    .on('end',function() {
      //do something with csvData
      connection.connect(error => {
        if (error) {
          console.error(error);
        } else {

            // Delete database
            let queryTruncate =
            "TRUNCATE data";
            connection.query(queryTruncate, (error, response) => {
            });

            // Fill database with fresh data
            let queryInsert =
            "INSERT INTO data (state, region, last_update, confirmed, deaths, recovered, latitude, longitude) VALUES ?";
            connection.query(queryInsert, [csvData], (error, response) => {
              console.log("success");
            });
            }
      });
    });
