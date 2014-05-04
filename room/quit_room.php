<?php
 	//This file will handle the user's request to exit an existing room
	require_once("../lib/db.php");
	$response = "";
	if(check_cookie($db))
	{
		//If the cookie exists
		$user_id = $_SERVER['HTTP_USERID'];
		$SQL_CHECK_ROOM = "SELECT Game_id, game_started  FROM Game WHERE P1 = '$user_id' OR P2 = '$user_id' OR P3 = '$user_id'";
		$result =  mysqli_fetch_row(mysqli_query($db, $SQL_CHECK_ROOM));
		if(mysqli_num_rows($result) == 0)
		{
			$response['status'] = 'failed';
			$response['error'] = 'Not in any room';
		}
		else if(mysqli_num_rows($result) == 1)
		{
			$Game_id = $result[0];
			$game_started = $result[1];
			$response['id'] = $Game_id;
			$response['started'] = $game_started;
		}
		else
		{
			$response['status'] = 'failed';
		}
	}
	else
	{
		$response['status'] = 'failed';
		$response['error'] = 'Invalid cookie';
	}
	$response = json_encode($response);
	echo $response;
?>