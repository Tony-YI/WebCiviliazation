//This file contains handlers for clicking Attack, move, and defend 
//[HINT] variable 'latest_slot' points to the DOM that is the grand-parent of all these actions
function attack_clicked_handler()
{
	/*
	1. show the attack range
	2. attach attack event listener (attack_action() to the div) 3
	3. attach cancel event handler 
	*/
	cosnole.log(latest_slot);
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

function build_clicked_hanlder()
{
	/*
	1.show build list
	2.wait for player's choice
	3.check whether the player can build this kind of army (cost, position)
	4.show the build result
	5.add the result to the result list 
	*/
}