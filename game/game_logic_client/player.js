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

}
