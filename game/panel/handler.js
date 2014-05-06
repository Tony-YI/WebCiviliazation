//This file contains handlers for clicking Attack, move, and defend 
//[HINT] variable 'latest_slot' points to the DOM that is the grand-parent of all these actions
var current_usr_id = $.cookie("CURRENT_USER");
if(current_usr_id)
	console.log("CURRENT_USER is " + current_usr_id);

function show_range(x, y, action)
{
	remove_manual(); //in display.js
	var slot_div = document.getElementsByClassName('hexagon');

	var i = parseInt(y) * line_num + parseInt(x);//line_nume: global variable in small_map.js
	var user_id = parseInt(getCookie('CURRENT_USER')); //in game/game_logic_client/check_functions.js

	if(parseInt(slot_list[i].type_id) != 0 && parseInt(slot_list[i].owner) != user_id) //not unused and not your own city
	{
		slot_div[i].setAttribute('function', 'range');
		//all the change color thing are done in display.css
		if(action == 'move')
		{
			slot_div[i].addEventListener('click', move_action, false);
		}
		else if(action == 'attack')
		{
			slot_div[i].addEventListener('click', attack_action, false);
		}
	}
}

function clear_range(action)
{
	var slot_div = document.getElementsByClassName('hexagon');
	for(var i = 0; i < slot_num; i++) //slot_num: global variable in small_map.js
	{
		if(slot_div[i].getAttribute('function') == 'range')
		{
			slot_div[i].setAttribute('function', 'none');
			if(action == 'move')
			{
				slot_div[i].removeEventListener('click', move_action, false);
			}
			else if(action == 'attack')
			{
				slot_div[i].removeEventListener('click', attack_action, false);
			}
		}
	}
}

function attack_clicked_handler()
{
	/*
	1. show the attack range
	2. attach attack event listener (attack_action() to the div) 3
	3. attach cancel event handler 
	*/
	var x = parseInt(latest_slot.getAttribute('x'));
	var y = parseInt(latest_slot.getAttribute('y'));
	if(y%2 == 1)
	{
		show_range(x, y-1, 'attack');
		show_range(x+1, y-1, 'attack');
		show_range(x-1, y, 'attack');
		show_range(x+1, y, 'attack');
		show_range(x, y+1, 'attack');
		show_range(x+1, y+1, 'attack');
	}
	else
	{
		show_range(x-1, y-1, 'attack');
		show_range(x, y-1, 'attack');
		show_range(x-1, y, 'attack');
		show_range(x+1, y, 'attack');
		show_range(x-1, y+1, 'attack');
		show_range(x, y+1, 'attack');
	}
}

function attack_action(e)
{
	/*
	1. compute the result of the attack
	2. show the result
	3. record the result in result list
	4. clear the attack range
	*/
	e = e || window.event;
	console.log(e.target);
	var target = e.target;
	var from_x = latest_slot.getAttribute('x');
	var from_y = latest_slot.getAttribute('y');
	var to_x = target.getAttribute('x');
	var to_y = target.getAttribute('y');
	console.log('attack from (' + from_x+ ', ' + from_y + ') to (' + to_x+ ', ' + to_y + ')');
	clear_range('attack');
}

function move_clicked_handler()
{
	/*
	1. show the move range
	2. attach move event listener (move_action() to the div) 
	*/
	console.log(latest_slot);
	//console.log(latest_slot.getAttribute('x'));
	//console.log(latest_slot.getAttribute('y'));
	var x = parseInt(latest_slot.getAttribute('x'));
	var y = parseInt(latest_slot.getAttribute('y'));
	if(y%2 == 1)
	{
		show_range(x, y-1, 'move');
		show_range(x+1, y-1, 'move');
		show_range(x-1, y, 'move');
		show_range(x+1, y, 'move');
		show_range(x, y+1, 'move');
		show_range(x+1, y+1, 'move');
	}
	else
	{
		show_range(x-1, y-1, 'move');
		show_range(x, y-1, 'move');
		show_range(x-1, y, 'move');
		show_range(x+1, y, 'move');
		show_range(x-1, y+1, 'move');
		show_range(x, y+1, 'move');
	}
}

function move_action(e)
{
	/*
	1. compute the result of the movement
	2. show the result
	3. record the result in result list
	*/
	e = e || window.event;
	console.log(e.target);
	var target = e.target;
	var from_x = latest_slot.getAttribute('x');
	var from_y = latest_slot.getAttribute('y');
	var to_x = target.getAttribute('x');
	var to_y = target.getAttribute('y');
	console.log('move from (' + from_x+ ', ' + from_y + ') to (' + to_x+ ', ' + to_y + ')');
	clear_range('move');
}

function defend_clicked_handler()
{

}


function surrender_clicked_handler()
{
	/*
	This function handle the click event on the surrender button
	*/

}

function nextround_clicked_handler()
{
	/*
	This function handle the click event on the next round button
	*/
}
