<?php
	//This file will handle the turn result submiitted by the player
	require_once("../../lib/db.php");
	$user_id = $_COOKIE["CURRENT_USER"];
	$game_id = $_COOKIE["IN_GAME"];

	if(!check_cookie($db))
	{
		echo "{\"status\":\"error\",";
		echo "\"error_detail\":\"user not holding valid cookie\"}";
	}
	/*Handling surrender*/
	if($_SERVER["HTTP_TYPE"] == "SURRENDER")
	{
		$SQL_UPDATE_SURRENDER = "UPDATE game_{$game_id}_playerlist SET player_status = 2 WHERE player_id = $user_id";
		if(!mysqli_query($db,$SQL_UPDATE_SURRENDER))
		{
			$sql_error = mysqli_error($db);
			echo "{\"status\":\"error\",";
			echo "\"sql_error\":\"$sql_error\"}";
		}
		else
		{
			echo "{\"status\":\"success\",";
			echo "\"result\":\"surrender\"}";
		}
		exit;
	}


	if($_SERVER["HTTP_TYPE"] == "RESULT_LIST")
	{
		$entityBody = file_get_contents('php://input');
		echo $entityBody."\n";
		$request = json_decode($entityBody);
		//$result_list = $request[0];
		$result_list_by_str = $request["result_list"];
		echo var_dump($request[0])."\n";
		//echo var_dump($result_list)."\n";
		echo var_dump($result_list_by_str)."\n";
	}
?>
