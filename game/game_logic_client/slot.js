//This file contains implementation of slot class

function slot(slot_x, slot_y)
{
	this.x = slot_x;
	this.y = slot_y;
	this.owner = null;
	this.type = null;
	this.armyA_id = null;
	this.armyB_id = null;
	this.armyC_id = null;
}

slot.prototype.set_owner(owner_id)
{
	this.owner = owner_id;
}

slot.prototype.set_type(type_id)
{
	this.type
}
