var current_usr = $.cookie("CURRENT_USER");

if(current_usr)
	console.log("CURRENT_USER is " + current_usr);

function room_get_list()
{
	//This function to get the existing room data from the server 
}

function room_click_to_join()
{

}

function room_create()
{

}

function logout()
{
	var xhr = new XMLHttpRequest();
	xhr.open("POST","login/logout.php",false);
	xhr.send();
	response = JSON.parse(xhr.responseText);
	if(response.status == "success")
	{
		console.log("Logout Success, going to redirect");
		window.location = "login.php";
	}
}