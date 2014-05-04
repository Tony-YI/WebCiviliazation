<?php
	/*
	This file will handle the user's request to join an existing room
	If the user is the last one to join the game, the game shall start 
	immediately.
	And the game database should get initilzed here.

	Example:
		slots table for game_id = 1
		"CREATE TABLE slots_1...."
		"CREATE TABLE players_1...."
	*/
	require_once("../lib/db.php");
	$response = "";
	if(check_cookie($db))
	{
		//If the cookie exists
		$user_id = $_SERVER['HTTP_USERID'];
		$room_id = $_SERVER['HTTP_ROOMID'];
		
		$SQL_CHECK_ROOM = "SELECT * FROM Game WHERE Game_id = '$room_id'";
		$result = mysqli_query($db, $SQL_CHECK_ROOM);
		if(mysqli_num_rows($result) == 0)
		{
			$response['status'] = 'failed';
			$response['error'] = 'room not exist';
		}
		
		$SQL_CHECK_FULL = "SELECT P1, P2, P3 FROM Game WHERE Game_id = '$room_id'";
		$result = mysqli_query($db, $SQL_CHECK_FULL);
		$seat = mysqli_fetch_row($result);
		if($seat[0] && $seat[1] && $seat[2])
		{
			$response['status'] = 'failed';
			$response['error'] = 'room full';
		}
		
		$SQL_CHECK_USER = "SELECT * FROM Game WHERE P1 = '$user_id' OR P2 = '$user_id' OR P3 = '$user_id'";
		$result = mysqli_query($db, $SQL_CHECK_USER);
		if(mysqli_num_rows($result) != 0)
		{
			$response['status'] = 'failed';
			$response['error'] = 'user not available';
		}
		
		if($response['status'] == "")
		{
			$start_game = 0;
			$response['status'] = 'success';
			$SQL_ROOM_INFO = "SELECT P1, P2, P3 FROM Game WHERE Game_id = '$room_id'";
			$result = mysqli_query($db, $SQL_ROOM_INFO);
			$seat = mysqli_fetch_row($result);
			$SQL_JOIN_ROOM = "";
			if($seat[0] == null)
			{
				$SQL_JOIN_ROOM = "UPDATE Game SET P1 = '$user_id' WHERE Game_id = '$room_id'";
				$response['started'] = 'no';
			}
			else if($seat[1] == null)
			{
				$SQL_JOIN_ROOM = "UPDATE Game SET P2 = '$user_id' WHERE Game_id = '$room_id'";
				$response['started'] = 'no';
			}
			else if($seat[2] == null)
			{
				$SQL_JOIN_ROOM = "UPDATE Game SET P3 = '$user_id' WHERE Game_id = '$room_id'";
				//If the current user is the last one to join, the game, the game shall start
				$start_game = 1;
				$response['started'] = 'yes';
			}
			mysqli_query($db, $SQL_JOIN_ROOM);
			if($start_game)
			{
				start_game_on_server($room_id,$db,$response);
			}
		}
	}
	else
	{
		$response['status'] = 'failed';
	}
	$response = json_encode($response);
	echo $response;


	//This function will initilize the game database
	/*
	!!Naming Example!!

	game_1_playerlist
	1. Game_id Player list
	| player_id (REFERENCE User.user_id)| player_name (REFERENCE User.username) | player_gold | player_lumber |
	
	game_1_slotlist
	2. Slot list
	| slot_x | slot_y | slot_owner | slot_army | slot_type |
	
	game_1_armylist
	3. Army list
	| army_id | owner | army_type |
	
	*/
	function start_game_on_server($game_id,$con,&$response)
	{
		create_new_game_table($game_id,$con,$response);
		initilze_new_game_database($game_id,$con,$response);
	}

	function create_new_game_table($game_id,$con,&$response)
	{
		//Make the game start in TABLE Game
		$SQL_START_GAME = "UPDATE Game SET game_started = 1 WHERE `game_id` = $game_id ";
		if(!mysqli_query($con,$SQL_START_GAME))
		{
			$sql_error = mysqli_error($con);
		}
		//
		require_once("../lib/sql.php");
		
		$SQL_CREATE_PLAYERLIST = sql_create_playerlist($game_id);
		$SQL_CREATE_ARMYLIST = sql_create_armylist($game_id);
		$SQL_CREATE_SLOTLIST = sql_create_slotlist($game_id);
		
		if(!mysqli_query($con,$SQL_CREATE_PLAYERLIST))
		{
			$response["sql_playerlist_error"] = mysqli_error($con);
		}
		if(!mysqli_query($con,$SQL_CREATE_ARMYLIST))
		{
			$response["sql_armylist_error"] = mysqli_error($con);
		}
		if(!mysqli_query($con,$SQL_CREATE_SLOTLIST))
		{
			$response["sql_slotlist_error"] = mysqli_error($con);
		}
	}

	function initilze_new_game_database($game_id,$con,&$response)
	{
		//1. Dealing with the player list
		$SQL_SELECT_PLAYER = "SELECT P1, P2, P3 FROM Game WHERE game_id = $game_id";
		$result = mysqli_query($con,$SQL_SELECT_PLAYER);
		$row = mysqli_fetch_row($result);
		$p[0] = $row[0];
		$p[1] = $row[1];
		$p[2] = $row[2];

		$p_name[0] = mysqli_fetch_row(mysqli_query($con,"SELECT username FROM User WHERE user_id = ".$p[0]))[0];
		$p_name[1] = mysqli_fetch_row(mysqli_query($con,"SELECT username FROM User WHERE user_id = ".$p[1]))[0];
		$p_name[2] = mysqli_fetch_row(mysqli_query($con,"SELECT username FROM User WHERE user_id = ".$p[2]))[0];

		for($count = 0;$count < 3;$count++)
		{
			$SQL_INSERT_playerlist = "INSERT INTO game_{$game_id}_playerlist ";
			$SQL_INSERT_playerlist .= "VALUES (".$p[$count].",";
			$SQL_INSERT_playerlist .= "'".$p_name[$count]."',";
			$SQL_INSERT_playerlist .= "0,0)";
			if(!mysqli_query($con,$SQL_INSERT_playerlist))
				$response["SQL_INSERT_playerlist_$count"] = mysqli_error($con);
		}
		//2. Initilize slots
		$row_num = 20;
		
		//initilize_slots($game_id,$con,$response,$row_num);
		
		return true;
	}

	function initilze_slots($game_id,$con,&$response,$row_num)
	{
		$table_slotlist = "game_{$game_id}_slotlist";
		//only support same row number and same column number for now
		$col_num = $row_num;
		//The first row are unused
		for($count_col = 0;$count_col < $col_num;$count_col++)
		{
			$SQL_INSERT_UNUSED_SLOTS = <<<SQL_STATEMENT
			INSERT INTO $table_slotlist VALUES
			(0,$count_col,NULL,0,NULL)
SQL_STATEMENT;
			#if(!mysqli_query($con,$SQL_INSERT_UNUSED_SLOTS))
			{
				$response["SQL_INSERT_UNUSED_SLOTS"] = $SQL_INSERT_UNUSED_SLOTS.":".mysqli_error($con);
				return false;
			}
		}

		//

		//The last row are unused
		for($count_col = 0;$count_col < $col_num;$count_col++)
		{
			$SQL_INSERT_UNUSED_SLOTS = <<<SQL_STATEMENT
			INSERT INTO $table_slotlist VALUES
			($row_num,$count_col,NULL,0,NULL)
SQL_STATEMENT;
			if(!mysqli_query($con,$SQL_INSERT_UNUSED_SLOTS))
			{
				$response["SQL_INSERT_UNUSED_SLOTS"] .= $SQL_INSERT_UNUSED_SLOTS.":".mysqli_error($con);
				return false;
			}
		}
	}
?>