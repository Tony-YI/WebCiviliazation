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
		var slot = new Slot(slots[count].slot_x,slots[count].slot_y);
		slot.type_id = slots[count].slot_type;
		slot.army_id = slots[count].slot_army;
		slot.owner = slots[count].slot_owner;
		slot_list.push(slot);
	}
}




