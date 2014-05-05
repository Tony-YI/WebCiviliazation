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

/***********************************/
/**********event handelers**********/
/***********************************/
function mousedown_1(e) //handel the right click on slot
{
	e.stopPropagation();
	e.preventDefault();

	switch(e.which)
	{
		case 1:
			console.log('left mousedown 1');
			clean_small_map_dot(); //in small_map.js
			small_map_dot(e); //in small_map.js
			display_hexagon_info(e);
			break;
		case 2:
			console.log('middle mousedown 1');
			break;
		case 3:
			console.log('right mousedown 1');

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
			clean_small_map_dot(); //in small_map.js
			small_map_dot(e); //in small_map.js
			remove_manual();
			break;
		default:
			console.log('no such mousedown id 1');
			break;
	}
}

function mousedown_2(e) //handel the left click on selecting army type
{
	e.stopPropagation();
	e.preventDefault();

	switch(e.which)
	{
		case 1:
			console.log('left mousedown 2');
			e.target.addEventListener('mouseup', mouseup_2, false);
			break;
		case 2:
			console.log('middle mousedown 2');
			break;
		case 3:
			console.log('right mousedown 2');
			break;
		default:
			console.log('no such mousedown id 2');
			break;
	}
}

function mousedown_3(e) //handel the left click on selecting function (attack/defance/move)
{
	e.stopPropagation();
	e.preventDefault();

	switch(e.which)
	{
		case 1:
			console.log('left mousedown 3');
			e.target.addEventListener('mouseup', mouseup_3, false);
			break;
		case 2:
			console.log('middle mousedown 3');
			break;
		case 3:
			console.log('right mousedown 3');
			break;
		default:
			console.log('no such mousedown id 3');
			break;
	}
}

function mousemove_1(e) //useless
{
	e.stopPropagation();
	e.preventDefault();

	switch(e.which)
	{
		case 1:
			console.log('left mousemove 1');
			break;
		case 2:
			console.log('middle mousemove 1');
			break;
		case 3:
			console.log('right mousemove 1');
			break;
		default:
			console.log('no such mousemove id 1');
			break;
	}
}

function mouseup_1(e) //w.r.t function mouse_down_1(e)
{
	e.stopPropagation();
	e.preventDefault();

	switch(e.which)
	{
		case 1:
			console.log('left mouseup 1');
			break;
		case 2:
			console.log('middle mouseup 1');
			break;
		case 3:
			console.log('right mouseup 1');
			display_army_type(e);
			break;
		default:
			console.log('no such mouseup id 1');
			break;
	}
}

function mouseup_2(e)  //w.r.t function mouse_down_2(e)
{
	e.stopPropagation();
	e.preventDefault();

	switch(e.which)
	{
		case 1:
			console.log('left mouseup 2');
			select_army_type(e);
			break;
		case 2:
			console.log('middle mouseup 2');
			break;
		case 3:
			console.log('right mouseup 2');
			break;
		default:
			console.log('no such mouseup id 2');
			break;
	}
}

function mouseup_3(e)  //w.r.t function mouse_down_3(e)
{
	e.stopPropagation();
	e.preventDefault();

	switch(e.which)
	{
		case 1:
			console.log('left mouseup 3');
			select_manual(e);
			break;
		case 2:
			console.log('middle mouseup 3');
			break;
		case 3:
			console.log('right mouseup 3');
			break;
		default:
			console.log('no such mouseup id 3');
			break;
	}
}

function end_slidein(e)  //handel the animation
{
	e.target.removeEventListener('mouseover', end_slidein, false);
	e.target.setAttribute('type', 'none');
}

function key_down(e)
{
	e.stopPropagation();
	e.preventDefault();

	var key = e.keyCode;
	if(key == 77)
	{
		console.log(key);
		document.getElementById('small_map').style.display = 'block';
	}
}

function key_up(e)
{
	var key = e.keyCode;
	if(key == 77)
	{
		console.log(key);
		document.getElementById('small_map').style.display = 'none';
	}
}

function no_contextmenu(e) //no default right click when event on the map
{
	e.preventDefault();
	e.stopPropagation();
}

function window_resize(e) //handel window resize
{
	resize();
}
/***********************************/

/***********************************/
/*********display functions*********/
/***********************************/
function display_army_type(e) //TODO: check whether this slot has shuch army type
{
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
				hexagon[i].setAttribute('type', 'slidein');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_2, false);
				hexagon[i].addEventListener('mouseover', end_slidein, false);
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
			else if(hexagon[i].getAttribute('x') == parseInt(pos_x) - 1 && hexagon[i].getAttribute('y') == pos_y)
			{
				hexagon[i].setAttribute('function', 'type_B');
				hexagon[i].innerHTML = 'type_B';
				hexagon[i].setAttribute('type', 'slidein');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_2, false);
				hexagon[i].addEventListener('mouseover', end_slidein, false);
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
			else if(hexagon[i].getAttribute('x') == parseInt(pos_x) - 1 && hexagon[i].getAttribute('y') == parseInt(pos_y) + 1)
			{
				hexagon[i].setAttribute('function', 'type_C');
				hexagon[i].innerHTML = 'type_C';
				hexagon[i].setAttribute('type', 'slidein');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_2, false);
				hexagon[i].addEventListener('mouseover', end_slidein, false);
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
			else if(hexagon[i].getAttribute('x') == pos_x && hexagon[i].getAttribute('y') == pos_y)
			{
				hexagon[i].setAttribute('function', 'cancel');
				hexagon[i].innerHTML = 'Cancel';
				hexagon[i].style.opacity = '1.0';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_2, false);
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
		}
	}
	else //even
	{
		for(var i = 0; i < hexagon.length; i++)
		{
			if(hexagon[i].getAttribute('x') == pos_x && hexagon[i].getAttribute('y') == parseInt(pos_y) - 1)
			{
				hexagon[i].setAttribute('function', 'type_A');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('type', 'slidein');
				hexagon[i].innerHTML = 'type_A';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_2, false);
				hexagon[i].addEventListener('mouseover', end_slidein, false);
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
			else if(hexagon[i].getAttribute('x') == parseInt(pos_x) - 1 && hexagon[i].getAttribute('y') == pos_y)
			{
				hexagon[i].setAttribute('function', 'type_B');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('type', 'slidein');
				hexagon[i].innerHTML = 'type_B';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_2, false);
				hexagon[i].addEventListener('mouseover', end_slidein, false);
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
			else if(hexagon[i].getAttribute('x') == pos_x && hexagon[i].getAttribute('y') == parseInt(pos_y) + 1)
			{
				hexagon[i].setAttribute('function', 'type_C');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].setAttribute('type', 'slidein');
				hexagon[i].innerHTML = 'type_C';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_2, false);
				hexagon[i].addEventListener('mouseover', end_slidein, false);
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
			else if(hexagon[i].getAttribute('x') == pos_x && hexagon[i].getAttribute('y') == pos_y)
			{
				hexagon[i].setAttribute('function', 'cancel');
				hexagon[i].innerHTML = 'Cancel';
				hexagon[i].style.opacity = '1.0';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_2, false);
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
		}
	}

	//TODO add event listener
	console.log(pos_x, pos_y);
}

function select_army_type(e)
{
	var x = e.target.getAttribute('x');
	var y = e.target.getAttribute('y');

	e.target.removeEventListener('mousedown', mousedown_2, false);
	e.target.removeEventListener('mouseup', mouseup_2, false);

	var target_function = e.target.getAttribute('function');

	if(target_function == 'type_A')
	{
		//alert('A');
		remove_manual();

		if(parseInt(e.target.getAttribute('y')) % 2 == 1) //odd
		{
			x = parseInt(x) + 1;
		}
		y = parseInt(y) + 1;
		
		display_manual(x, y, 'type_A');
	}
	else if(target_function == 'type_B')
	{
		//alert('B');
		remove_manual();

		x = parseInt(x) + 1;

		display_manual(x, y, 'type_B');
	}
	else if(target_function == 'type_C')
	{
		//alert('C');
		remove_manual();
		if(parseInt(e.target.getAttribute('y')) % 2 == 1) //odd
		{
			x = parseInt(x) + 1;
		}
		y = parseInt(y) - 1;

		display_manual(x, y, 'type_C');
	}
	else if(target_function == 'cancel')
	{
		//alert('Cancel');
		remove_manual();
	}
	else
	{
		remove_manual();
		console.log('error in function game/panel/display.js->select_army_type(e)');
	}
}

var army_type = '';
function display_manual(x, y, type)
{
	//var pos_x = e.target.getAttribute('x');
	//var pos_y = e.target.getAttribute('y');

	var pos_x = x;
	var pos_y = y;

	var hexagon = document.getElementsByClassName('hexagon');

	if(pos_y % 2 == 0)//odd
	{
		for(var i = 0; i < hexagon.length; i++)
		{
			if(hexagon[i].getAttribute('x') == pos_x && hexagon[i].getAttribute('y') == parseInt(pos_y) - 1)
			{
				//must add the attribute 'function' befor change the class name, other with hexagon[i] will be the next hexagon
				hexagon[i].setAttribute('function', 'attack');
				hexagon[i].innerHTML = 'Attack';
				hexagon[i].setAttribute('type', 'slidein');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_3, false);
				hexagon[i].addEventListener('mouseover', end_slidein, false);
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
			else if(hexagon[i].getAttribute('x') == parseInt(pos_x) + 1 && hexagon[i].getAttribute('y') == pos_y)
			{
				hexagon[i].setAttribute('function', 'move');
				hexagon[i].innerHTML = 'Move';
				hexagon[i].setAttribute('type', 'slidein');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_3, false);
				hexagon[i].addEventListener('mouseover', end_slidein, false);
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
			else if(hexagon[i].getAttribute('x') == pos_x && hexagon[i].getAttribute('y') == parseInt(pos_y) + 1)
			{
				hexagon[i].setAttribute('function', 'defence');
				hexagon[i].innerHTML = 'Defence';
				hexagon[i].setAttribute('type', 'slidein');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_3, false);
				hexagon[i].addEventListener('mouseover', end_slidein, false);
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
			else if(hexagon[i].getAttribute('x') == pos_x && hexagon[i].getAttribute('y') == pos_y)
			{
				hexagon[i].setAttribute('function', 'back');
				hexagon[i].innerHTML = 'Back';
				hexagon[i].style.opacity = '1.0';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_3, false);
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
				hexagon[i].innerHTML = 'Attack';
				hexagon[i].setAttribute('type', 'slidein');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_3, false);
				hexagon[i].addEventListener('mouseover', end_slidein, false);
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
			else if(hexagon[i].getAttribute('x') == parseInt(pos_x) + 1 && hexagon[i].getAttribute('y') == pos_y)
			{
				hexagon[i].setAttribute('function', 'move');
				hexagon[i].innerHTML = 'Move';
				hexagon[i].setAttribute('type', 'slidein');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_3, false);
				hexagon[i].addEventListener('mouseover', end_slidein, false);
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
			else if(hexagon[i].getAttribute('x') == parseInt(pos_x) + 1 && hexagon[i].getAttribute('y') == parseInt(pos_y) + 1)
			{
				hexagon[i].setAttribute('function', 'defence');
				hexagon[i].innerHTML = 'Defence';
				hexagon[i].setAttribute('type', 'slidein');
				hexagon[i].style.opacity = '1.0';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_3, false);
				hexagon[i].addEventListener('mouseover', end_slidein, false);
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
			else if(hexagon[i].getAttribute('x') == pos_x && hexagon[i].getAttribute('y') == pos_y)
			{
				hexagon[i].setAttribute('function', 'back');
				hexagon[i].innerHTML = 'Back';
				hexagon[i].style.opacity = '1.0';
				hexagon[i].removeEventListener('mousedown', mousedown_1, false);
				hexagon[i].removeEventListener('mouseup', mouseup_1, false);
				hexagon[i].addEventListener('mousedown', mousedown_3, false);
				hexagon[i].setAttribute('class', 'manual');
				i--;
			}
		}
	}

	army_type = type; 
	console.log(pos_x, pos_y, type);
}

function select_manual(e)
{
	e.target.removeEventListener('mousedown', mousedown_3, false);
	e.target.removeEventListener('mouseup', mouseup_3, false);

	var target_function = e.target.getAttribute('function');

	if(target_function == 'attack')
	{
		alert(army_type + ': Attack');
		remove_manual();
	}
	else if(target_function == 'move')
	{
		alert(army_type + ': Move');
		remove_manual();
	}
	else if(target_function == 'defence')
	{
		alert(army_type + ': Defence');
		remove_manual();
	}
	else if(target_function == 'back')
	{
		remove_manual();
		display_army_type(e);
	}
	else
	{
		remove_manual();
		console.log('error in function game/panel/display.js->select_manual(e)');
	}
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
		manual[0].removeEventListener('mousedown', mousedown_1, false);
		manual[0].removeEventListener('mousedown', mousedown_2, false);
		manual[0].removeEventListener('mousedown', mousedown_3, false);
		manual[0].removeEventListener('mouseup', mouseup_1, false);
		manual[0].removeEventListener('mouseup', mouseup_2, false);
		manual[0].removeEventListener('mouseup', mouseup_3, false);
		manual[0].addEventListener('mousedown', mousedown_1, false);
		manual[0].setAttribute('class', 'hexagon');
	}
}

function display_hexagon_info(e)
{
	var pos_x = e.target.getAttribute('x');
	var pos_y = e.target.getAttribute('y');

	var hexagon_info = document.getElementById('hexagon_info');
	hexagon_info.innerHTML = 'x = ' + pos_x + '; y = ' + pos_y;
}
/***********************************/

function resize()
{
	document.getElementById('display').style.width = parseInt(window.innerWidth) - 20 + 'px';
	document.getElementById('display').style.height = parseInt(window.innerHeight) - 20 + 'px';
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
		hexagon[i].setAttribute('type', 'none');
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
	resize();
	window.addEventListener('resize', window_resize, false);
	window.addEventListener('keydown', key_down, false);
	window.addEventListener('keyup', key_up, false)
}

window.addEventListener('load', init, false);