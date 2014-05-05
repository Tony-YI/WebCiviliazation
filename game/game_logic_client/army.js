//This javascript file contains implementation of the army class
function Army_list()
{
}


function army(army_id,army_owner,hp,ap,attack,position_x,position_y)
{
	this.id = army_id;
	this.owner = army_ownder;
	this.hp = hp;
	this.ap = ap;
	this.attack = attack;
	this.position_x = position_x;
	this.position_y = position_y;	
}

//This function return a set of {army_id,position_x,position_y} to indicates slots that it can attack
army.prototype.attack_range = function()
{
};

//This function return a set of {x,y} to indicates slots that it can move to 
army.prototype.move_range = function()
{
};

//This function will realize the attack of a army,
/*
	1. 
	.add the attack function to the form
*/
army.prototype.attack = function()
{
};

army.prototype.move = function()
{
};
