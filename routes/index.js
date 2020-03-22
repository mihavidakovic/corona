const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const Fs = require('fs');
const Axios = require('axios');
const Path = require('path');
var csv = require("csvtojson");
var fileDownload = require('js-file-download');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Herbi123",
    database: "corona"
  });

let data = [];

connection.connect();

router.get('/data/list', (req, res) => {
    res.set('Content-Type', 'application/json');

    if(res.error) {
        res.json({error});
    } else {
        let querySelect = "SELECT * FROM data GROUP BY region ORDER BY deaths DESC";
        connection.query(querySelect, (error, response) => {
            console.log(response || error);
            data = response;
        });
    
        res.json({data});
    
    }
});

router.get('/data/graph', (req, res) => {
    res.set('Content-Type', 'application/json');

    let querySelect = "SELECT `region` AS `name`, `deaths` AS `uv`, `last_update` AS `pv` FROM data GROUP BY region ORDER BY deaths DESC LIMIT 10";
    connection.query(querySelect, (error, response) => {
        console.log(response || error);
        data = response;
    });

    res.json({data});
});

router.get('/data/download', (req, res) => {
    const dlUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/' + getDate() + '.csv';
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
  
    Axios.get(dlUrl)
    .then((response) => {
        console.log(response.data)
            FileDownload(response.data, __dirname + '/data/confirmed.csv');
    });
 

    res.send('Downloading ' + dlUrl);
});

router.get('/data/parse', (req, res) => {
    let csvData = [];

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
    
      csv()
        .fromStream(request.get(dlUrl))
        .subscribe((json)=>{
            csvData = ["lol", "lol"];
        }, onError, onComplete);
    }
    
    parseData()

    res.contentType('application/json');
    res.status(200).json({csvData});
    res.end();



});



module.exports = router;

