/*
	This file is for  functions that help implements the login functionality
*/

function login()
{
	var usr = document.getElementById("username").value;
	var pwd = document.getElementById("password").value;
	if(!usr)
	{
		alert("Empty user name is not allowed !");
		return false;
	}
	if(!pwd)
	{
		alert("Empty password is not allowed !");
		return false;
	}	
	console.log(usr);
	console.log(pwd);
	var xhr = new XMLHttpRequest();
	xhr.open("POST","login/auth.php",false);
	xhr.setRequestHeader('username',usr);
	xhr.setRequestHeader('password',pwd);
	xhr.send();
	response = JSON.parse(xhr.responseText);
	if(response.status == "success")
	{
		console.log("Login Success, going to redirect");
		window.location = "room.php";
	}
	else if(response.status =="failed")
	{
		console.log("Login Failed, check password");
	}
}
