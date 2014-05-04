function init_small_map(e)
{
	//20 x 20 map//
	var slot_num = 484;
	var line_num = 22; //the top/left/bottom/right are useless

	var slot = Array();
	for(var i = 0; i < slot_num; i++)
	{
		slot[i] = document.createElement('div');
		slot[i].setAttribute('class', 'slot');
		var x = i % line_num;
		var y = parseInt(i / line_num);
		slot[i].setAttribute('x', x);
		slot[i].setAttribute('y', y);

		if(x == 0) //start slot
		{
			if(y % 2 == 0) //odd begin slot
			{
				slot[i].style.opacity = '0.0';
			}
			else //even begin slot
			{
				slot[i].style.opacity = '0.0';
			}
		}
		else if (x == line_num - 1) //end slot of one row
		{
			slot[i].style.opacity = '0.0';
		}
	}

	var small_map = document.getElementById('small_map');
	small_map.addEventListener('contextmenu', no_contextmenu, false);

	for(var i = 0; i < line_num; i++)
	{
		for(var j = 0; j < line_num; j++)
		{
			small_map.appendChild(slot[line_num * i + j]);
		}
	}
}

window.addEventListener('load', init_small_map, false);