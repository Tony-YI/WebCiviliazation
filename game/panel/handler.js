//This file contains handlers for clicking Attack, move, and defend 
//[HINT] variable 'latest_slot' points to the DOM that is the grand-parent of all these actions
var current_usr_id = $.cookie("CURRENT_USER");
if(current_usr_id)
	console.log("CURRENT_USER is " + current_usr_id);

function show_range(x, y)
{
	remove_manual(); //in display.js
	var slot_div = document.getElementsByClassName('hexagon');

	var i = parseInt(y) * line_num + parseInt(x);//line_nume: global variable in small_map.js
	var user_id = parseInt(getCookie('CURRENT_USER')); //in game/game_logic_client/check_functions.js

	if(parseInt(slot_list[i].type_id) != 0 && parseInt(slot_list[i].owner) != user_id) //not unused and not your own city
	{
		slot_div[i].setAttribute('function', 'range');
		//all the change color thing are done in display.css
	}
}

function clear_range()
{
	var slot_div = document.getElementsByClassName('hexagon');
	for(var i = 0; i < slot_num; i++) //slot_num: global variable in small_map.js
	{
		if(slot_div[i].getAttribute('function') == 'range')
		{
			slot_div[i].setAttribute('function', 'none');
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
	console.log(latest_slot);
}

function attack_action()
{
	/*
	1. compute the result of the attack
	2. show the result
	3. record the result in result list
	4. clear the attack range
	*/
}

function move_clicked_handler()
{
	/*
	1. show the move range
	2. attach move event listener (move_action() to the div) 
	*/
	console.log(latest_slot);
	console.log(latest_slot.getAttribute('x'));
	console.log(latest_slot.getAttribute('y'));
	var x = latest_slot.getAttribute('x');
	var y = latest_slot.getAttribute('y');
	if(y%2 == 1)
	{
		show_range(x,y-1);
		show_range(x+1,y-1);
		show_range(x-1,y);
		show_range(x+1,y);
		show_range(x,y+1);
		show_range(x+1,y+1);
	}
	else
	{
		show_range(x-1,y-1);
		show_range(x,y-1);
		show_range(x-1,y);
		show_range(x+1,y);
		show_range(x-1,y+1);
		show_range(x,y+1);
	}
}

function move_action()
{
	/*
	1. compute the result of the movement
	2. show the result
	3. record the result in result list
	*/
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
