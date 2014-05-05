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
	console.log(this.pid);
	if(parseInt(this.pid) == parseInt(user_1))
	{
		username_div.style.backgroundColor = user_1_color;
	}
	else if(parseInt(this.pid) == parseInt(user_2))
	{
		username_div.style.backgroundColor = user_2_color;
		console.log('hehe');
	}
	else if(parseInt(this.pid) == parseInt(user_3))
	{
		username_div.style.backgroundColor = user_3_color;
	}
	gold_div.innerHTML = "gold: " + this.gold;
	lumber_div.innerHTML = "wood: " + this.wood;
}
