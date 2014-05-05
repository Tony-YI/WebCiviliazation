/***********************************/
/**********check functions**********/
/***********************************/
function check_slot_owner(e) //check the slot owner
{
	//TODO: check whether this slot belongs to the user
	var user_id = getCookie('CURRENT_USER'); //in game/game_logic_client/check_functions.js

	var pos_x = e.target.getAttribute('x');
	var pos_y = e.target.getAttribute('y');

	for(var i = 0; i < slot_list.length; i++)
	{
		if(parseInt(slot_list[i].slot_x) == parseInt(pos_x) && parseInt(slot_list[i].slot_y) == parseInt(pos_y))
		{
			if(parseInt(slot_list[i].owner) == parseInt(user_id))
			{
				return true;
			}
		}
	}

	console.log(pos_x);
	console.log(pos_y);
	return false;
}

function check_army_type(e) //check the army type of this slot
{
	return true;
}

function getCookie(cname) //get a specific cooike variable
{
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) 
  	{
  		var c = ca[i].trim();
  		if (c.indexOf(name)==0) return c.substring(name.length, c.length);
  	}
	return "";
}
/***********************************/