
const http = require('http');
const parse = require('csv-parse');
const fs = require('fs');

const hostname = 'localhost';
const port = 4200;

const server = http.createServer((req, res) => {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end("csvData");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});