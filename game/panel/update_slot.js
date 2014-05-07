//var result_list; global variable
//var line_num = 22; global variable in small_map.js
function update_slot_list_own(hexagon_from, hexagon_to, army_id_from, army_id_to)
{
	var from_x = hexagon_from.getAttribute('x');
	var from_y = hexagon_from.getAttribute('y');
	var slot_from = getSlotByXY(from_x, from_y) //function in game/game_logic_client->slot.js
	slot_from.army_id = army_id_from;

	var to_x = hexagon_to.getAttribute('x');
	var to_y = hexagon_to.getAttribute('y');
	var slot_to = getSlotByXY(to_x, to_y) //function in game/game_logic_client->slot.js
	slot_to.army_id = army_id_to;
}

function update_slot_list_others()
{

}

function get_hexagon(x, y)
{
	var hexagon = document.getElementsByClassName('hexagon');
	var hexagon_div = hexagon[parseInt(y) * line_num + parseInt(x)];
	return hexagon_div;
}

function set_army_type(hexagon_from, hexagon_to, type)
{
	hexagon_from.setAttribute('army_type', 'none');
	hexagon_to.setAttribute('army_type', type); //army_type: global variable in game.html

	hexagon_from.lastChild.setAttribute('src', '');
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
	hexagon_to.lastChild.setAttribute('src', src);
}

function update_attack(from_x, from_y, to_x, to_y)
{

}

function update_move(from_x, from_y, to_x, to_y)
{
	var hexagon_from = get_hexagon(from_x, from_y);
	var hexagon_to = get_hexagon(to_x, to_y);
	var army_id_from = '';
	var army_id_to = getSlotByXY(from_x, from_y).army_id;

	set_army_type(hexagon_from, hexagon_to, army_type);
	update_slot_list_own(hexagon_from, hexagon_to, army_id_from, army_id_to)
}

function update_defend(from_x, from_y, to_x, to_y)
{

}

function update_build(from_x, from_y, to_x, to_y)
{

}

function update_slot_own() //update the slot movement
{
	var result = result_list[result_list.length - 1];
	
	if(result)//not none
	{
		if(result.action_type == 'attack')
		{
			update_attack(result.from_x, result.from_y, result.to_x, result.to_y);
		}
		else if(result.action_type == 'move')
		{
			update_move(result.from_x, result.from_y, result.to_x, result.to_y);
		}
		else if(result.action_type == 'defend')
		{
			update_defend(result.from_x, result.from_y, result.to_x, result.to_y);
		}
		else if(result.action_type == 'build')
		{
			update_build(result.from_x, result.from_y, result.to_x, result.to_y);
		}
	}
}

function update_slot_others()
{

}