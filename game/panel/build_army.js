function build_clicked_handler()
{
    /*
    1.show build list
    2.wait for player's choice
    3.check whether the player can build this kind of army (cost, position)
    4.show the build result
    5.add the result to the result list 
    */
    var buildArmy = document.getElementById('buildArmy');
    //alert(buildArmy);
    buildArmy.style.display= "inline-block";
    buildArmy.style.zIndex= "200";


    /*buildArmy.innerHTML = """"""*/
}
function build_clicked_Exit()
{
	var buildArmy = document.getElementById('buildArmy');
    	buildArmy.style.display= "none";
}

function build_army(armyType)
{
	switch(armyType)
	{
		case 1:
			if(window.current_player.gold < 20 || current_player.wood < 20){
				alert("You do not have enough Gold or Wood to build a sword army");
			}
			else{
				window.current_player.gold = window.current_player.gold - 20;
				window.current_player.wood = window.current_player.wood - 20;
				var armyId = (window.army_list.length).toString();
				var newArmy = new Army(armyId,armyType,window.current_player.pid);
				window.army_list.push(newArmy);
				var tmp = new action("build","armyId",null,null,null,null,armyType);
				tmp.get_result();
				window.current_player.show_info();
			}
			
			break;
		case 2:
			if(window.current_player.gold < 25 || current_player.wood < 15){
				alert("You do not have enough Gold or Wood to build a sword army");
			}
			else{
				window.current_player.gold = window.current_player.gold - 20;
				window.current_player.wood = window.current_player.wood - 20;
				var armyId = (window.army_list.length).toString();
				var newArmy = new Army(armyId,armyType,window.current_player.pid);
				window.army_list.push(newArmy);
				var tmp = new action("build","armyId",null,null,null,null,armyType);
				tmp.get_result();
				window.current_player.show_info();
			}
			break;
		case 3:
			if(window.current_player.gold < 15 || current_player.wood < 25){
				alert("You do not have enough Gold or Wood to build a sword army");
			}
			else{
				window.current_player.gold = window.current_player.gold - 20;
				window.current_player.wood = window.current_player.wood - 20;
				var armyId = (window.army_list.length).toString();
				var newArmy = new Army(armyId,armyType,window.current_player.pid);
				window.army_list.push(newArmy);
				var tmp = new action("build","armyId",null,null,null,null,armyType);
				tmp.get_result();
				window.current_player.show_info();
			}
			break;
		default:
			break;
	}
	
}