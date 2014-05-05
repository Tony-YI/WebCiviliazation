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

	username_div.innerHTML = "Player: " + this.playername
	gold_div.innerHTML = "gold: " + this.gold;
	lumber_div.innerHTML = "wood: " + this.wood;
}
