//This file contains implementation of slot class

function Slot(slot_x,slot_y)
{
	this.slot_x = slot_x;
	this.slot_y = slot_y;
	this.type_id = null;
	this.army_id = null;
	this.owner = null;
}
var num_of_slot_in_row = 22
function getSlotByXY(slot_x,slot_y)
{
	return slot_list[parseInt(slot_y) * num_of_slot_in_row + parseInt(slot_x)];
} 

function init_slot_list(slots)
{
	for(var count = 0;count < slots.length;count++)
	{
		//console.log("Constructing new Slot");
		var slot = new Slot(slots[count].slot_x,slots[count].slot_y);
		//console.log("getting slottype");
		slot.type_id = slots[count].slot_type;
		//console.log("getting slotarmy");
		slot.army_id = slots[count].slot_army;
		if(slot.army_id != "")
		{
			var army_object = getArmyById(slot.army_id);
			army_object.position_x = slot.slot_x;
			army_object.position_y = slot.slot_y;
			//console.log(slot);
		}
		if(slot.owner_id != "" && slot.type_id == 4) 
		{
			console.log(slot);
			var player_object = getPlayerByID(slot.owner_id);	
			player_object.capital_x = slot.slot_x;
			player_object.capital_y = slot.slot_y;
		}
		//console.log("getting slotowner");
		slot.owner = slots[count].slot_owner;
		//console.log("pushing into the array");
		slot_list.push(slot);
	}
}




