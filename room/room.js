var current_usr = $.cookie("CURRENT_USER");

if(current_usr)
	console.log("CURRENT_USER is " + current_usr);

function room_get_list()
{
	//This function to get the existing room data from the server 
}

function room_onclick()
{

}

function room_create()
{
	var xhr = new XMLHttpRequest();
	//this is a synchornous request
	xhr.open("POST","room/create_room.php",false);
	xhr.setRequestHeader("USERID",current_usr);
	xhr.send();
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