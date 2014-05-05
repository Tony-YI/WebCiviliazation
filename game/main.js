/*
	This file is for  functions that help implements the main functionality
*/
function Init()
{
	//send request to get the initilization data
	Init_get_init_data();
}

var player_list;
var slot_list;
var army_list;

function Init_get_init_data()
{
	//This function will send request to get the initilization data
	var xhr = new XMLHttpRequest();
	xhr.open("POST","./net/init.php",false);
	xhr.send();
	//console.log(xhr.responseText);
	try
	{
		var response = JSON.parse(xhr.responseText);
		console.log(response.p1);
		console.log(response.p2);
		console.log(response.p3);
		player_list = [response.p1,response.p2,response.p3];
		slot_list = response.slots;
		army_list = response.army;
		console.log(player_list);
		console.log(slot_list);
		console.log(army_list);
	}
	catch(e)
	{
		console.error("Parsing Error: ",e);
	}

}
//This is the function to add 'ACTIONS' to the form that is going to be processed on the server side
function player_add_action_to_form(actions)
{

}
//This is the function to get the Round result from the server
function player_get_result()
{

}
//This is the right click handler for every slot
function slot_rightclick_handler()
{

}

//This is the left click handler for every slot
function slot_leftclick_handler()
{

}
