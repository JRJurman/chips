var express = require('express');
var app = express();

// hosting css
app.get('/css/styles.css', function (req, res) {
  res.sendFile(__dirname + '/css/styles.css');
});

app.get('/player', function (req, res) {
  res.sendFile(__dirname + '/player/index.html');
});

app.get('/js/player.js', function (req, res) {
  res.sendFile(__dirname + '/js/player.js');
});

app.get('/js/pot.js', function (req, res) {
  res.sendFile(__dirname + '/js/pot.js');
});

app.get('/pot', function (req, res) {
  res.sendFile(__dirname + '/pot/index.html');
});

var server = app.listen(3000, "0.0.0.0", function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
