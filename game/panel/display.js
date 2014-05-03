/*
		<div id="new_line"><br/></div>
        <div id="hexagon_begin_odd"></div>
        <div id="hexagon"></div>
        <div id="hexagon"></div>
        <div id="hexagon"></div>
        <div id="hexagon"></div>
        <div id="hexagon"></div>
        <div id="hexagon"></div>
        <div id="hexagon"></div>
        <div id="hexagon"></div>
        <div id="hexagon_last"></div>

        <div id="new_line"><br/></div>   
        <div id="hexagon_begin_even"></div>
        <div id="hexagon"></div>
        <div id="hexagon"></div>
        <div id="hexagon"></div>
        <div id="hexagon"></div>
        <div id="hexagon"></div>
        <div id="hexagon"></div>
        <div id="hexagon"></div>
        <div id="hexagon_last"></div>
*/
function addBoxes()
{
	//20 x 20 map//
	var hexagon_num = 10;
	var new_line_num = 4;
	var hexagon_last_num = new_line_num;
	var hexagon_begin_odd_num = parseInt(new_line_num / 2);
	var hexagon_begin_even_num = parseInt(new_line_num / 2);

	var new_line = Array();
	for(var i = 0; i < new_line_num; i++)
	{
		new_line[i] = document.createElement('div');
		new_line[i].setAttribute('id', 'new_line');
		var br = document.createElement('br');
		new_line[i].appendChild(br);
	}

	var hexagon_begin_odd = Array();
	for(var i = 0; i < hexagon_begin_odd_num; i++)
	{
		hexagon_begin_odd[i] = document.createElement('div');
		hexagon_begin_odd[i].setAttribute('id', 'hexagon_begin_odd');
	}

	var hexagon = Array();
	for(var i = 0; i < hexagon_num; i++)
	{
		hexagon[i] = document.createElement('div');
		hexagon[i].setAttribute('id', 'hexagon');
	}

	var hexagon_begin_even = Array();
	for(var i = 0; i < hexagon_begin_even_num; i++)
	{
		hexagon_begin_even[i] = document.createElement('div');
		hexagon_begin_even[i].setAttribute('id', 'hexagon_begin_even');
	}

	var hexagon_last = Array();
	for(var i = 0; i < hexagon_last_num; i++)
	{
		hexagon_last[i] = document.createElement('div');
		hexagon_last[i].setAttribute('id', 'hexagon_last');
	}

	var box = document.getElementById('box');

	box.appendChild(new_line[0]);
	box.appendChild(hexagon_begin_odd[0]);
	box.appendChild(hexagon[0]);
	box.appendChild(hexagon[1]);
	box.appendChild(hexagon[2]);
	box.appendChild(hexagon[3]);
	box.appendChild(hexagon[4]);
	box.appendChild(hexagon_last[0]);

	box.appendChild(new_line[1]);
	box.appendChild(hexagon_begin_even[0]);
	box.appendChild(hexagon[5]);
	box.appendChild(hexagon[6]);
	box.appendChild(hexagon[7]);
	box.appendChild(hexagon[8]);
	box.appendChild(hexagon[9]);
	box.appendChild(hexagon_last[1]);
}

function init(e)
{
	addBoxes();
}

window.addEventListener('load', init, false);