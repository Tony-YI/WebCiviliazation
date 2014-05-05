//This javascript file contains Object-oriented defintion of every obejcts in the game

/*
	1. Player
	2. Army
	3. Slot (Hope that Tony can merge this with his implementatio of the display.js)
*/

function player(player_id, playername,gold,wood)
{
	this.id = player_id;
	this.name = playername;
	this.gold = gold;
	this.wood = wood;
}

player.prototype.show_info = function()
{

}
