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
			var browser_games = document.getElementsByClassName("roomBtn");
			var server_games = obj.game;
			console.log(isUpade(browser_games,server_games));
			//document.getElementById("roomNum").innerHTML = room_info;
		}
	};
	return false;
}

function isUpade(browser_games, server_games)
{
	if(browser_games.length != server_games.length)
	{
		return true;
	}
	else
	{
		for (var i = 0; i < browser_games.length; i++) 
		{
			if(browser_games[i].id != server_games[i].Game_id)
			{
				return true;
			}
			else
			{
				var browser = browser_games[i].childNode[1];
				var server = server_games[i];
				console.log(browser.p1);
				console.log(server.p1);
				if(browser.p1 ！= server.p1)
				{
					return true;
				}
				console.log(browser.p2);
				console.log(server.p2);
				if(browser.p2 ！= server.p2)
				{
					return true;
				}
				console.log(browser.p3);
				console.log(server.p3);
				if(browser.p3 ！= server.p3)
				{
					return true;
				}
			}
		}
	}
	return false;
}
function room_onclick(e)
{	
	//Pop out a confirmation window 
	e = e || window.event;
	var target = e.target;
	//console.log(target);
	while(target.className != "roomBtn")
	{
		target = target.parentNode;
	}
	var isJoin = confirm("Do you want to join this room?");
	if(isJoin == true)
	{
		var xhr = new XMLHttpRequest();
		xhr.open("POST","room/join_room.php",true);
		xhr.setRequestHeader("USERID",current_usr_id);
		//console.log(target);
		xhr.setRequestHeader("ROOMID",target.id);
		xhr.send();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4)
			{
				if(xhr.status != 200)
				{
					console.log("Error code = " + new String(xhr.status));
					return false;
				}
				var response = xhr.responseText;
				console.log(response);
				var obj = JSON.parse(response);
				var status = obj.status;
			}
		};
	return false;
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
		window.location = "login/login.php";
	}
}

function start_game()
{
	
}