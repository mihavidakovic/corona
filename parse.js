const Fs = require('fs');
const http = require('http');
var https = require('https');
const Axios = require('axios');
const Path = require('path');
const request=require('request')
var csv = require("csvtojson");
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Herbi123",
    database: "corona"
  });

  var csvData = [];

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
  
  

  async function parseData() {
    const csvFile = Fs.createReadStream(__dirname + '/data/confirmed.csv');
    const filePath = __dirname + '/data/confirmed.csv';
    const dlUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/' + getDate() + '.csv';
  
    console.log(filePath)
  
    csvFile.pipe(csv()).pipe(dlUrl);  
  }
  
  parseData()

  console.log(csvData)