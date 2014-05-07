function init_help()
{
	document.getElementById('help').innerHTML='<p><h2>Hint</h2><p><p>Use key "i" to invoke/hide information board<p><p>Use key "m" to invoke/hide small map<p><p>Use key "q" to quit game</p><p>Use key "h" to invoke/hide hint board<p>'
}

function key_down(e)
{
	e.stopPropagation();
	e.preventDefault();

	var key = e.keyCode;
	console.log(key);
	if(key == 77 || key == 73 || key == 81 || key == 72) //m, i, q, h
	{
		e.target.addEventListener('keyup', key_up, false);
	}
}

function key_up(e)
{
	var key = e.keyCode;
	if(key == 77) // m
	{
		e.target.removeEventListener('keyup', key_up, false);
		clean_small_map_dot(); //in small_map.js
		if(document.getElementById('small_map').style.display == 'none')
		{
			document.getElementById('small_map').style.display = 'block';
		}
		else
		{
			document.getElementById('small_map').style.display = 'none';
		}
	}
	if(key == 73) // i
	{
		e.target.removeEventListener('keyup', key_up, false);
		if(document.getElementById('info').style.display == 'none')
		{
			document.getElementById('info').style.display = 'block';
		}
		else
		{
			document.getElementById('info').style.display = 'none';
		}
	}
	if(key == 81) // q
	{
		e.target.removeEventListener('keyup', key_up, false);
		alert('quit');
	}
	if(key == 72) // h
	{
		e.target.removeEventListener('keyup', key_up, false);
		if(document.getElementById('help').style.display == 'none')
		{
			document.getElementById('help').style.display = 'block';
		}
		else
		{
			document.getElementById('help').style.display = 'none';
		}
	}
}