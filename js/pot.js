var potBalance = 0;

var socket = io();

socket.on('update pot',function(newBalance)
{
	console.log('updating pot to $'+newBalance);
	potBalance = newBalance['balance'];
	document.getElementById('pot').innerHTML = 'Pot: $'+potBalance;
});