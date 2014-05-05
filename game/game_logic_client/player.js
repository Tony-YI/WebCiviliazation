//This javascript file contains Object-oriented defintion of every obejcts in the game

/*
	1. Player
*/

function player(player_id, playername,gold,wood)
{
	this.pid = player_id;
	this.pname = playername;
	this.gold = gold;
	this.wood = wood;
}

player.prototype.show_info = function()
{

	var username_div = document.getElementById("username");
	var gold_div = document.getElementById("gold");
	var lumber_div = document.getElementById("lumber");

	username_div.innerHTML = "Player: " + this.pname;
	switch(this.player_id)
	{
		case user_1:
		username_div.style.background = user_1_color;
		break;

		case user_2:
		username_div.style.background = user_2_color;
		break;
		case user_3:
		username_div.style.background = user_3_color;
		break;

		default:
		break;
	}
	gold_div.innerHTML = "gold: " + this.gold;
	lumber_div.innerHTML = "wood: " + this.wood;
}
