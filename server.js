var express = require('express');
var app = express();
app.use(express.static(__dirname));
app.use(express.static('gfx'));

app.listen(4001, 'localhost');
console.log('server started at : localhost:4001');
/*
app.listen(8080, 'localhost');
console.log('server started at : localhost');
*/
/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(8080, 'APP_PRIVATE_IP_ADDRESS');
console.log('Server running at http://APP_PRIVATE_IP_ADDRESS:8080/');
*/
