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
	query_timer = setInterval(query_turn,3000);
	document.getElementById("surrender").addEventListener("onclick","surrender_clicked_handler",false);
}

function Init_get_init_data()
{
	//This function will send request to get the initilization data
	var xhr = new XMLHttpRequest();
	xhr.open("POST","./net/init.php",false);
	xhr.send();
	//console.log(xhr.responseText);
	var response = JSON.parse(xhr.responseText);
	console.log(response.p1);
	console.log(response.p2);
	console.log(response.p3);
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
	if(current_player["pturn"] == "1")
		return true;
	else 
		return false;
}

function query_turn()
{
	//If it is current player's turn, then do not query the server
	if(IsMyTurn())
		return ;
	//If it is not current player's turn, send query to the server
	var xhr = new XMLHttpRequest();
	xhr.open("POST","/game/game_logic_server/query_turn.php",true);
	xhr.setRequestHeader("MAX_RESULT_ID",getMAXResultId());
	xhr.send();
	xhr.onreadystatechange = function()
	{
		if(xhr.status == 200 && xhr.readyState == 4)
		{
			console.log("query_turn() :" + xhr.responseText);
			var response;
			try
			{
				response = JSON.parse(xhr.responseText);
			}
			catch(error)
			{
				console.log("query_turn() :JSON parse error" + error);
				return ;
			}
			getPlayerByID(response["active_player"]).pturn = "1";
			if(IsMyTurn())
			{
				alert("Hey ! It's your turn !");
			}
		}
	}
}

var query_timer;

function new_round()
{
	//this function will have the army recover some HP 
}

function show_control()
{

}

function hide_control()
{

}
