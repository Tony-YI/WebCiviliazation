//var result_list; global variable
//var line_num = 22; global variable in small_map.js

function get_hexagon(x, y)
{
	var hexagon = document.getElementsByClassName('hexagon');
	var hexagon_div = hexagon[parseInt(y) * line_num + parseInt(x)];
	return hexagon_div;
}

function update_attack(from_x, from_y, to_x, to_y)
{

}

function update_move(from_x, from_y, to_x, to_y)
{
	var hexagon_from = get_hexagon(from_x, from_y);
	hexagon_from.setAttribute('army_type', 'none');

	var hexagon_to = get_hexagon(to_x, to_y);
	hexagon_to.setAttribute('army_type', army_type); //army_type: global variable in game.html
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