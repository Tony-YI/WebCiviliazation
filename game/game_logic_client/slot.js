//This file contains implementation of slot class

function Slot(slot_x,slot_y)
{
	this.x = slot_x;
	this.y = slot_y;
	this.type_id = null;
	this.army_id = null;
	this.owner = null;
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
			army_object.position_x = slot.x;
			army_object.position_y = slot.y;
		}
		//console.log("getting slotowner");
		slot.owner = slots[count].slot_owner;
		//console.log("pushing into the array");
		slot_list.push(slot);
	}
}




