var current_usr_id = $.cookie("CURRENT_USER");
var current_usrname = $.cookie("CURRENT_USERNAME");


//in_room is a flag to denote whether the current user is already inside a game/room
var in_room = 0;

if(current_usr_id)
	console.log("CURRENT_USER is " + current_usr_id);

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
				//alert("Error code = " + new String(xhr.status));
				return false;
			}
			var room_info = xhr.responseText;
			var obj = JSON.parse(room_info);
			console.log(obj.status);
			console.log(obj.game);
			//document.getElementById("roomNum").innerHTML = room_info;
		}
	};
	return false;
}

setInterval(room_get_list,1000);

function room_onclick()
{	
	//Pop out a confirmation window 
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