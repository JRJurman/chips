var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// hosting css
app.get('/css/styles.css', function (req, res) {
  res.sendFile(__dirname + '/css/styles.css');
});

// hosting html
app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/html/login.html');
});

app.get('/player', function (req, res) {
  res.sendFile(__dirname + '/html/player.html');
});

app.get('/pot', function (req, res) {
  res.sendFile(__dirname + '/html/pot.html');
});

// hosting js
app.get('/js/player.js', function (req, res) {
  res.sendFile(__dirname + '/js/player.js');
});

app.get('/js/pot.js', function (req, res) {
  res.sendFile(__dirname + '/js/pot.js');
});

app.get('/js/login.js', function (req, res) {
  res.sendFile(__dirname + '/js/login.js');
});

// hosting favicon
app.get('/favicon.png', function (req, res) {
  res.sendFile(__dirname + '/favicon.png');
});

http.listen(3000, function () {
  console.log('Example app listening');
});

var DEFAULT_STACK = 2000;
var players = {}; // dictionary of player names to chip amounts
var potAmount = 0; // total pot amount


io.on('connection', function(socket){
	console.log('User connected');

	// Emits event with an updated amount for the pot
	function sendUpdatePot(newAmount)
	{
		console.log('updating pot in app.js to $'+newAmount);
		var potJSON = {'balance' : newAmount};
		io.emit('update pot', potJSON);
	}

	// Emits event with an updated amount for the player
	function sendUpdatePlayer(newAmount)
	{
		players[name] = newAmount;
		var playerJSON = {'name' : name, 'stack' : newAmount};
		socket.emit('update player', playerJSON);
	}


	var name = ''; // player's name for this connection instance

	socket.on('player login', function(playerInfo){
		name = playerInfo['name'];
		if (name in players) {
			sendUpdatePlayer(players[name]);
		}
		else {
			sendUpdatePlayer(DEFAULT_STACK);
		}
	});

	socket.on('place bet', function(playerBet){
		console.log('received bet from player.js');
		var playerAmount = players[name] - playerBet['bet'];

		sendUpdatePlayer(playerAmount);
		potAmount += playerBet['bet'];
		sendUpdatePot(potAmount);
	});

	socket.on('claim win', function(){
		var playerAmount = players[name] + potAmount;
		sendUpdatePlayer(playerAmount);
		potAmount = 0;
		sendUpdatePot(potAmount);
	});
});
