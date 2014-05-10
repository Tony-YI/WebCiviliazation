//This javascript file contains implementation of the army class
function init_army_list(army)
{
	for(var count = 0;count < army.length;count++)
	{
		var tmp = new Army(army[count].army_id,army[count].army_type,army[count].owner_id);
		tmp.army_status = army[count].army_status
		army_list.push(tmp);
	}

}

function reinit_not_dead_army()
{
	for(var count = 0;count < slot_list.length;count++)
	{
		if(slot_list[count].army_id != "")
		{
			var tmp_army = getArmyById(slot_list[count].army_id);
			if(tmp_army.owner == current_player.pid && tmp_army.army_status != "dead")
			{
				console.log("set " + slot_list[count]["slot_x"] + "," + slot_list[count]["slot_y"]);
				tmp_army.army_status = "ready";
				set_army_animation(slot_list[count]["slot_x"],slot_list[count]["slot_y"],tmp_army.army_id);
			}
			else
				console.log("not set " + slot_list[count]["slot_x"] + "," + slot_list[count]["slot_y"]);
		}
	}
}

function disable_all_army()
{
	for(var count = 0;count < slot_list.length;count++)
	{
		if(slot_list[count].army_id != "")
		{
			var tmp_army = getArmyById(slot_list[count].army_id);
			if(tmp_army.owner == current_player.pid && tmp_army.army_status != "dead")
			{
				clear_army_animation(slot_list[count]["slot_x"],slot_list[count]["slot_y"],tmp_army.army_id);
			}
		}
	}
}

function getArmyById(army_id)
{
	if(!(army_id >= 0 && army_id < window.army_list.length))
	{
		console.log("getArmyById: invalid argument");
		return null;
	}
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
	this.army_status = null;
	if(type_id == "1")
	{
		//sword man
		this.max_hp = 5;
		this.hp = 5;
		this.ap = 1;
		this.attack = 3;
		this.typename = "swordman";
	}
	else if(type_id == "2")
	{
		//calvery
		this.max_hp = 3;
		this.hp = 3;
		this.ap = 2;
		this.attack = 4;
		this.typename = "calvery";
	}
	else if(type_id == "3")
	{
		//archer
		this.max_hp = 2;
		this.hp = 2;
		this.ap = 1;
		this.attack = 1;
		this.typename = "archer";
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
