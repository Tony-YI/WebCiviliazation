function onclick1()
{
	var img = document.getElementsByClassName('flash')[0];
	alert(img);
	img.style.display = "block";
	img.style.width = "100%";
	img.style.length = "100%";
	img.style.zIndex = "100";
	
}
var button = document.getElementById('button'),
	box = document.getElementById('box'),
	t1,t2;

button.addEventListener('click', function (e) {
	box.classList.add('change-size');
});

