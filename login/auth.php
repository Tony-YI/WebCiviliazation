<?php
	#This file will handle the authentication request from login.php or login.html
	/*
	1. Check the user credential
	2. If the credentials are correct, generate a cookie, set the expired time to +1d
	3. Save the generate cookie into the database
	4. Send the Cookie to the user
	5. Redirect the user to room selection
	*/
	require_once("../lib/db.php");
	if(mysqli_connect_errno())
	{
		echo "<p>Failed to connect to MySQL server: ".mysqli_connect_error()."</p>";
		show_db_php();
	}
	echo "What you submiited is ";
	$user_name = $_SERVER['HTTP_username'];
	$pass_word = $_SERVER['HTTP_password'];
	echo "$user_name, $pass_word";
?>
