//THIS FILE CONTAINS IMPLEMENTATION OF RESULT_LIST IN JAVASCRIPT

function result(slot_x, slot_y, owner, type_A, type_B, type_C)
{
	//DEFINE RESULT OBJECT
	this.slot_x = slot_x; //modified slot's x coordiante
	this.slot_y = slot_y; //modified slot's y coordiante
	this.owner = owner; //slot's onwer
	this.type_A = type_A; //# of army type_A
	this.type_B = type_B; //# of army type_B
	this.type_C = type_C; //# of army type_C
}

function action(from_x, from_y, to_x, to_y, player, army_type, army_num, action_type)
{
	//DEFIEN ACTION OBJECT
	this.from_x = from_x; 
	this.from_y = from_y;
	this.to_x = to_x;
	this.to_y = to_y;
	this.player = player; //the player who perform the action
	this.army_type = army_type; //A or B or C
	this.army_num =army_num;
	this.action_type = action_type; //attack or move or defense
}

function get_result(action)
{
	//GET RESULT(S) OF AN ACTION
}

function parse_result(result)
{
	//PARSE RESULT TO JSON FOMMAT TO SEND TO SERVER
}

function parse_action(action)
{
	//PARSE ACTION TO JSON FOMMAT TO SEND TO SERVER
}