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

	if(!$playerlist_result = mysqli_query($db,$SQL_GET_PLAYERLIST) || 
		!$slotlist_result = mysqli_query($db,$SQL_GET_SLOTLIST) || 
		!$armylist_result = mysqli_query($db,$SQL_GET_ARMYLIST))
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
	while($player_row = mysqli_fetch_row($playerlist_result))
	{
		$player_id[$count] = $player_row[0];
		$player_name[$count] = $player_row[1];
		$player_gold[$count] = $player_row[2];
		$player_wood[$count] = $player_row[3];
		$count++;
	}

	echo <<<JSON_PLAYER
	{
		"p1":{"user_id":"$player_id[0]","username":"$player_name[0]","gold":"$player_gold[0]","wood":"$player_wood[0]"},
		"p2":{"user_id":"$player_id[1]","username":"$player_name[1]","gold":"$player_gold[1]","wood":"$player_wood[1]"},
		"p3":{"user_id":"$player_id[2]","username":"$player_name[2]","gold":"$player_gold[2]","wood":"$player_wood[2]"},
JSON_PLAYER;
	
	//SLOT INFO
	$count = 0;
	$slot_num = mysqli_num_rows($slotlist_result);
	echo "\"slot_query:\":\"$SQL_GET_SLOTLIST\",";
	echo "\"slot_num\":\"$slot_num\",";
	echo "\"slot\":[";
	for($count = 0;$count < $slot_num;$count++)
	{
		$slot_row = mysqli_fetch_row($slotlist_result);
		$slot_x = $slot_row[0];
		$slot_y = $slot_row[1];
		$slot_owner = $slot_row[2];
		$slot_type = $slot_row[3];
		$slot_army = $slot_row[4];
		echo <<<JSON_SLOT
		{
			"slot_x":"$slot_x",
			"slot_y":"$slot_y",
			"slot_owner":"$slot_owner",
			"slot_type":"$slot_type",
			"slot_army":"$slot_army"
		}
JSON_SLOT;
		if(($count + 1) < $slot_num)
			echo ",";
		else
			echo "],";
	}

	//TODO:
	//ARMY INFO

	echo "}";
?>
