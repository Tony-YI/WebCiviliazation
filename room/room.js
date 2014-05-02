var current_usr_id = $.cookie("CURRENT_USER");
var current_usrname = $.cookie("CURRENT_USERNAME");


//in_room is a flag to denote whether the current user is already inside a game/room
var in_room = 0;

if(current_usr_id)
	console.log("CURRENT_USER is " + current_usr_id);
setInterval(room_get_list,1000);

function room_get_list()
{
	//This function is to send request to room/get_room.php
	//Then get the existing room data from the server and dynamically render the page
	var xhr = new XMLHttpRequest();
	xhr.open("POST","room/get_room.php",true);
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4)
		{
			if(xhr.status != 200)
			{
				console.log("Error code = " + new String(xhr.status));
				return false;
			}
			var room_info = xhr.responseText;
			//console.log(room_info);
			var obj = JSON.parse(room_info);
			var status = obj.status;
			if(status == "failed")
			{
				document.location.href = '../login/login.php';
				return false;
			}
			var games = obj.game;
			for(var i = 0; i < games.length; i++)
			{
				//console.log(games[i]);
				//console.log(games[i].P1);
			}
			//document.getElementById("roomNum").innerHTML = room_info;
		}
	};
	return false;
}

function room_onclick(e)
{	
	//Pop out a confirmation window 
	var isJoin = confirm("Do you want to join this room?");
	if(isJoin == true)
	{
		var xhr = new XMLHttpRequest();
		xhr.open("POST","room/join_room.php",true);
		xhr.setRequestHeader("USERID",current_usr_id);
		xhr.setRequestHeader("ROOM",e.target);
		console.log(e.target);
	}
	else
	{
		return false;
	}
}

function room_create()
{
	var xhr = new XMLHttpRequest();
	//this is a synchornous request
	xhr.open("POST","room/create_room.php",false);
	xhr.setRequestHeader("USERID",current_usr_id);
	xhr.send();
	console.log(xhr.responseText);
	response = JSON.parse(xhr.responseText);
	if(response.status = "success")
	{
		alert("You've created a room");
		in_room = 1;
		$("#newRoom").hide();
		render_room_information(response)
	}
}

function render_user_information()
{
	//This function will show the user information on the right hand side
}

function render_room_information(response)
{
	//This function will show the room information on the right hand side

}
function logout()
{
	var xhr = new XMLHttpRequest();
	//this is a synchornous request
	xhr.open("POST","login/logout.php",false);
	xhr.send();
	console.log(xhr.responseText);
	response = JSON.parse(xhr.responseText);
	if(response.status == "success")
	{
		console.log("Logout Success, going to redirect");
		window.location = "login.php";
	}
}

function start_game()
{
	
}