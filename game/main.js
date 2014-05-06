/*
	This file is for  functions that help implements the main functionality
*/

var current_player;
function Init()
{
	//send request to get the initilization data
	Init_get_init_data();
	display_init(slot_list);
	init_small_map();
	try
	{
		console.log("adding event listener to surrender button");
		console.log(document.getElementById("surrender"));
		console.log(document.getElementById("surrender").addEventListener);
		document.getElementById("surrender").addEventListener("onclick","surrender_clicked_handler",false);
	}
	catch(e)
	{
		console.log("Init :" + e);
	}
}

function Init_get_init_data()
{
	//This function will send request to get the initilization data
	var xhr = new XMLHttpRequest();
	xhr.open("POST","./net/init.php",false);
	xhr.send();
	//console.log(xhr.responseText);
	var response = JSON.parse(xhr.responseText);
	var p1 = new player(response.p1.user_id,response.p1.username,response.p1.gold,response.p1.wood,response.p1["status"],response.p1["turn"]);
	var p2 = new player(response.p2.user_id,response.p2.username,response.p2.gold,response.p2.wood,response.p2["status"],response.p2["turn"]);
	var p3 = new player(response.p3.user_id,response.p3.username,response.p3.gold,response.p3.wood,response.p3["status"],response.p3["turn"]);
	player_list = [p1,p2,p3];
	for(var count = 0;count < player_list.length;count++)
	{
		if(player_list[count].pid == $.cookie("CURRENT_USER"))
			current_player = player_list[count];
	}
	current_player.show_info();
	init_army_list(response.army);
	//console.log("Things done for armys");
	
	init_slot_list(response.slots);
	//console.log("Things done for slots");
}

//This function returns true or false 
function IsMyTurn()
{
	if(current_player["turn"] == "1")
		return true;
	else 
		return false;
}
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
