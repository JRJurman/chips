var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/player', function (req, res) {
  res.sendfile(__dirname + '/player/index.html');
});

app.get('/pot', function (req, res) {
  res.sendfile(__dirname + '/pot/index.html');
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
