<?php
	function IsMyTurn($db,$user_id,$game_id)
	{
		$SQL_GET_PLAYER  = "SELECT `player_turn` FROM game_{$game_id}_playerlist WHERE `player_id` = $user_id";
		$result = mysqli_query($db,$SQL_GET_PLAYER);
		$row = mysqli_fetch_row($result);
		return ($row[0] == 1);
	}

	function nextTurn($db,$game_id)
	{
		$SQL_GET_PLAYER  = "SELECT * FROM game_{$game_id}_playerlist";
		$result = mysqli_query($db,$SQL_GET_PLAYER);
		$rows[0] = mysqli_fetch_row($result);
		$rows[1] = mysqli_fetch_row($result);
		$rows[2] = mysqli_fetch_row($result);
		$SQL_PLAYER_TURN_CANCEL = "";
		$SQL_PLAYER_TURN_ACTIVATE = "";
		for($count = 0;$count < 3;$count++)
		{
			$row = $rows[$count];
			//echo "row[4] $row[4],row[5] $row[5]"."\n";
			//$row[4] is player_status, 0 indicates gaming, 1 indicates win, 2 indicates lose
			//$row[5] is player_turn,0 indicates not his/her turn, 1 indicates his/her turn
			if($row[5] == 1 && $row[4] == 0)
			{
				$SQL_PLAYER_TURN_CANCEL = "UPDATE game_{$game_id}_playerlist SET `player_turn` = 0 WHERE player_id = $row[0]";
				$SQL_PLAYER_TURN_ACTIVATE = "UPDATE game_{$game_id}_playerlist SET `player_turn` = 1";
				//echo "\n".$SQL_PLAYER_TURN_CANCEL."\n";
				//echo "\n".$SQL_PLAYER_TURN_ACTIVATE."\n";
				switch ($count) 
				{
					case '0':
						//player 1 is acting
						if($rows[1][4] == 0)
						{
							//player 2 is in game
							//get player 2 ready
							$tmp_id = $rows[1][0];
						}
						else
						{
							//player 2 is not in game
							$tmp_id = $rows[2][0];
							//get player 3 ready
						}
						break;
					case '1':
						if($rows[2][4] == 0)
						{
							//player 3 is in game
							$tmp_id = $rows[2][0];
							//get player 3 ready
						}
						else
						{
							//player 3 is not in game
							$tmp_id = $rows[0][0];
							//get player 1 ready
						}
						break;
					case '2':
						if($rows[0][4] == 0)
						{
							//player 1 is in game
							$tmp_id = $rows[0][0];
							//get player 1 ready
						}
						else
						{
							//player 1 is not in game
							$tmp_id = $rows[1][0];
							//get player 2 ready
						}
						break;
					default:
						# code...
						break;
				}
				$SQL_PLAYER_TURN_ACTIVATE .= " WHERE `player_id` = $tmp_id";
				Player_get_slots($db,$game_id,$tmp_id);
				Player_get_resource($db,$game_id,$tmp_id);
			}
		}
		//echo "\n".$SQL_PLAYER_TURN_CANCEL."\n";
		//echo "\n".$SQL_PLAYER_TURN_ACTIVATE."\n";
		mysqli_query($db,$SQL_PLAYER_TURN_CANCEL);
		mysqli_query($db,$SQL_PLAYER_TURN_ACTIVATE);
	}
//InterLy please finish this function
//This function will have the player have new resources according to the slots he/she owns
function Player_get_resource($db,$game_id,$player_id)
{
	$SQL_SELECT_GOLD = <<<SQL_STATEMENT
	SELECT *
	FROM game_{$game_id}_slotlist
	WHERE game_{$game_id}_slotlist.slot_owner = $player_id AND game_{$game_id}_slotlist.slot_type = 2
SQL_STATEMENT;
	$SQL_SELECT_GOLD = <<<SQL_STATEMENT
	SELECT *
	FROM game_{$game_id}_slotlist
	WHERE game_{$game_id}_slotlist.slot_owner = $player_id AND game_{$game_id}_slotlist.slot_type = 3
SQL_STATEMENT;
	$SQL_SELECT_CAPITAL = <<<SQL_STATEMENT
	SELECT *
	FROM game_{$game_id}_slotlist
	WHERE game_{$game_id}_slotlist.slot_owner = $player_id AND game_{$game_id}_slotlist.slot_type = 4
SQL_STATEMENT;
	$gold_result = mysqli_query($db,$SQL_SELECT_GOLD);
	$wood_result = mysqli_query($db,$SQL_SELECT_WOOD);
	$capital_result = mysqli_query($db,$SQL_SELECT_CAPITAL);
	$num_gold_slots = mysqli_num_rows($gold_result );
	$num_wood_slots = mysqli_num_rows($wood_result);
	$num_capital_slots = mysqli_num_rows($capital_result);
	$gold_increment = 5 * $num_gold_slots + 20 * $num_capital_slots;
	$wood_increment = 5 * $num_wood_slots + 20 * $num_capital_slots;
	echo 'gold:' . $num_gold_slots . ' ';
	echo 'wood:' . $num_wood_slots . ' ';
	echo 'capital:' . $num_capital_slots . ' ';
	echo 'gold increment:' . $gold_increment . ' ';
	echo 'wood increment:' . $wood_increment. ' ';
}

//This function will check whether player $player_id has successfully occupy new/other's slots
function Player_get_slots($db,$game_id,$player_id)
{
	//detele the previous records
	$SQL_DELETE_OCCUPATION_RECORD = "DELETE FROM game_{$game_id}_occupationresult";

	mysqli_query($db,$SQL_DELETE_OCCUPATION_RECORD);
	//select the slots, where the owner id is not the current army's owner, and the current army's owner is $player_id
	$SQL_SELECT_TARGET = <<<SQL_STATEMENT
	SELECT game_{$game_id}_slotlist.slot_col, game_{$game_id}_slotlist.slot_row, game_{$game_id}_slotlist.slot_owner
	FROM game_{$game_id}_slotlist, game_{$game_id}_armylist
	WHERE game_{$game_id}_slotlist.slot_army = game_{$game_id}_armylist.army_id
	AND game_{$game_id}_armylist.owner_id = $player_id 
	AND ((game_{$game_id}_slotlist.slot_owner != $player_id) OR (game_{$game_id}_slotlist.slot_owner IS NULL))
SQL_STATEMENT;

	echo ",\"sql_statment_for_get_slots\":\"$SQL_SELECT_TARGET\"";
	$result = mysqli_query($db,$SQL_SELECT_TARGET);
	$row_num = mysqli_num_rows($result);

	echo ",\"query_result_num\":\"$row_num\"";
	echo ",\"var_dump\"".var_dump($result);
	while($row = mysqli_fetch_row($result))
	{
		//change the slot owner
		$SQL_CHANGE_OWNER = <<<SQL_STATEMENT
		UPDATE game_{$game_id}_slotlist SET slot_owner = $player_id WHERE slot_col = $row[0] AND slot_row = $row[1]
SQL_STATEMENT;
		mysqli_query($db,$SQL_CHANGE_OWNER);
		//insert into the occupation record
		if($row[2] == NULL)
		{
			$prev_owner = "NULL"
		}
		else
			$prev_owner = $row[2];

		$SQL_INSERT_RECORD = <<<SQL_STATEMENT
		INSERT INTO game_{$game_id}_occupationresult VALUES($row[0],$row[1],$prev_owner,$player_id);
SQL_STATEMENT;
		if(!mysqli_query($db,$SQL_INSERT_RECORD))
		{
			$sql_error = mysqli_error($db);

			echo ",\"row0\":\"$row[0]\"";
			echo ",\"row1\":\"$row[1]\"";
			echo ",\"row2\":\"$row[2]\"";
			echo ",\"sql_insert_record\":\"$SQL_INSERT_RECORD\"";
			echo ",\"sql_insert_record_error\":\"$sql_error\"";
		}
	}

}




	function SQL_generate_insert_result($result,$game_id)
	{
		$result_id = $result["Result_id"];
		$result_action_type = $result["action_type"];
		$result_player_id = $result["player_id"];
		if($result["action_type"] == "attack")
		{
			$army1_id = $result["attacker_id"];
			$army1_rema_hp = $result["attacker_remaining_hp"];
			$army1_prev_hp = $result["attacker_prev_hp"];

			$army2_id = $result["defender_id"];
			$army2_rema_hp = $result["defender_remaining_hp"];
			$army2_prev_hp = $result["defender_prev_hp"];

			$from_x = $result["from_x"];
			$from_y = $result["from_y"];
			$to_x = $result["to_x"];
			$to_y = $result["to_y"];
			$army_type = "NULL";
		}
		else if($result["action_type"] == "move")
		{
			$army1_id = $result["army_id"];
			$army1_rema_hp = "NULL";
			$army1_prev_hp = "NULL";

			$army2_id = "NULL";
			$army2_rema_hp = "NULL";
			$army2_prev_hp = "NULL";

			$from_x = $result["from_x"];
			$from_y = $result["from_y"];
			$to_x = $result["to_x"];
			$to_y = $result["to_y"];
			$army_type = "NULL";
		}
		else if($result["action_type"] == "defend")
		{
			$army1_id = $result["defender_id"];
			$army1_rema_hp = "NULL";
			$army1_prev_hp = "NULL";

			$army2_id = "NULL";
			$army2_rema_hp = "NULL";
			$army2_prev_hp = "NULL";
			$from_x = $result["from_x"];
			$from_y = $result["from_y"];
			$to_x = "NULL";
			$to_y = "NULL";
			$army_type = "NULL";
		}
		else if($result["action_type"] == "build")
		{
			$army1_id = $result["army_id"];
			$army1_rema_hp = "NULL";
			$army1_prev_hp = "NULL";

			$army2_id = "NULL";
			$army2_rema_hp = "NULL";
			$army2_prev_hp = "NULL";
			$from_x = "NULL";
			$from_y = "NULL";
			$to_x = "NULL";
			$to_y = "NULL";
			$army_type = $result["army_type"];
		}
		$SQL_INSERT_RESULT = <<<SQL_STATEMENT
INSERT INTO game_{$game_id}_resultlist 
VALUES($result_id,
	'$result_action_type',
	$result_player_id,
	$army1_id,
	$army2_id,
	$from_x,
	$from_y,
	$to_x,
	$to_y,
	$army1_prev_hp,
	$army1_rema_hp,
	$army2_prev_hp,
	$army2_rema_hp,
	$army_type)
SQL_STATEMENT;

	return $SQL_INSERT_RESULT;
	}

function row_to_result_JSON($row)
{
	$result = "{\"Result_id\":\"$row[0]\"";
	$result .= ",\"action_type\":\"$row[1]\"";
	$result .= ",\"player_id\":\"$row[2]\"";
	if($row[1] == "attack")
	{
		$result .= ",\"attacker_id\":\"$row[3]\"";
		$result .= ",\"defender_id\":\"$row[4]\"";
		$result .= ",\"from_x\":\"$row[5]\"";
		$result .= ",\"from_y\":\"$row[6]\"";
		$result .= ",\"to_x\":\"$row[7]\"";
		$result .= ",\"to_y\":\"$row[8]\"";
		$result .= ",\"attacker_prev_hp\":\"$row[9]\"";
		$result .= ",\"atatcker_remaining_hp\":\"$row[10]\"";
		$result .= ",\"defender_prev_hp\":\"$row[11]\"";
		$result .= ",\"defender_prev_hp\":\"$row[12]\"";
	}
	else if($row[1] == "move")
	{
		$result .= ",\"army_id\":\"$row[3]\"";
		$result .= ",\"from_x\":\"$row[5]\"";
		$result .= ",\"from_y\":\"$row[6]\"";
		$result .= ",\"to_x\":\"$row[7]\"";
		$result .= ",\"to_y\":\"$row[8]\"";
	}
	else if($row[1] == "defend")
	{
		$result .= ",\"defender_id\":\"$row[3]\"";
		$result .= ",\"from_x\":\"$row[5]\"";
		$result .= ",\"from_y\":\"$row[6]\"";
	}
	else if($row[1] == "build")
	{
		$result .= ",\"army_id\":\"$row[3]\"";
		$result .= ",\"army_type\":\"$row[13]\"";
	}
	$result .= "}";
	return $result;
}

?>
