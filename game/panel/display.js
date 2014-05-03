/*
		<div class="new_line"><br/></div>
        <div class="hexagon_begin_odd"></div>
        <div class="hexagon"></div>
        <div class="hexagon"></div>
        <div class="hexagon"></div>
        <div class="hexagon"></div>
        <div class="hexagon"></div>
        <div class="hexagon"></div>
        <div class="hexagon"></div>
        <div class="hexagon"></div>
        <div class="hexagon_last"></div>

        <div class="new_line"><br/></div>   
        <div class="hexagon_begin_even"></div>
        <div class="hexagon"></div>
        <div class="hexagon"></div>
        <div class="hexagon"></div>
        <div class="hexagon"></div>
        <div class="hexagon"></div>
        <div class="hexagon"></div>
        <div class="hexagon"></div>
        <div class="hexagon_last"></div>
*/
function addBoxes()
{
	var new_line = document.createElement('div');
	new_line.setAttribute('class', 'new_line');

	var hexagon_begin_odd = document.createElement('div');
	hexagon_begin_odd.setAttribute('class', 'hexagon_begin_odd');

	var hexagon = document.createElement('div');
	hexagon.setAttribute('class', 'hexagon');

	var hexagon_begin_even = document.createElement('div');
	hexagon_begin_even.setAttribute('class', 'hexagon_begin_even');

	var hexagon_last = document.createElement('div');
	hexagon_last.setAttribute('class', 'hexagon_last');

	var box = document.getElementsByClassName('box');

	document.body.appendChild(new_line);
	document.body.appendChild(hexagon_begin_odd);
	document.body.appendChild(hexagon);
	document.body.appendChild(hexagon_last);

	document.body.appendChild(new_line);
	document.body.appendChild(hexagon_begin_even);
	document.body.appendChild(hexagon);
	document.body.appendChild(hexagon_last);
}

function init(e)
{
	addBoxes();
}

window.addEventListener('load', init, false);