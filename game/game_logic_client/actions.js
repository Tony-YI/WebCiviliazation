//This file contain the implementation of the action class, which record the actions of the current user


//Example of format of a single action
/*
	{
		"action_type":"attack",
		"attacker_id":"1",
		"defender_id":"2"
	}
	OR
	{
		"action_type":"movement",
		"army_id":"1",
		"to_slot":"2,1"
	}
	OR
	{
		"action_type":"build",
		"army_type":"2"
	}
*/
function Action_List()
{
	this.content 
}


//This function will add a action to the list of actions
Action_List.prototype.add_action = function(action)
{
}

//This function will clear up all the actions in the list of actions
Action_List.prototype.clear_actions = function(action)
{
}

//This function should be called when the player want to delete a particular action
Action_List.prototype.delete_action = function(action)
{
}

