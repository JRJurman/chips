names = [
  "JESSE",
  "WILSON",
  "QUINN"
]

$(document).ready(function(){
	
	//Hide betting platform
	document.getElementById('player-page').style.display = 'none';

	names.forEach( function (name) {
	    var newname = document.createElement('a');
	    newname.innerHTML = name;
	    newname.className = "btn btn-default check-100"
	    newname.onclick = function() {
	    	playerNameEntered(name);
	    	document.getElementById('login-page').style.display = 'none';
	    	document.getElementById('player-page').style.display = 'block';
	    }
	    document.getElementById('name-list').appendChild(newname);
  	});
});
