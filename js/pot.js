var potBalance = 0;

var socket = io();

socket.on('update pot',function(newBalance)
{
	potBalance = newBalance["balance"];
	//Update GUI to reflect new balance.
});