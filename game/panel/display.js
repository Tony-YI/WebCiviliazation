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
function mousedown_1(e)
{
	e.stopPropagation();
	e.preventDefault();

	switch(e.which)
	{
		case 1:
			console.log('left mousedown');
			break;
		case 2:
			console.log('middle mousedown');
			break;
		case 3:
			console.log('right mousedown');

			if(e.target.getAttribute('usage') == 'no') //not for use
			{
				return false;
			}

			//TODO: check whether this slot belongs to the user
			/*
			if(belong to user)
			{
				continuous;
			}
			else
			{
				break;
			}
			*/

			//add eventListener
			e.target.addEventListener('mouseup', mouseup_1, false);
			remove_manual();
			break;
		default:
			console.log('no such mousedown id');
			break;
	}
}

function mousemove_1(e)
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

function mouseup_1(e)
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
			display_army_type(e);
			//display_manual(e);
			break;
		default:
			console.log('no such mouseup id');
			break;
	}
}

function display_army_type(e)
{
	e.target.removeEventListener('mousedown', mousedown_1, false);
	e.target.removeEventListener('mouseup', mouseup_1, false);

	var pos_x = e.target.getAttribute('x');
	var pos_y = e.target.getAttribute('y');

	var hexagon = document.getElementsByClassName('hexagon');

	if(pos_y % 2 == 0)//odd
	{
		for(var i = 0; i < hexagon.length; i++)
		{
			if(hexagon[i].getAttribute('x') == parseInt(pos_x) - 1 && hexagon[i].getAttribute('y') == parseInt(pos_y) - 1)
			{
				//must add the attribute 'function' befor change the class name, other with hexagon[i] will be the next hexagon
				hexagon[i].setAttribute('function', 'type_A');
				hexagon[i].innerHTML = 'type_A';
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
			else if(hexagon[i].getAttribute('x') == parseInt(pos_x) - 1 && hexagon[i].getAttribute('y') == pos_y)
			{
				hexagon[i].setAttribute('function', 'type_B');
				hexagon[i].innerHTML = 'type_B';
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
			else if(hexagon[i].getAttribute('x') == parseInt(pos_x) - 1 && hexagon[i].getAttribute('y') == parseInt(pos_y) + 1)
			{
				hexagon[i].setAttribute('function', 'type_C');
				hexagon[i].innerHTML = 'type_C';
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
			else if(hexagon[i].getAttribute('x') == pos_x && hexagon[i].getAttribute('y') == pos_y)
			{
				hexagon[i].setAttribute('function', 'cancel');
				hexagon[i].innerHTML = 'Cancel';
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
		}
	}
	else //even
	{
		for(var i = 0; i < hexagon.length; i++)
		{
			if(hexagon[i].getAttribute('x') == parseInt(pos_x) + 1 && hexagon[i].getAttribute('y') == parseInt(pos_y) - 1)
			{
				hexagon[i].setAttribute('function', 'attack');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('class', 'manual');
			}
			else if(hexagon[i].getAttribute('x') == parseInt(pos_x) + 1 && hexagon[i].getAttribute('y') == pos_y)
			{
				hexagon[i].setAttribute('function', 'move');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('class', 'manual');
			}
			else if(hexagon[i].getAttribute('x') == parseInt(pos_x) + 1 && hexagon[i].getAttribute('y') == parseInt(pos_y) + 1)
			{
				hexagon[i].setAttribute('function', 'defence');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('class', 'manual');
			}
		}
	}

	//TODO add event listener
	console.log(pos_x, pos_y);
}

function display_manual(e)
{
	if(e.target.getAttribute('usage') == 'no')
	{
		return false;
	}

	//TODO: check whether this slot belongs to the user
	//if yes, continuous

	var pos_x = e.target.getAttribute('x');
	var pos_y = e.target.getAttribute('y');

	var hexagon = document.getElementsByClassName('hexagon');

	if(pos_y % 2 == 0)//odd
	{
		for(var i = 0; i < hexagon.length; i++)
		{
			if(hexagon[i].getAttribute('x') == pos_x && hexagon[i].getAttribute('y') == parseInt(pos_y) - 1)
			{
				//must add the attribute 'function' befor change the class name, other with hexagon[i] will be the next hexagon
				hexagon[i].setAttribute('function', 'attack');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('class', 'manual');
			}
			else if(hexagon[i].getAttribute('x') == parseInt(pos_x) + 1 && hexagon[i].getAttribute('y') == pos_y)
			{
				hexagon[i].setAttribute('function', 'move');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('class', 'manual');
			}
			else if(hexagon[i].getAttribute('x') == pos_x && hexagon[i].getAttribute('y') == parseInt(pos_y) + 1)
			{
				hexagon[i].setAttribute('function', 'defence');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('class', 'manual');
			}
		}
	}
	else //even
	{
		for(var i = 0; i < hexagon.length; i++)
		{
			if(hexagon[i].getAttribute('x') == parseInt(pos_x) + 1 && hexagon[i].getAttribute('y') == parseInt(pos_y) - 1)
			{
				hexagon[i].setAttribute('function', 'attack');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('class', 'manual');
			}
			else if(hexagon[i].getAttribute('x') == parseInt(pos_x) + 1 && hexagon[i].getAttribute('y') == pos_y)
			{
				hexagon[i].setAttribute('function', 'move');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('class', 'manual');
			}
			else if(hexagon[i].getAttribute('x') == parseInt(pos_x) + 1 && hexagon[i].getAttribute('y') == parseInt(pos_y) + 1)
			{
				hexagon[i].setAttribute('function', 'defence');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('class', 'manual');
			}
		}
	}

	console.log(pos_x, pos_y);
}

function remove_manual()
{
	var manual = document.getElementsByClassName('manual');
	while(manual[0])
	{
		if(manual[0].getAttribute('usage') == 'no')
		{
			manual[0].style.opacity = '0.0';
		}
		manual[0].setAttribute('function', 'none');
		manual[0].innerHTML = '';
		manual[0].setAttribute('class', 'hexagon');
	}
}

function no_contextmenu(e)
{
	e.preventDefault();
	e.stopPropagation();
}

function addBoxes()
{
	//20 x 20 map//
	var hexagon_num = 484;
	var new_line_num = 22; //the top/left/bottom/right are useless

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
		hexagon[i].setAttribute('function', 'none');
		hexagon[i].setAttribute('usage', 'yes');
		var x = i % new_line_num;
		var y = parseInt(i / new_line_num);
		hexagon[i].setAttribute('x', x);
		hexagon[i].setAttribute('y', y);

		if(x == 0) //start hexagon
		{
			if(y % 2 == 0) //odd begin hexagon
			{
				hexagon[i].setAttribute('id', 'hexagon_begin_odd');
				hexagon[i].setAttribute('usage', 'no');
				hexagon[i].style.opacity = '0.0';
			}
			else //even begin hexagon
			{
				hexagon[i].setAttribute('id', 'hexagon_begin_even');
				hexagon[i].setAttribute('usage', 'no');
				hexagon[i].style.opacity = '0.0';
			}
		}
		else if (x == new_line_num - 1) //end hexagon of one row
		{
			hexagon[i].setAttribute('id', 'hexagon_last');
			hexagon[i].setAttribute('usage', 'no');
			hexagon[i].style.opacity = '0.0';
		}
		else //normal hexagon
		{
			hexagon[i].setAttribute('id', 'hexagon_normal');
			if(i < new_line_num || i > hexagon_num - new_line_num)
			{
				hexagon[i].setAttribute('usage', 'no');
				hexagon[i].style.opacity = '0.0';
			}
		}

		hexagon[i].addEventListener('mousedown', mousedown_1, false);
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