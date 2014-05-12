//var result_list; global variable
//var line_num = 22; global variable in small_map.js
function update_slot_list_own(hexagon, army_id)
{
	var pos_x = hexagon.getAttribute('x');
	var pos_y = hexagon.getAttribute('y');
	var slot = getSlotByXY(pos_x, pos_y) //function in game/game_logic_client->slot.js
	slot.army_id = army_id;
}

//This function will take a result variable as the input, and do necessary
//modification to show the result on the screen
function update_slot_list_others(result)
{
}

function get_hexagon(x, y)
{
	var hexagon = document.getElementsByClassName('hexagon');
	var hexagon_div = hexagon[parseInt(y) * line_num + parseInt(x)];
	return hexagon_div;
}

function set_army_animation(x, y, army_id)
{
	var hexagon = document.getElementsByClassName('hexagon');
	hexagon[parseInt(y) * line_num + parseInt(x)].lastChild.setAttribute('animation', 'on');
}

function clear_army_animation(x, y, army_id)
{
	var hexagon = document.getElementsByClassName('hexagon');

	hexagon[parseInt(y) * line_num + parseInt(x)].lastChild.setAttribute('animation', 'off');
}

function set_army_type(hexagon, type, army_id)
{
	hexagon.setAttribute('army_type', type); //army_type: global variable in game.html
	var src = '';

	if(type == 'type_A')
	{
		src = '../../images/sword.png';
	}
	else if(type == 'type_B')
	{
		src = '../../images/cavalry.png';
	}
	else if(type == 'type_C')
	{
		src = '../../images/archer.png';
	}	

	var user_id = getArmyById(parseInt(army_id)).owner;
	if(user_id == user_1)
	{
		hexagon.lastChild.setAttribute('user', 'user_1');
	}
	else if(user_id == user_2)
	{
		hexagon.lastChild.setAttribute('user', 'user_2');
	}
	else if(user_id == user_3)
	{
		hexagon.lastChild.setAttribute('user', 'user_3');
	}

	hexagon.lastChild.setAttribute('src', src);

	if(IsMyTurn() && getArmyById(parseInt(army_id)).army_status == 'ready' && user_id == current_player.pid)
	{
		hexagon.lastChild.setAttribute('animation', 'on');
	}
	else
	{
		hexagon.lastChild.setAttribute('animation', 'off');
	}
}

function clear_army_type(hexagon, type)
{
	hexagon.setAttribute('army_type', type);
	hexagon.lastChild.setAttribute('src', '');
	hexagon.lastChild.setAttribute('user', 'none');
}

function update_attack(from_x, from_y, to_x, to_y, attacker_id, defender_id)
{
	var hexagon_from = get_hexagon(from_x, from_y);
	var attacker_type = getArmyById(attacker_id).type_id;
	var attacker_status = getArmyById(attacker_id).army_status;

	var hexagon_to = get_hexagon(to_x, to_y);
	var defender_type = getArmyById(defender_id).type_id;
	var defender_status = getArmyById(defender_id).army_status;

	if(parseInt(attacker_type) == 1)
	{
		attacker_type = 'type_A';
	}
	else if(parseInt(attacker_type) == 2)
	{
		attacker_type = 'type_B';
	}
	else if(parseInt(attacker_type) == 3)
	{
		attacker_type = 'type_C';
	}

	if(parseInt(defender_type) == 1)
	{
		defender_type = 'type_A';
	}
	else if(parseInt(defender_type) == 2)
	{
		defender_type = 'type_B';
	}
	else if(parseInt(defender_type) == 3)
	{
		defender_type = 'type_C';
	}

	clear_army_animation(from_x, from_y, attacker_id);
	clear_army_animation(to_x, to_y, defender_id);
	if(attacker_status != 'dead' && defender_status != 'dead')
	{
	}
	if(attacker_status == 'dead' && defender_status == 'dead')
	{
		clear_army_type(hexagon_from, 'none');
		clear_army_type(hexagon_to, 'none');
		update_slot_list_own(hexagon_from, '');
		update_slot_list_own(hexagon_to, '');
	}
	if(attacker_status == 'dead' && defender_status != 'dead')
	{
		clear_army_type(hexagon_from, 'none');
		update_slot_list_own(hexagon_from, '');
	}
	if(attacker_status != 'dead' && defender_status == 'dead')
	{
		clear_army_type(hexagon_from, 'none');
		set_army_type(hexagon_to, attacker_type, attacker_id);
		update_slot_list_own(hexagon_from, '');
		update_slot_list_own(hexagon_to, attacker_id);
	}
}

function update_move(from_x, from_y, to_x, to_y, army_id)
{
	var hexagon_from = get_hexagon(from_x, from_y);
	var hexagon_to = get_hexagon(to_x, to_y);
	var army_id_from = '';
	var army_id_to = army_id;
	var type = getArmyById(army_id).type_id;

	if(parseInt(type) == 1)
	{
		type = 'type_A';
	}
	else if(parseInt(type) == 2)
	{
		type = 'type_B';
	}
	else if(parseInt(type) == 3)
	{
		type = 'type_C';
	}

	clear_army_animation(to_x, to_y, army_id_to);
	clear_army_type(hexagon_from, 'none');
	set_army_type(hexagon_to, type, army_id);
	update_slot_list_own(hexagon_from, army_id_from);
	update_slot_list_own(hexagon_to, army_id_to);
}

function update_defend(from_x, from_y, to_x, to_y, army_id)
{
	var hexagon_to = get_hexagon(from_x, from_y);
	var army_id_from = army_id;
	clear_army_animation(from_x, from_y, army_id_from);
}

function update_build(from_x, from_y, to_x, to_y, army_id)
{
	var hexagon_to = get_hexagon(to_x, to_y);
	var army_id_to = army_id;
	var type = getArmyById(army_id_to).type_id;
	if(type == 1)//sword
	{
		type = 'type_A';
	}
	else if(type == 2)//calvery
	{
		type = 'type_B';
	}
	else if(type == 3)//archer
	{
		type = 'type_C';
	}

	set_army_type(hexagon_to, type, army_id);
	update_slot_list_own(hexagon_to, army_id_to)
}

function update_slot_own() //update the slot movement
{
	var result = result_list[result_list.length - 1];
	if(!display_init_done)
		return;
	if(result)//not none
	{
		if(result.action_type == 'attack')
		{
			update_attack(result.from_x, result.from_y, result.to_x, result.to_y, result.attacker_id, result.defender_id);
		}
		else if(result.action_type == 'move')
		{
			update_move(result.from_x, result.from_y, result.to_x, result.to_y, result.army_id);
		}
		else if(result.action_type == 'defend')
		{
			update_defend(result.from_x, result.from_y, result.to_x, result.to_y, result.army_id);
		}
		else if(result.action_type == 'build')
		{
			update_build(result.from_x, result.from_y, result.from_x, result.from_y, result.army_id);
		}
	}
}

function update_hexagon_owner(x, y, owner_id)
{
	var hexagon = document.getElementsByClassName('hexagon');

	if(hexagon[parseInt(y) * line_num + parseInt(x)].getAttribute('slot_type') == 'normal_slot')
	{
		if(parseInt(owner_id) == user_1)
		{
			hexagon[parseInt(y) * line_num + parseInt(x)].setAttribute('user', 'user_1');
		}
		if(parseInt(owner_id) == user_2)
		{
			hexagon[parseInt(y) * line_num + parseInt(x)].setAttribute('user', 'user_2');
		}
		if(parseInt(owner_id) == user_3)
		{
			hexagon[parseInt(y) * line_num + parseInt(x)].setAttribute('user', 'user_3');
		}
	}
	else
	{
		hexagon[parseInt(y) * line_num + parseInt(x)].setAttribute('user', 'user');
		if(parseInt(owner_id) == user_1)
		{
			hexagon[parseInt(y) * line_num + parseInt(x)].style.background = user_1_color;
		}
		if(parseInt(owner_id) == user_2)
		{
			hexagon[parseInt(y) * line_num + parseInt(x)].style.background = user_2_color;
		}
		if(parseInt(owner_id) == user_3)
		{
			hexagon[parseInt(y) * line_num + parseInt(x)].style.background = user_3_color;
		}
	}
}

function update_slot_others()
{
}

function update_turn_div()
{
	var div_user = document.getElementsByClassName('user_turn');
	var active_id = getActivePlayerId();

	div_user[0].setAttribute('animation', 'off');
	div_user[0].innerHTML = getPlayerByID(user_1).pname;
	div_user[0].style.background = user_1_color;

	div_user[1].setAttribute('animation', 'off');
	div_user[1].innerHTML = getPlayerByID(user_2).pname;
	div_user[1].style.background = user_2_color;

	div_user[2].setAttribute('animation', 'off');
	div_user[2].innerHTML = getPlayerByID(user_3).pname;
	div_user[2].style.background = user_3_color;

	if(active_id == user_1)
	{
		div_user[0].setAttribute('animation', 'on');
	}
	else if(active_id == user_2)
	{
		div_user[1].setAttribute('animation', 'on');
	}
	else if(active_id == user_3)
	{
		div_user[2].setAttribute('animation', 'on');
	}
}
