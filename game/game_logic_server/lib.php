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
			//$row[5] is player_status, 0 indicates gaming, 1 indicates win, 2 indicates lose
			//$row[6] is player_turn,0 indicates not his/her turn, 1 indicates his/her turn
			if($row[6] == 1 && $row[5] == 0)
			{
				$SQL_PLAYER_TURN_CANCEL = "UPDATE game_{$game_id}_playerlist SET `player_turn` = 0 WHERE player_id = $row[0]";
				$SQL_PLAYER_TURN_ACTIVATE = "UPDATE game_{$game_id}_playerlist SET `player_turn` = 1";
				switch ($count) 
				{
					case '0':
						//player 1 is acting
						if($rows[1][5] == 0)
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
						if($rows[2][5] == 0)
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
						if($rows[0][5] == 0)
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
			}
		}
		echo "\n".$SQL_PLAYER_TURN_CANCEL."\n";
		echo "\n".$SQL_PLAYER_TURN_ACTIVATE."\n";
		mysqli_query($db,$SQL_PLAYER_TURN_CANCEL);
		mysqli_query($db,$SQL_PLAYER_TURN_ACTIVATE);
	}
?>