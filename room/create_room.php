<?php
	#This php will handle the user's request to create a new room
	/*
	1. Check whether the user is already in a room
	2. If not, create a new room
	3. Add the new room information into the database
	4. Reply the user with the execution result of this file
		The execution result format should be 
		example:
		{
			"status":"success",
			"game_id":"1"
		}
	*/
	require_once("../lib/db.php");
	if(mysqli_connect_errno())
	{
		echo "{\"status\":\"CANNOT_ACCESS_MYSQL\"}";
		exit;
	}

	$user_id = $_SERVER["HTTP_USERID"];
	$game_id = 1;
	$prev_game_id = 1;
	$SQL_INSPECT_GAMES = "SELECT * FROM Game ORDER BY game_id ASC";
	$result = mysqli_query($db,$SQL_INSPECT_GAMES);

	//Go though all the game_id and try to find an unused game_id
	while($row = mysqli_fetch_row($result))
	{
		if($game_id < $row[0])
			break;
		else
			$game_id = $game_id + 1;
	}

	$SQL_INSERT_NEW_GAME = "INSERT INTO Game Values ($game_id,$user_id,DEFAULT,DEFAULT,DEFAULT)";

	if(!mysqli_query($db,$SQL_INSERT_NEW_GAME))
	{
		$error_str = mysqli_error($db);
		echo "{\"status\":\"failed\",\"error\":\"$error_str\"}";
	}
	else
	{
		echo "{\"status\":\"success\",\"game_id\":\"$game_id\"}";
	}
?>
