<?php
#This file will handle the player's query about whether it's his/her turn
	require_once("../../lib/db.php");
	require_once("lib.php");
	$user_id = $_COOKIE["CURRENT_USER"];
	$game_id = $_COOKIE["IN_GAME"];

	$max_result_id = $_SERVER["HTTP_MAX_RESULT_ID"];
	$max_occupationrecord_id = $_SERVER["HTTP_MAX_OCCUPATIONRECORD_ID"];

	if(!check_cookie($db))
	{
		echo "{\"status\":\"error\",";
		echo "\"error_detail\":\"no_valid_cookie\"}";
		exit;
	}
	//check if the game is ended
	if(($game_end = game_is_over($db,$game_id)))
	{
		//if so, get the winner's player id
		$SQL_SELECT_WINNER = "SELECT player_id FROM game_{$game_id}_playerlist WHERE player_status != 2";
		$result = mysqli_query($SQL_SELECT_WINNER);
		$row = mysqli_fetch_row($result);
		//get the maximum result id
		$SQL_QUERY_MAX_RESULT_ID = "SELECT MAX(result_id) FROM game_{$game_id}_resultlist";
		$tmp_result = mysqli_query($db,$SQL_QUERY_MAX_RESULT_ID);
		$tmp_row = mysqli_fetch_row($tmp_result);
		$new_result_id = (int) $tmp_row[0] + 1;

		//insert the win result into the result list
		$SQL_INSERT_WIN_RESULT = "INSERT INTO game_{$game_id}_resultlist (result_id,action_type,player_id) VALUES ($new_result_id,'win',$row[0])";
		mysqli_query($SQL_INSERT_WIN_RESULT);
	}

	$SQL_GET_ACTIVE_PLAYER = "SELECT * FROM game_{$game_id}_playerlist WHERE player_turn = 1";
	$result = mysqli_query($db,$SQL_GET_ACTIVE_PLAYER);
	$row = mysqli_fetch_row($result);
	echo "{";
	echo "\"game_end\":\"$game_end\"";
	echo ",\"active_player\":\"$row[0]\"";
	echo ",\"player_gold\":\"$row[2]\"";
	echo ",\"player_wood\":\"$row[3]\"";

	/*show result list here*/
	$SQL_GET_RESULT_LIST = "SELECT * FROM game_{$game_id}_resultlist WHERE result_id > $max_result_id";
	echo ",\"sql_statement_used\":\"$SQL_GET_RESULT_LIST\"";
	$result = mysqli_query($db,$SQL_GET_RESULT_LIST);
	$row_num = mysqli_num_rows($result);
	echo ",\"row_num\":\"$row_num\"";
	echo ",\"latest_result_list\":[";

	for($count = 0;$count < $row_num;$count++)
	{
		$row = mysqli_fetch_row($result);
		echo row_to_result_JSON($row);
		if($count + 1 < $row_num)
			echo ",";

	}
	echo "]";

	$SQL_GET_OCCUPATIONRECORD = "SELECT * FROM game_{$game_id}_occupationrecord WHERE id > $max_occupationrecord_id";
	$result = mysqli_query($db,$SQL_GET_OCCUPATIONRECORD);
	$row_num = mysqli_num_rows($result);
	echo ",\"occupation_record_num\":\"$row_num\"";
	echo ",\"occupation_record\":[";
	for($count = 0;$count < $row_num;$count++)
	{
		$row = mysqli_fetch_row($result);
		$id = $row[0];
		$slot_col = $row[1];
		$slot_row = $row[2];
		$prev_owner = $row[3];
		$curr_owner = $row[4];
		echo "{\"id\":\"$id\"";
		echo ",\"slot_col\":\"$slot_col\"";
		echo ",\"slot_row\":\"$slot_row\"";
		echo ",\"prev_owner\":\"$prev_owner\"";
		echo ",\"curr_owner\":\"$curr_owner\"}";
		if($count + 1 < $row_num)
			echo ",";
	}
	echo "]";
	echo "}";
?>
