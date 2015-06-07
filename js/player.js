var player = {
	'name':'',
	'stack':0
};

var currentBet = 0;

var socket = io();

playerNameEntered();

socket.on('update player',function(newPlayerState) {

	console.log("Received update player through socket.");
	//Are we receiving the socket message for the correct player???
	if(player['name'] != newPlayerState['name'])
		console.log("Names did not match! Should be "+player['name']+" but received "+newPlayerState['name']);

	player = newPlayerState;
	console.log("NEW PLAYER STACK: "+player['stack']);
	updatePlayerGUI();
});

function playerNameEntered()
{
	var name = 'Wilson'; // TODO: Get name from DOM.
	player['name'] = name;
	socket.emit('player login',{'name':name});
}

function placeBet()
{
	player['stack'] -= currentBet;
	socket.emit('place bet',{'bet':currentBet});
	currentBet = 0;
	updateBetAmountGUI();
}

function claimWin()
{
	socket.emit('claim win',{});
}

function allIn()
{
	currentBet = player['stack'];
	updateBetAmountGUI();
}

function clearBet()
{
	console.log("clearing bet.");
	currentBet = 0;
	updateBetAmountGUI();
}

function addToBet(amount)
{
	console.log("Adding $"+amount+" to bet");
	if(currentBet + amount <= player['stack'])
		currentBet += amount;
	updateBetAmountGUI();
}

function updatePlayerGUI()
{
	document.getElementById('stack').innerHTML = '$'+player['stack'];
}

function updateBetAmountGUI()
{
	document.getElementById('bet-amount').innerHTML = "Bet $"+currentBet;
}