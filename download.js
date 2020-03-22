const Axios = require('axios');
const Fs = require('fs')  
const Path = require('path')  
var csv = require("csvtojson");

const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Herbi123",
    database: "corona"
  });


function getDate() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let dd = yesterday.getDate(); 
  let mm = yesterday.getMonth() + 1; 
  const yyyy = yesterday.getFullYear(); 
  if (dd < 10) { 
      dd = '0' + dd; 
  } 
  if (mm < 10) { 
      mm = '0' + mm; 
  } 
  return `${mm}-${dd}-${yyyy}`
}

function updateDatabase(data) {
  connection.connect(error => {
    if (error) {
    console.error(error);
    } else {

      // Delete database
      // let queryTruncate =
      // "TRUNCATE data";
      // connection.query(queryTruncate, (error, response) => {
      //   console.log("Previous data truncated.")
      // });

      let date = new Date();

      data.forEach(function(e){
        if (typeof e === "object" ){
          e.push(date)
        }
      });
      console.log(data)


      // Fill database with fresh data
      let queryInsert =
      "INSERT INTO data (state, region, last_update, confirmed, deaths, recovered, latitude, longitude, created_at) VALUES ?";
      connection.query(queryInsert, [data], (error, response) => {
        console.log("New dta fetched, parsed and inserted into the database successfully!")
      });
      }
  });
}


function download(url, path) {
  const dlUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/' + getDate() + '.csv';

  Axios.get(dlUrl)
  .then((response) => {
    let result = [];
    csv({from_line: 2, delimiter: ",", flatKeys: true, noheader: true, output: "csv", colParser:{
      "Deaths":"number",
    },
  })
      .fromString(response.data)
      .then(function(jsonArrayObj){
        jsonArrayObj.splice(0, 1);
        updateDatabase(jsonArrayObj);
      })
    });

}

download();
