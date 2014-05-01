/*
	This file contains implementation of the page rendering, with proper input parameter
*/
var panel_layer;
var status_div;
var actions_div;
var slot_info_div;
var army_info_div;

function create_panel_layer()
{
	panel_layer = document.createElement("div");
	panel_layer.id = "panel_layer";
	update_status_div(null);
	update_actions_div(null);
	update_slot_info_div(null);
	update_army_info_div(null);

	panel_layer.appendChild(status_div);
	panel_layer.appendChild(actions_div);
	panel_layer.appendChild(slot_info_div);
	panel_layer.appendChild(army_info_div);

	return panel_layer;
}

function update_status_div(status)
{
	//This function will update the status div div

	//If the status_div does not exist yet
	if(!status_div = $("#status_div"))
	{
		status_div = document.createElement("div");
		status_div.id = "status_div";
	}

	return status_div;
}

function update_actions_div(actions)
{
	//This function will update the actions list div

	//If the actions_div does not exist yet
	if(!actions_div=$("#actions_div"))
	{
		actions_div = document.createElement("div");
		actions_div.id = "actions_div";
	}

	return actions_div;
}

function update_slot_info_div(slot_info)
{
	//This function will update the slot info div

	//If the slot_info_div does not exist yet
	if(!slot_info_div = $("#slot_info_div"))
	{
		slot_info_div = document.createElement("div");
		slot_info_div.id = "slot_info_div";
	}
	return update_slot_info_div;
}

function update_army_info_div(army_info)
{
	//This function will update the army info div

	if(!army_info_div=$("#army_info_div"))
	{
		army_info_div = document.createElement("div");
		army_info_div.id = "army_info_div";
	}

	return update_army_info_div;
}

function update_slot(slot)
{
	//This function will update the expected slot with a newer data
}
