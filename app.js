var express = require('express');
var app = express();

app.get('/player', function (req, res) {
  res.sendfile(__dirname + '/player/index.html');
});

app.get('/pot', function (req, res) {
  res.sendfile(__dirname + '/pot/index.html');
});

var server = app.listen(3000, "0.0.0.0", function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
