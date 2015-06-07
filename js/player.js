var player = {
	'name':'',
	'stack':0
};

var socket = io();

socket.on('update player',function(newPlayerState) {
	player = newPlayerState;
});

// Onclick 
function playerNameEntered()
{
	var name = 'Wilson'; // TODO: Get name from DOM.
	socket.emit('player login',{'name':name});
}

function placeBet()
{
	var betAmount = 0; // TODO: Get bet amount from DOM.
	socket.emit('place bet',{'bet':betAmount});
}

function claimWin()
{
	socket.emit('claim win',{});
}