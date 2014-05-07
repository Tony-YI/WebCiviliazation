<?php
	#This program will send all the initilization data to the client side
	#for initilization of the game
	/*
		data format should be is JSON
		{
			"p1":{"user_id":"","username":"","gold":"","wood":""},
			"p2":{"user_id":"","username":"","gold":"","wood":""},
			"p3":{"user_id":"","username":"","gold":"","wood":""},
			"slots":[{}
					{}
					{}
					{}]
		}
	*/
	require_once("../../lib/db.php");
	if(!check_cookie($db))
	{
		echo "{\"status\":\"unauthorized user\"}";
		exit;
	}
	$game_id = $_COOKIE["IN_GAME"];
	$user_id = $_COOKIE["CURRENT_USER"];
	$username = $_COOKIE["CURRENT_USERNAME"];
	if(!$game_id || !$user_id || !$username)
	{
		echo<<<JSON_ERROR
		{
			"status":"cookie_error",
			"cookie_error":"lacking necessary cookie"
		}
JSON_ERROR;
		exit;
	}
	$table_playerlist = "game_{$game_id}_playerlist";
	$table_slotlist = "game_{$game_id}_slotlist";
	$table_armylist = "game_{$game_id}_armylist";

	$SQL_GET_PLAYERLIST = "SELECT * FROM game_{$game_id}_playerlist";
	$SQL_GET_SLOTLIST = "SELECT * FROM game_{$game_id}_slotlist";
	$SQL_GET_ARMYLIST = "SELECT * FROM game_{$game_id}_armylist";

	if(!($playerlist_result = mysqli_query($db,$SQL_GET_PLAYERLIST)) || 
		!($slotlist_result = mysqli_query($db,$SQL_GET_SLOTLIST)) || 
		!($armylist_result = mysqli_query($db,$SQL_GET_ARMYLIST)))
	{
		$sql_error = mysqli_error($db);
		echo<<<JSON_ERROR
		{
			"status":"sql_error",
			"sql_error":"$sql_error"
		}
JSON_ERROR;
		exit;
	}
	
	
	//PLAYER INFO
	$count = 0;
	echo "{";
	while($player_row = mysqli_fetch_row($playerlist_result))
	{
		$player_id = $player_row[0];
		$player_name = $player_row[1];
		$player_gold = $player_row[2];
		$player_wood = $player_row[3];
		$player_status = $player_row[4];
		$player_turn = $player_row[5];
		$count++;
		echo "\"p$count\":";
		echo "{\"user_id\":\"$player_id\",";
		echo "\"username\":\"$player_name\",";
		echo "\"gold\":\"$player_gold\",";
		echo "\"wood\":\"$player_wood\",";
		echo "\"status\":\"$player_status\",";
		echo "\"turn\":\"$player_turn\"},";
	}

	//SLOT INFO
	$count = 0;
	$slot_num = mysqli_num_rows($slotlist_result);
	echo "\"slot_query\":\"$SQL_GET_SLOTLIST\",";
	echo "\"slot_num\":\"$slot_num\",";
	echo "\"slots\":[";
	for($count = 0;$count < $slot_num;$count++)
	{
		$slot_row = mysqli_fetch_row($slotlist_result);
		$slot_x = $slot_row[0];
		$slot_y = $slot_row[1];
		$slot_owner = $slot_row[2];
		$slot_type = $slot_row[3];
		$slot_army = $slot_row[4];
		echo "{";
		echo "\"slot_x\":\"$slot_x\",";
		echo "\"slot_y\":\"$slot_y\",";
		echo "\"slot_owner\":\"$slot_owner\",";
		echo "\"slot_type\":\"$slot_type\",";
		echo "\"slot_army\":\"$slot_army\"}";
		if(($count + 1) < $slot_num)
			echo ",";
		else
			echo "],";
	}

	$army_num = mysqli_num_rows($armylist_result);
	echo "\"army_num\":\"$army_num\",";

	echo "\"army\":[";
	for($count = 0;$count < $army_num;$count++)
	{
		$army_row = mysqli_fetch_row($armylist_result);
		echo "{\"army_id\":\"$army_row[0]\",";
		echo "\"army_type\":\"$army_row[1]\",";
		echo "\"owner_id\":\"$army_row[2]\"}";
		if($count + 1 < $army_num)
			echo ",";
		else 
			echo "]";
	}	
	echo "}";
?>
