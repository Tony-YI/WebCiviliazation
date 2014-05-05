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
		var p1 = new player(response.p1.user_id,response.p1.username,response.p1.gold,response.p1.wood);
		var p2 = new player(response.p2.user_id,response.p2.username,response.p2.gold,response.p2.wood);
		var p3 = new player(response.p3.user_id,response.p3.username,response.p3.gold,response.p3.wood);
		player_list = [p1,p2,p3];

		init_slot_list(response.slots);
		//init_army_list(response.army);
		console.log(player_list);
		console.log(slot_list);
		//console.log(army_list);
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
