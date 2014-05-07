/***********************************/
/**********check functions**********/
/***********************************/
function check_slot_right_click_able(e) //check the slot owner
{
	var target = e.target;
	if(target.getAttribute('class') != 'hexagon')
	{
		target = e.target.parentNode;
	}

	//check whether this slot belongs to the user
	var user_id = getCookie('CURRENT_USER'); //in game/game_logic_client/check_functions.js

	var pos_x = target.getAttribute('x');
	var pos_y = target.getAttribute('y');

	var slot = getSlotByXY(pos_x, pos_y); //in slot.js

	if(parseInt(getArmyById(slot.army_id).owner) == user_id)
	{
		return true;
	}

	return false;
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