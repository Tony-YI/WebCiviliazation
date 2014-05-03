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
function click(e)
{
	e.stopPropagation();
	e.preventDefault();

	alert("hehe");
}

function addBoxes()
{
	//20 x 20 map//
	var hexagon_num = 360;
	var new_line_num = 20;
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
		hexagon_begin_odd[i].addEventListener('mousedown', click, false)
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

	for(var i = 0; i < new_line_num; i++)
	{
		box.appendChild(new_line[i]);

		if(i % 2 == 0) //odd
		{
			box.appendChild(hexagon_begin_odd[parseInt(i / 2)]);
		}
		else
		{
			box.appendChild(hexagon_begin_even[parseInt(i / 2)]);
		}

		for(var j = 0; j < new_line_num - 2; j++)
		{
			box.appendChild(hexagon[18 * i + j]);
		}

		box.appendChild(hexagon_last[i]);
	}
}

function init(e)
{
	addBoxes();
}

window.addEventListener('load', init, false);