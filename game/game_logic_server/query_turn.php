<?php
#This file will handle the player's query about whether it's his/her turn
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

	$SQL_GET_ACTIVE_PLAYER = "SELECT player_id FROM game_{$game_id}_playerlist WHERE player_turn = 1";
	$result = mysqli_query($db,$SQL_GET_ACTIVE_PLAYER);
	$row = mysqli_fetch_row($result);

	echo "{\"active_player\":\"$row[0]\"";

	/*
	show result list here
	*/
	echo "}";
?>
