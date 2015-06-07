names = [
  "JESSE",
  "WILSON",
  "QUINN"
]

$(document).ready(function(){

  names.forEach( function (name) {
    var newname = document.createElement('a');
    newname.innerHTML = name;
    newname.className = "btn btn-default check-100"
    document.getElementById('name-list').appendChild(newname);
  });

});
