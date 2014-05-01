<?php
	#This php will handle the user's request to create a new room
	/*
	1. Check whether the user is already in a room
	2. If not, create a new room
	3. Add the new room information into the database
	4. Reply the user with the execution result of this file
	*/
	require_once("../lib/db.php");
	if(mysqli_connect_errno())
	{
		echo "<p>Failed to connect to MySQL server: ".mysqli_connect_error()."</p>";
		show_db_php();
	}
	$_SERVER["HTTP_USERID"];
	$SQL_INSPECT_GAMES = "SELECT * FROM Game ORDER BY Game_id ASC";
?>
