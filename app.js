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
  console.log('Example app listening');
});

var DEFAULT_STACK = 2000;
var players = new Array(); // dictionary of player names to chip amounts
var potAmount = 0; // total pot amount

io.on('connection', function(socket){
	console.log('User connected');

	// Emits event with an updated amount for the pot
	function sendUpdatePot(newAmount)
	{
		potJSON = {'balance' : potAmount};
		socket.emit('update pot', potJSON);
	}

	// Emits event with an updated amount for the player
	function sendUpdatePlayer(newAmount)
	{
		playerJSON = { 'name' : name, 'stack' : playerAmount };
		socket.emit('update player', playerJSON);
	}


	var name = ''; // player's name for this connection instance

	socket.on('player login', function(playerInfo){
		name = playerInfo['name'];
		if (players.indexOf(name) > -1) {
			players[name] = DEFAULT_STACK;
		}
	});

	socket.on('place bet', function(playerBet){
		playerAmount = players[name] - playerBet['bet'];
		updatePlayer(playerAmount);
		potAmount += playerBet['bet'];
		updatePot(potAmount);
	});

	socket.on('claim win', function(){
		playerAmount = players[name] + potAmount;
		updatePlayer(playerAmount);
		potAmount = 0;
		updatePot(potAmount);
	});
});
