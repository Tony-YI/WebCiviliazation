//This file contains javascript function for the client and server communication in a game


//The result of a player's turn would be sent to the server in JSON format
/*
	according to the result_type, the content of the result may be different,
	see the following example
	{
		{
			"result_type":"movement",
			"player":"1",
			"army_id":"1",
			"to_slot":"1,3"
		},	
		{
			"result_type":"attack",
			"player":"1",
			"attacker_id":"2",
			"defender_id":"3",
			"attacker_hp":"1",
			"defender_hp":"0"
		},
		{
			"result_type":"build",
			"player":"1",
			"army_type":"1",
			"at_slot":"1,2"
		}
	}
*/

function submit_result_of_turn()
{

}
