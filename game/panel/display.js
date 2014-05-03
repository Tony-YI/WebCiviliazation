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
	var new_line = document.createElement('div');
	new_line.setAttribute('id', 'new_line');

	var hexagon_begin_odd = document.createElement('div');
	hexagon_begin_odd.setAttribute('id', 'hexagon_begin_odd');

	var hexagon = document.createElement('div');
	hexagon.setAttribute('id', 'hexagon');

	var hexagon_begin_even = document.createElement('div');
	hexagon_begin_even.setAttribute('id', 'hexagon_begin_even');

	var hexagon_last = document.createElement('div');
	hexagon_last.setAttribute('id', 'hexagon_last');

	var box = document.getElementById('box');

	box.appendChild(new_line);
	box.appendChild(hexagon_begin_odd);
	box.appendChild(hexagon);
	box.appendChild(hexagon_last);

	box.appendChild(new_line);
	box.appendChild(hexagon_begin_even);
	box.appendChild(hexagon);
	box.appendChild(hexagon_last);
}

function init(e)
{
	addBoxes();
}

window.addEventListener('load', init, false);