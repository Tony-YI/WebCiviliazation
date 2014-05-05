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
		$SQL_CREATE_ACTIONLIST = sql_create_actionlist($game_id);
		
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
		if(!mysqli_query($con,$SQL_CREATE_ACTIONLIST))
		{
			$response["sql_actionlist_error"] = mysqli_error($con);
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
	//I also set several slots type here!!!! @ Edward
	function randomize_players_start_position($game_id,$con,&$response,$row_num)
	{
		$posNum = range(1,4);
                        $intv = $row_num / 4;
                        shuffle($posNum);
                        $x = range(1,3);// just for build an array, no meaning
                        $y = range(1,3);
                        $goldPx = range(1,3);
                        $goldPy = range(1,3);
                        $woodPx = range(1,3);
                        $woodPy = range(1,3);
                        $intv1 = range(1,$intv);
                        $intv2 = range(20-$intv+1,20);
  
                        $i = 0;
                        while ($i < 3) {
                            switch ($posNum[$i]) {
                                case 1:
                                	shuffle($intv1);
                                    $x[$i] = $intv1[0];
                                    $y[$i] = $intv1[2];                          
                                    $goldPx[$i] = $intv1[2];
                                    $goldPy[$i] = $intv1[1];
                                    $woodPx[$i] = $intv1[1];
                                    $woodPy[$i] = $intv1[0];
                                    break;
                                case 2:
                                	shuffle($intv1);
                                	shuffle($intv2);
                                    $x[$i] = $intv1[0];
                                    $y[$i] = $intv2[0];
                                    $goldPx[$i] = $intv1[1];
                                    $goldPy[$i] = $intv2[1];
                                    $woodPx[$i] = $intv1[2];
                                    $woodPy[$i] = $intv2[2];
                                    break;
                                case 3:
                                	shuffle($intv1);
                                	shuffle($intv2);
                                    $x[$i] = $intv2[0];
                                    $y[$i] = $intv1[0];
                                    $goldPx[$i] = $intv2[1];
                                    $goldPy[$i] = $intv1[1];
                                    $woodPx[$i] = $intv2[1];
                                    $woodPy[$i] = $intv1[1];
                                    break;
                                case 4:
                                	shuffle($intv2);
                                    $x[$i] = $intv2[0];
                                    $y[$i] = $intv2[2];                          
                                    $goldPx[$i] = $intv2[2];
                                    $goldPy[$i] = $intv2[1];
                                    $woodPx[$i] = $intv2[1];
                                    $woodPy[$i] = $intv2[0];
                                    break;
                                default:
                                    break;
                             }
                             $i++;
                        }
                        $i = 0;
                        while($i < 3){
                        	if($woodPx[$i] == $goldPx[$i] && $woodPy[$i] == $goldPy[$i])
                        	{
                        		if($woodPx[$i] == $row_num - 1){
                        			$woodPx[$i]--;
                        		}
                        		else{
                        			$woodPx[$i]++;
                        		}

                        	}
                        	$i++;
                        }
                        
                        $SQL_SELECT_PLAYER = "SELECT P1, P2, P3 FROM Game WHERE game_id = $game_id";
                        $result = mysqli_query($con,$SQL_SELECT_PLAYER);
                        $row = mysqli_fetch_row($result);
                        $p[0] = $row[0];
                        $p[1] = $row[1];
                        $p[2] = $row[2];
                        $SQL_SET_INIT_ARMY = "INSERT INTO game_{$game_id}_armylist VALUES (0,1,$p[0])";
                        mysqli_query($con,$SQL_SET_INIT_ARMY);
                        $SQL_SET_INIT_ARMY = "INSERT INTO game_{$game_id}_armylist VALUES (1,1,$p[1])";
                        mysqli_query($con,$SQL_SET_INIT_ARMY);
                        $SQL_SET_INIT_ARMY = "INSERT INTO game_{$game_id}_armylist VALUES (2,1,$p[2])";
                        mysqli_query($con,$SQL_SET_INIT_ARMY);

                        $SQL_SET_START_POS = "UPDATE game_{$game_id}_slotlist SET slot_type = 5 , slot_owner = $p[0], slot_army = 0 WHERE slot_x = $x[0] AND slot_y = $y[0]";
                        mysqli_query($con,$SQL_SET_START_POS);
                        $SQL_SET_START_POS = "UPDATE game_{$game_id}_slotlist SET slot_type = 5 , slot_owner = $p[1], slot_army = 1 WHERE slot_x = $x[1] AND slot_y = $y[1]";
                        mysqli_query($con,$SQL_SET_START_POS);
                        $SQL_SET_START_POS = "UPDATE game_{$game_id}_slotlist SET slot_type = 5 , slot_owner = $p[2], slot_army = 2 WHERE slot_x = $x[2] AND slot_y = $y[2]";
                        mysqli_query($con,$SQL_SET_START_POS);

                        $SQL_SET_SLOT_TYPE = "UPDATE game_{$game_id}_slotlist SET slot_type = 4 WHERE slot_x = $woodPx[0] AND slot_y = $woodPy[0]";
                        mysqli_query($con,$SQL_SET_SLOT_TYPE);
                        $SQL_SET_SLOT_TYPE = "UPDATE game_{$game_id}_slotlist SET slot_type = 4 WHERE slot_x = $woodPx[1] AND slot_y = $woodPy[1]";
                        mysqli_query($con,$SQL_SET_SLOT_TYPE);
                        $SQL_SET_SLOT_TYPE = "UPDATE game_{$game_id}_slotlist SET slot_type = 4 WHERE slot_x = $woodPx[2] AND slot_y = $woodPy[2]";
                        mysqli_query($con,$SQL_SET_SLOT_TYPE);
                       	$SQL_SET_SLOT_TYPE = "UPDATE game_{$game_id}_slotlist SET slot_type = 3 WHERE slot_x = $goldPx[0] AND slot_y = $goldPy[0]";
                        mysqli_query($con,$SQL_SET_SLOT_TYPE);
                        $SQL_SET_SLOT_TYPE = "UPDATE game_{$game_id}_slotlist SET slot_type = 3 WHERE slot_x = $goldPx[1] AND slot_y = $goldPy[1]";
                        mysqli_query($con,$SQL_SET_SLOT_TYPE);
                        $SQL_SET_SLOT_TYPE = "UPDATE game_{$game_id}_slotlist SET slot_type = 3 WHERE slot_x = $goldPx[2] AND slot_y = $goldPy[2]";
                        mysqli_query($con,$SQL_SET_SLOT_TYPE);

                        $response['player1Ini'] = "($x[0],$y[0])";
                        $response['player2Ini'] = "($x[1],$y[1])";
                        $response['player3Ini'] = "($x[2],$y[2])";
                        $response['Gold'] = "($goldPx[0], $goldPy[0]) , ($goldPx[1], $goldPy[1]) , ($goldPx[2], $goldPy[2])";
                        $response['Wood'] = "($woodPx[0], $woodPy[0]) , ($woodPx[1], $woodPy[1]) , ($woodPx[2], $woodPy[2])";
	}

	//This function will randomly set some (5-10) special slots on the maps
	//For the types of slots, please refer to setting/Slottype 
	function randomize_special_slots($game_id,$con,&$response,$row_num)
	{
		//I know it is a stupid method to generate an array!!! @Edward
		$goldPx = range(1,6);
		$goldPy = range(1,6);
		$woodPx = range(1,6);
		$woodPy = range(1,6);
		$intv = $row_num / 4;
		$intv1 = range(1,$intv);
		$intv2 = range($intv+1, $row_num - $intv);
		$intv3 = range($intv+2, $row_num - $intv);
		$intv4 = range($row_num - $intv+1,$row_num - 1);
		$intv5 = range($row_num - $intv+2,$row_num - 1);
		$response['intervals'] = $intv5;
		$i = 0;
		while($i < 6){
			switch ($i) 
			{
				case 0:
					shuffle($intv1);
					shuffle($intv2);
					$goldPx[$i] = $intv1[0];
					$goldPy[$i] = $intv2[0];
					$woodPx[$i] = $intv1[1];
					$woodPy[$i] = $intv2[1];
					break;
				case 1:
					shuffle($intv1);
					shuffle($intv3);
					$goldPx[$i] = $intv3[0];
					$goldPy[$i] = $intv1[0];
					$woodPx[$i] = $intv3[1];
					$woodPy[$i] = $intv1[1];
					break;
				case 2:
					shuffle($intv2);
					shuffle($intv3);
					$goldPx[$i] = $intv3[0];
					$goldPy[$i] = $intv2[0];
					$woodPx[$i] = $intv3[1];
					$woodPy[$i] = $intv2[1];
				break;
				case 3:
					shuffle($intv2);
					shuffle($intv3);
					$goldPx[$i] = $intv3[0];
					$goldPy[$i] = $intv2[0];
					$woodPx[$i] = $intv3[1];
					$woodPy[$i] = $intv2[1];
				break;
				case 4:
					shuffle($intv3);
					shuffle($intv4);
					$goldPx[$i] = $intv3[0];
					$goldPy[$i] = $intv4[0];
					$woodPx[$i] = $intv3[1];
					$woodPy[$i] = $intv4[1];
				break;
				case 5:
					shuffle($intv2);
					shuffle($intv5);
					$goldPx[$i] = $intv5[0];
					$goldPy[$i] = $intv2[0];
					$woodPx[$i] = $intv5[1];
					$woodPy[$i] = $intv2[1];
				break;
				default:
	                        		
				break;
			}
			$i++;
		}
		$i = 0;
		while($i < 6){
			if( ($woodPx[2] == $woodPx[3] && $woodPy[2] == $woodPy[3]) || ($woodPx[2] == $goldPx[3] && $woodPy[2] == $goldPy[3]) ){
				$woodPx[2]++;
			}

			if(($goldPx[2] == $woodPx[3] && $goldPy[2] == $woodPy[3]) || ($goldPx[2] == $goldPx[3] && $goldPy[2] == $goldPy[3])){
				$goldPx[2]++;
			}
			$SQL_SET_SLOT_TYPE = "UPDATE game_{$game_id}_slotlist SET slot_type = 3 WHERE slot_x = $goldPx[$i] AND slot_y = $goldPy[$i]";
			mysqli_query($con,$SQL_SET_SLOT_TYPE);
			$SQL_SET_SLOT_TYPE = "UPDATE game_{$game_id}_slotlist SET slot_type = 4 WHERE slot_x = $woodPx[$i] AND slot_y = $woodPy[$i]";
			mysqli_query($con,$SQL_SET_SLOT_TYPE);
			$i++;
		}
		$response['Gold222'] = "($goldPx[0], $goldPy[0]) , ($goldPx[1], $goldPy[1]) , ($goldPx[2], $goldPy[2]),($goldPx[3], $goldPy[3]),($goldPx[4], $goldPy[4]),($goldPx[5], $goldPy[5])";
		$response['Wood222'] = "($woodPx[0], $woodPy[0]) , ($woodPx[1], $woodPy[1]) , ($woodPx[2], $woodPy[2]), ($woodPx[3], $woodPy[3]), ($woodPx[4], $woodPy[4]), ($woodPx[5], $woodPy[5])";
	}

	function initilize_slots_unused_row($game_id,$con,&$response,$row,$col_num)
	{
                        $table_slotlist = "game_{$game_id}_slotlist";
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