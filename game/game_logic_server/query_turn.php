<?php
#This file will handle the player's query about whether it's his/her turn
	require_once("../../lib/db.php");
	require_once("lib.php");
	$user_id = $_COOKIE["CURRENT_USER"];
	$game_id = $_COOKIE["IN_GAME"];

	$max_result_id = $_SERVER["HTTP_MAX_RESULT_ID"];
	if(!check_cookie($db))
	{
		echo "{\"status\":\"error\",";
		echo "\"error_detail\":\"no_valid_cookie\"}";
		exit;
	}
	
	$SQL_GET_ACTIVE_PLAYER = "SELECT player_id FROM game_{$game_id}_playerlist WHERE player_turn = 1";
	$result = mysqli_query($db,$SQL_GET_ACTIVE_PLAYER);
	$row = mysqli_fetch_row($result);

	echo "{\"active_player\":\"$row[0]\"";

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

	$SQL_GET_OCCUPATIONRECORD = "SELECT * FROM game_{$game_id}_occupationrecord";
	$result = mysqli_query($db,$SQL_GET_OCCUPATIONRECORD);
	$row_num = mysqli_num_rows($result);
	echo ",\"occupation_record_num\":\"$row_num\"";
	echo ",\"occupation_record\":[";
	for($count = 0;$count < $row_num;$count++)
	{
		$slot_col = $row[0];
		$slot_row = $row[1];
		$prev_owner = $row[2];
		$curr_owner = $row[3];
		echo "{\"slot_col\":\"$slot_col\"";
		echo ",\"slot_row\":\"$slot_row\"";
		echo ",\"prev_owner\":\"$prev_owner\"";
		echo ",\"curr_owner\":\"$curr_owner\"}";
		if($count + 1 < $row_num)
			echo ",";
	}
	echo "]";
	echo "}";
?>
