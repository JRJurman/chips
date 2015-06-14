var potBalance = 0;

var socket = io();

socket.emit('load pot', {});

socket.on('update pot',function(newBalance)
{
	console.log('New pot value: $'+newBalance);
	potBalance = newBalance['balance'];
	document.getElementById('pot').innerHTML = 'Pot: $'+potBalance;
});