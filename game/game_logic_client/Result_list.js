//THIS FILE CONTAINS IMPLEMENTATION OF RESULT_LIST IN JAVASCRIPT

var result_list = new Array();

function update_result_list_div()
{
	var result_list_div = document.getElementById("result_list_div");
	result_list_div.innerHTML = "";
	for(var count = 0;count < result_list.length;count++)
	{
		var new_p = document.createElement("p");
		new_p.innerHTML = result_list[count].Result_toString();
		result_list_div.appendChild(new_p);
	}
}
function getMAXResultId()
{
	var count = 0;
	var max = 0;
	for(count = 0;count < result_list.length;count++)
	{
		if(result_list[count].Result_id > max)
			max = result_list[count].Result_id;
	}
	return parseInt(max);
}
function Result(action_type)
{
	this.Result_id = getMAXResultId() + 1;
	this.player_id = current_player.pid;
	this.action_type = action_type;
	this.from_x = null;
	this.from_y = null;
	this.to_x = null;
	this.to_y = null;
	if(this.action_type == "attack")
	{
		this.attacker_id = null;
		this.defender_id = null;
		this.attacker_prev_hp = null;
		this.defender_prev_hp = null;
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
Result.prototype.setFrom = function(from_x,from_y)
{
	this.from_x = from_x;
	this.from_y = from_y;
}
Result.prototype.setTo = function(to_x,to_y)
{
	this.to_x = to_x;
	this.to_y = to_y;
}
Result.prototype.setAttack = function(attacker_id,defender_id,attacker_prev_hp,attacker_remaining_hp,defender_prev_hp,defender_remaining_hp)
{
	this.attacker_id = attacker_id;
	this.defender_id = defender_id;
	this.attacker_prev_hp = attacker_prev_hp;
	this.defender_prev_hp = defender_prev_hp;
	this.attacker_remaining_hp = attacker_remaining_hp;
	this.defender_remaining_hp = defender_remaining_hp;
}

Result.prototype.Result_toString = function()
{
	var result_str = "";
	if(this.action_type == "attack")
	{
		var attacker = getArmyById(this.attacker_id);
		var defender = getArmyById(this.defender_id);
		var attacker_str = attacker.typename + "( army_id:" + attacker.army_id + ")";
		var action_str = " attack ";
		var defender_str = defender.typename + "( army_id:" + defender.army_id + ")";
		if(this.attacker_remaining_hp == 0)
			result_str = ",causing " + attacker_str +  " dead";
		if(this.defender_remaining_hp == 0)
			result_str += ",causing " + defender_str + " dead";
		result_str = attacker_str  + action_str + defender_str + result_str;
	}
	else if(this.action_type == "move")
	{
		var actor = getArmyById(this.army_id);
		var actor_str = actor.typename + "( army_id:" + actor.army_id + ")";
		var action_str = " move to ";
		var target_str = "(" + this.to_x + "," + this.to_y + ")";
		result_str = actor_str + action_str + target_str;
	}
	else if(this.action_type == "defend")
	{
		var actor = getArmyById(this.defender_id);
		var actor_str = actor.typename + "( army_id:" + actor.army_id + ")";
		var action_str = " defend ";
		var target_str = "(" + this.from_x + "," + this.from_y + ")";
		result_str = actor_str + action_str + target_str;
	}
	else if(this.action_type == "build")
	{
		var actor = getArmyById(this.army_id);
		var actor_str = actor.typename + "( army_id:" + actor.army_id + ")";
		var action_str = " was built";
		result_str = actor_str + action_str;
	}
	return result_str;
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
	console.log('get_result');
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

		result.attacker_prev_hp = attacker.hp;
		result.defender_prev_hp = defender.hp;
		//ensure no negative hp
		defender.hp = defender.hp <= attacker.attack ? 0 : defender.hp - attacker.attack; 
		attacker.hp = attacker.hp <= defender.attack ? 0 : attacker.hp - defender.attack;
		//assigning data field specific for attack action
		result.attacker_id = attacker.army_id;
		result.defender_id = defender.army_id;
		result.attacker_remaining_hp = attacker.hp;
		result.defender_remaining_hp = defender.hp;
		var army = getArmyById(result.army_id);
		army.army_status = "";
	}
	else if(this.action_type == "move")
	{
		result.army_id = this.army_id;
		var army = getArmyById(result.army_id);
		army.army_status = "";
	}
	else if(this.action_type == "defend")
	{
		result.defender_id = this.army_id;
		var army = getArmyById(result.defender_id);
		army.army_status = "";
	}
	else if(this.action_type == "build")
	{
		result.army_id = this.army_id;
		result.army_type = this.army_type;
	}

	//for test, should be deleted later
	result_list.push(result);
	update_slot_own();
	return result;
}

function compare_result_id(result1,result2)
{
	if(result1.Result_id < result2.Result_id)
		return -1;
	if(result1.Result_id > result2.Result_id)
		return 1;
	return 0;
}

function parseRemoteResultList(latest_result_list)
{
	//from JSON format to Result Object,
	//stored it in result_list
	//called functions to display it
	//and show it on the div
	for(var count = 0;count < latest_result_list.length;count++)
	{
		var tmp_result_json = latest_result_list[count];
		var tmp_result = new Result(tmp_result_json["action_type"]);
		tmp_result.Result_id = tmp_result_json["Result_id"];
		tmp_result.player_id = tmp_result_json["player_id"];

		if(tmp_result_json["action_type"] == "attack")
		{
			tmp_result.setFrom(tmp_result_json["from_x"],tmp_result_json["from_y"]);
			tmp_result.setTo(tmp_result_json["to_x"],tmp_result_json["to_y"]);
			tmp_result.setAttack(tmp_result_json["attacker_id"],
								tmp_result_json["defender_id"],
								tmp_result_json["attacker_prev_hp"],
								tmp_result_json["attacker_remaining_hp"],
								tmp_result_json["defender_prev_hp"],
								tmp_result_json["defender_remaining_hp"]);
		}
		else if(tmp_result_json["action_type"] == "move")
		{
			tmp_result.army_id = tmp_result_json["army_id"];
			tmp_result.setFrom(tmp_result_json["from_x"],tmp_result_json["from_y"]);
			tmp_result.setTo(tmp_result_json["to_x"],tmp_result_json["to_y"]);
		}
		else if(tmp_result_json["action_type"] == "defend")
		{
			tmp_result.army_id = tmp_result_json["defender_id"];
			tmp_result.setFrom(tmp_result_json["from_x"],tmp_result_json["from_y"]);
		}
		else if(tmp_result_json["action_type"] == "build")
		{
			tmp_result.army_id = tmp_result_json["army_id"];
			tmp_result.army_type = tmp_result_json["army_type"];
		}
		result_list.push(tmp_result);
		result_list.sort(compare_result_id);
		update_result_list_div();
	}
	return null;
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

function send_result_list_to_server()
{
	//This function should be triggered when the player clicked the next round button
	var xhr = new XMLHttpRequest();
	xhr.open("POST","/game/game_logic_server/submit_result.php",false);
	xhr.setRequestHeader("TYPE","RESULT_LIST");
	var data = "{\"result_list\":" + JSON.stringify(result_list) + "}";
	console.log(data);
	xhr.send(data);
	console.log(xhr.responseText);
	current_player.pturn = "0";
}
