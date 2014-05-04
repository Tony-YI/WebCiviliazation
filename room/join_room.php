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
		
		initilize_slots($game_id,$con,$response,$row_num);
		
		return true;
	}


	function initilize_slots($game_id,$con,&$response,$row_num)
	{
		$table_slotlist = "game_{$game_id}_slotlist";
		//only support same row number and same column number for now
		$col_num = $row_num;
		//The first row are unused
		initilize_slots_unused_row($game_id,$con,$response,0,$col_num);
		//The middle rows
		for($count_row = 1;$count_row < $row_num - 1;$count_row++)
		{	
			for($count_col = 0;$count_col < $col_num;$count_col++)
			{
				//the last and the first of a row is unused
				if($count_col == 0 || $count_col == $col_num - 1)
					$slot_type = 0;
				else
					$slot_type = 1;
				$SQL_INSERT_UNUSED_SLOTS = <<<SQL_STATEMENT
				INSERT INTO $table_slotlist VALUES ($count_row,$count_col,NULL,$slot_type,NULL)
SQL_STATEMENT;
				if(!mysqli_query($con,$SQL_INSERT_UNUSED_SLOTS))
				{
					$response["SQL_INSERT_SLOT_{$count_rpw}_{$count_col}"] = $SQL_INSERT_UNUSED_SLOTS.":".mysqli_error($con);
					return false;
				}
			}
		}
		//The last row are unused
		initilize_slots_unused_row($game_id,$con,$response,$row_num,$col_num);

		randomize_players_start_position($game_id,$con,$response,$row_num);
		randomize_special_slots($game_id,$con,$response,$row_num);
	}

	//This function will randomly set the starting position of each player
	function randomize_players_start_position($game_id,$con,&$response,$row_num)
	{
                            $posNum = range(1,4);
                            shuffle($posNum);
                            $x = range(1,3);
                            $y = range(1,3);
                            $i = 0;
                            while ($i < 3) {
                                switch ($posNum[i]) {
                                    case 1:
                                        $x[$i] = rand(1,5);
                                        $x[$i] = rand(1,5);
                                        break;
                                    case 2:
                                        $x[$i] = rand(1,5);
                                        $y[$i] = rand(16,20);
                                        break;
                                    case 3:
                                        $x[$i] = rand(16,20);
                                        $y[$i] = rand(1,5);
                                        break;
                                    case 4:
                                        $x[$i] = rand(16,20);
                                        $y[$i] = rand(16,20);
                                    default:
                                        break;
                                }
                                $i++;
                            }
                            $response['player1'] = "($x[0],$y[0])";
                            $response['player2'] = "($x[1],$y[1])";
                            $response['player3'] = "($x[2],$y[2])";
	}

	//This function will randomly set some (5-10) special slots on the maps
	//For the types of slots, please refer to setting/Slottype 
	function randomize_special_slots($game_id,$con,&$response,$row_num)
	{

	}

	function initilize_slots_unused_row($game_id,$con,&$response,$row,$col_num)
	{
		for($count_col = 0;$count_col < $col_num;$count_col++)
		{
			$SQL_INSERT_UNUSED_SLOTS = "INSERT INTO $table_slotlist VALUES ($row,$count_col,NULL,0,NULL)";
			if(!mysqli_query($con,$SQL_INSERT_UNUSED_SLOTS))
			{
				$response["SQL_INSERT_UNUSED_SLOTS"] = $SQL_INSERT_UNUSED_SLOTS.":".mysqli_error($con);
				return false;
			}
		}
	}
?>