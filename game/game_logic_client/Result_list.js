//THIS FILE CONTAINS IMPLEMENTATION OF RESULT_LIST IN JAVASCRIPT

var result_list = new Array();
function result(action_type)
{
	this.action_type = action_type;
	this.from_x = null;
	this.from_y = null;
	this.to_x = null;
	this.to_y = null;
	if(this.action_type == "attack")
	{
		this.attacker_id = null;
		this.defender_id = null;
		this.attacker_remaining_hp = null;
		this.defender_remaining_hp = null;
	}
	else if(this.action_type == "move")
	{
		this.army_id = null;
	}
	else if(this.action_type == "defend")
	{
		this.defender_id = null;
	}
	else if(this.action_type == "build")
	{
		this.army_id = null;
		this.army_type = null;
	}
	else 
	{
		alert("Result constructor : invalid action type " + this.action_type)
		return null;
	}
}

/*
	action_type = "attack" -> attack action
	{
		army_id
		from_x,from_y,
		to_x,to_y,
		army_type (not important, leave null is fine)
	}

	action_type = "move" -> move action
	{
		army_id,
		from_x,from_y,
		to_x,to_y,
		army_type (not necessary, leave null is fine)
	}
	action_type = "defend" -> defend action
	{
		army_id,
		from_x,from_y,
		to_x,to_y,(leave null)
		army_type (leave null)
	}
	action_type = "build" -> build action
	{
		army_id,
		from_x,from_y, (leave null)
		to_x,to_y,(leave null)
		army_type (necessary)
	}
*/
function action(action_type,army_id,from_x,from_y,to_x,to_y,army_type)
{
	//DEFINE ACTION OBJECT
	this.action_type = action_type;
	if(action_type == "attack")
	{
		this.army_id = army_id;
		this.from_x = from_x; 
		this.from_y = from_y;
		this.to_x = to_x;
		this.to_y = to_y;
	}
	else if(action_type == "move")
	{
		this.army_id = army_id;
		this.from_x = from_x; 
		this.from_y = from_y;
		this.to_x = to_x;
		this.to_y = to_y;
	}
	else if(action_type == "defend")
	{
		this.army_id = army_id;
		this.from_x = from_x; 
		this.from_y = from_y;
	}	
	else if(action_type == "build")
	{
		this.army_id = army_id;
		this.army_type = army_type;
	}
	else 
	{
		alert("action constructor: Invalid action_type " + action_type);
		return null;
	}
}

action.prototype.get_result = function()
{
	var result = new Result(this.action_type);
	result.from_x = this.from_x;
	result.from_y = this.from_y;
	result.to_x = this.to_x;
	result.to_y = this.to_y;

	if(this.action_type == "attack")
	{
		var defender_slot = getSlotByXY(this.to_x,this.to_y);
		var defender = getArmyById(defender_slot.army_id);
		var attacker = getArmyById(this.army_id);
		//ensure no negative hp
		defender.hp = defender.hp <= attacker.attack ? 0 : defender.hp - attacker.attack; 
		attacker.hp = attacker.hp <= defender.attack ? 0 : attacker.hp - defender.attack;
		//assigning data field specific for attack action
		result.this.attacker_id = attacker.army_id;
		result.this.defender_id = defender.army_id;
		result.this.attacker_remaining_hp = attacker.hp;
		result.this.defender_remaining_hp = defender.hp;
	}
	else if(this.action_type == "move")
	{
		result.army_id = this.army_id;
	}
	else if(this.action_type == "defend")
	{
		result.defender_id = this.army_id
	}
	else if(this.action_type == "build")
	{
		result.army_id = this.army_id;
		result.army_type = this.army_type;
	}
	return result;
}

function parse_result(result)
{
	//PARSE RESULT TO JSON FOMMAT TO SEND TO SERVER
	var parsedResult = "";
	/*
	...
	*/
	return parsedResult;
}

function parse_action(action)
{
	//PARSE ACTION TO JSON FOMMAT TO SEND TO SERVER
	var parsedAction = "";
	/*
	...
	*/
	return parsedAction;
}