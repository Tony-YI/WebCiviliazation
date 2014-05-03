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
function mousedown(e)
{
	e.stopPropagation();
	e.preventDefault();

	switch(e.which)
	{
		case 1:
			console.log('left mousedown');
			e.target.addEventListener('mouseup', mouseup, false);
			break;
		case 2:
			console.log('middle mousedown');
			break;
		case 3:
			console.log('right mousedown');
			e.target.addEventListener('mouseup', mouseup, false);
			break;
		default:
			console.log('no such mousedown id');
			break;
	}
}

function mousemove(e)
{
	e.stopPropagation();
	e.preventDefault();

	switch(e.which)
	{
		case 1:
			console.log('left mousemove');
			break;
		case 2:
			console.log('middle mousemove');
			break;
		case 3:
			console.log('right mousemove');
			break;
		default:
			console.log('no such mousemove id');
			break;
	}
}

function mouseup(e)
{
	e.stopPropagation();
	e.preventDefault();

	switch(e.which)
	{
		case 1:
			console.log('left mouseup');
			break;
		case 2:
			console.log('middle mouseup');
			break;
		case 3:
			console.log('right mouseup');
			display_manual(e.target);
			break;
		default:
			console.log('no such mouseup id');
			break;
	}
}

function display_manual(target)
{
	var pos_x = target.x;
	var pos_y = target.y;

	console.log("x = pos_x; y = pos_y");
}

function no_contextmenu(e)
{
	e.preventDefault();
	e.stopPropagation();
}

function addBoxes()
{
	//20 x 20 map//
	var hexagon_num = 400;
	var new_line_num = 20;

	var new_line = Array();
	for(var i = 0; i < new_line_num; i++)
	{
		new_line[i] = document.createElement('div');
		new_line[i].setAttribute('id', 'new_line');
		var br = document.createElement('br');
		new_line[i].appendChild(br);
	}

	var hexagon = Array();
	for(var i = 0; i < hexagon_num; i++)
	{
		hexagon[i] = document.createElement('div');
		hexagon[i].setAttribute('class', 'hexagon');
		var x = i % new_line_num;
		var y = parseInt(i / new_line_num);
		hexagon[i].setAttribute('x', x);
		hexagon[i].setAttribute('y', y);

		if(x == 0) //start hexagon
		{
			if(y % 2 == 0) //odd begin hexagon
			{
				hexagon[i].setAttribute('id', 'hexagon_begin_odd');
			}
			else //even begin hexagon
			{
				hexagon[i].setAttribute('id', 'hexagon_begin_even');
			}
		}
		else if (x == new_line_num - 1) //end hexagon of one row
		{
			hexagon[i].setAttribute('id', 'hexagon_last');
		}
		else //normal hexagon
		{
			hexagon[i].setAttribute('id', 'hexagon_normal');
		}

		hexagon[i].addEventListener('mousedown', mousedown, false);
	}

	var box = document.getElementById('box');
	box.addEventListener('contextmenu', no_contextmenu, false);

	for(var i = 0; i < new_line_num; i++)
	{
		box.appendChild(new_line[i]);

		for(var j = 0; j < new_line_num; j++)
		{
			box.appendChild(hexagon[new_line_num * i + j]);
		}
	}
}

function init(e)
{
	addBoxes();
}

window.addEventListener('load', init, false);