/***********************************/
/**********check functions**********/
/***********************************/
function check_slot_owner(e) //check the slot owner
{
	//TODO:
	var current_usr_id = ;
	var pos_x = ;
	var pos_y = ;

	//send a xhr_requset to the server using AJAX
	var xhr_requset = new XMLHttpRequest();
	xhr_requset.open('POST', 'game/game_logic_server/check_slot_owner.php', true);
	xhr_requset.setRequestHeader('USERID', current_usr_id);
	xhr_requset.setRequestHeader('x', pos_x);
	xhr_requset.setRequestHeader('y', pos_y);
	xhr_requset.send();

	xhr_requset.onreadystatechange = function(){
		if(xhr_requset.readyState == 4)
		{
			if(xhr_requset.status != 200)
			{
				console.log("Error code = " + new String(xhr_requset.status));
				return false;
			}

			var obj = JSON.parse(xhr_requset.responseText);
			var belongs = obj.belongs;

			if(belongs)
			{
				return true;
			}
		}
	};
	return false;
}
/***********************************/