var potBalance = 0;

var socket = io();

socket.on('pot updated',function(newBalance)
{
	potBalance = newBalance["balance"];
	//Update GUI to reflect new balance.
});