<?php
	//This file will handle the turn result submiitted by the player
	require_once("../../lib/db.php");
	require_once("lib.php");
	$user_id = $_COOKIE["CURRENT_USER"];
	$game_id = $_COOKIE["IN_GAME"];

	if(!check_cookie($db))
	{
		echo "{\"status\":\"error\",";
		echo "\"error_detail\":\"no_valid_cookie\"}";
		exit;
	}

	if(!IsMyTurn($db,$user_id,$game_id))
	{
		echo "{\"status\":\"error\",";
		echo "\"error_detail\":\"not_your_turn\"}";
		exit;
	}

	/*Handling surrender*/
	if($_SERVER["HTTP_TYPE"] == "SURRENDER")
	{
		$SQL_UPDATE_SURRENDER = "UPDATE game_{$game_id}_playerlist SET player_status = 2 WHERE player_id = $user_id";
		if(!mysqli_query($db,$SQL_UPDATE_SURRENDER))
		{
			$sql_error = mysqli_error($db);
			echo "{\"status\":\"error\",";
			echo "\"sql_error\":\"$sql_error\"}";
		}
		else
		{
			echo "{\"status\":\"success\",";
			echo "\"result\":\"surrender\"}";
		}
		exit;
	}

	if($_SERVER["HTTP_TYPE"] == "RESULT_LIST")
	{
		$entityBody = file_get_contents('php://input');
		echo $entityBody."\n";
		$request = json_decode($entityBody,TRUE);
		$result_list = $request['result_list'];
		//handling every single result
		foreach ($result_list as $result) 
		{
			/*
			for every single result,
			1. store it into game_{$game_id}_resultlist TABLE,
			2. Modify the accordingly value in the database
			*/
			$SQL_INSERT_STATEMENT = SQL_generate_insert_result($result);
			echo $SQL_INSERT_STATEMENT."\n";
			mysqli_query($db,$SQL_INSERT_STATEMENT);
		}
		nextTurn($db,$game_id);
	}
?>
