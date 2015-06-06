var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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

http.listen(3000, function () {
  //var host = server.address().address;
  //var port = server.address().port;

  //console.log('Example app listening at http://%s:%s', host, port);
  console.log('Example app listening');
});

io.on('connection', function(socket){
	//socket.on('')
	console.log('User connected');
	socket.on('button click', function(data){
		console.log('received button click from pot');
	});
});
