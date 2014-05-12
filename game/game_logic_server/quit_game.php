<?php
	$APP_ROOT = $_ENV["OPENSHIFT_REPO_DIR"];
	require_once($APP_ROOT."lib/db.php");
	$user_id = $_COOKIE["CURRENT_USER"];
	$game_id = $_COOKIE["IN_GAME"];

	$SQL_GET_ALL_PLAYER = "SELECT P1, P2, P3 FROM Game WHERE game_id = $game_id";
	$result = mysqli_query($db,$SQL_GET_ALL_PLAYER);
	$row = mysqli_fetch_row($result);
	$SQL_SET_PLAYER_NULL = "";
	if($row[0] == $user_id && $row[0] != null)
		$SQL_SET_PLAYER_NULL = "UPDATE Game SET P1 = NULL WHERE game_id = $game_id";
	if($row[1] == $user_id && $row[1] != null)
		$SQL_SET_PLAYER_NULL = "UPDATE Game SET P2 = NULL WHERE game_id = $game_id";
	if($row[2] == $user_id && $row[2] != null)
		$SQL_SET_PLAYER_NULL = "UPDATE Game SET P3 = NULL WHERE game_id = $game_id";
	if(!mysqli_query($db,$SQL_SET_PLAYER_NULL))
		echo mysqli_error($db);
?>
