//This javascript file contains implementation of the army class
function init_army_list(army)
{
	for(var count = 0;count < army.length;count++)
	{
		var tmp = new Army(army[count].army_id,army[count].army_type,army[count].owner_id);
		army_list.push(tmp);
	}

}

function getArmyById(army_id)
{
	for(var count = 0;count < window.army_list.length;count++)
	{
		try{
			window.army_list[count].army_id == army_id
		}
		catch(e)
		{
			console.log("getArmyById: " + e);
		}
		if(window.army_list[count].army_id == army_id)
			return window.army_list[count];
	}
}

function Army(army_id,type_id,army_owner)
{
	console.log("creating army object with id " + army_id);
	this.army_id = army_id;
	this.owner = army_owner;
	this.type_id = type_id;
	if(type_id == "1")
	{
		//sword man
		this.hp = 5;
		this.ap = 1;
		this.attack = 3;
	}
	else if(type_id == "2")
	{
		//calvery
		this.hp = 3;
		this.ap = 2;
		this.attack = 4;
	}
	else if(type_id == "3")
	{
		//archer
		this.hp = 2;
		this.ap = 1;
		this.attack = 1;
	}
	this.position_x = null;
	this.position_y = null;
}

//This function return a set of {army_id,position_x,position_y} to indicates slots that it can attack
Army.prototype.attack_range = function()
{
};

//This function return a set of {x,y} to indicates slots that it can move to 
Army.prototype.move_range = function()
{
};

//This function will realize the attack of a army,
/*
	1. 
	.add the attack function to the form
*/
Army.prototype.attack = function()
{
};

Army.prototype.move = function()
{
};
