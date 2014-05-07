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
			$SQL_INSERT_STATEMENT = SQL_generate_insert_result($result,$game_id);
			echo $SQL_INSERT_STATEMENT."\n";
			if(!mysqli_query($db,$SQL_INSERT_STATEMENT))
			echo "\n".mysqli_error($db)."\n";

			if($result["action_type"] == "move")
			{
				echo "\n"."editing move for database"."\n";
				$army_id = $result["army_id"];
				$from_x = $result["from_x"];
				$from_y = $result["from_y"];
				$to_x = $result["to_x"];
				$to_y = $result["to_y"];

				$SQL_REMOVE_ARMY_OF_SLOT = "UPDATE game_{$game_id}_slotlist SET slot_army = NULL WHERE slot_col = $from_x AND slot_row = $from_y";
				$SQL_ADD_ARMY_OF_SLOT = "UPDATE game_{$game_id}_slotlist SET slot_army = $army_id WHERE slot_col = $to_x AND slot_row = $to_y";
				echo "\"sql_statement\":\"$SQL_REMOVE_ARMY_OF_SLOT\"";
				echo "\"sql_statement\":\"$SQL_ADD_ARMY_OF_SLOT\"";
				if(!mysqli_query($db,$SQL_REMOVE_ARMY_OF_SLOT))
					echo "\n".mysqli_error();
				
				if(!mysqli_query($db,$SQL_ADD_ARMY_OF_SLOT))
					echo "\n".mysqli_error();
			}
			else
			{
				echo "\"error1\":\"invalid action_type\"";
			}
		}
		nextTurn($db,$game_id);
	}
?>
