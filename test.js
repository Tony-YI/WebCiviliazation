function onclick1()
{
	img1 = document.getElementById('img1');
	img1.style.display="block";
	img1.classList.add('change-size');
            var audio = document.getElementById("attackAudio");
            alert(audio);
            audio.src="../../audio/cut.wmv";
            audio.play();
}




