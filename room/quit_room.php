<?php
 	//This file will handle the user's request to exit an existing room
	require_once("../lib/db.php");
	$response = "";
	if(check_cookie($db))
	{
		//If the cookie exists
		$user_id = $_SERVER['HTTP_USERID'];
		$SQL_CHECK_ROOM = "SELECT *  FROM Game WHERE P1 = '$user_id' OR P2 = '$user_id' OR P3 = '$user_id'";
		$result = mysqli_query($db, $SQL_CHECK_ROOM);
		if(mysqli_num_rows($result) == 0)
		{
			$response['status'] = 'failed';
			$response['error'] = 'Not in any room';
		}
		else if(mysqli_num_rows($result) == 1)
		{
			$temp =  mysqli_fetch_row($result);
			$Game_id = $temp[0];
			$game_started = $temp[4];
			if($game_started == 1)
			{

				$response['started'] = $game_started;
				$response['status'] = 'failed';
				$response['error'] = 'Game has been started';
			}
			else
			{
				$SQL_QUIT_ROOM = "";
				if($temp[1] == $user_id)
				{
					$SQL_QUIT_ROOM = "UPDATE Game SET P1 = NUll WHERE Game_id = '$Game_id'";
					$response['status'] = 'failed';
				}
				else if($temp[2] == $user_id)
				{
					$SQL_QUIT_ROOM = "UPDATE Game SET P2 = NUll WHERE Game_id = '$Game_id'";
					$response['status'] = 'failed';
				}
				else if($temp[3] == $user_id)
				{
					$SQL_QUIT_ROOM = "UPDATE Game SET P3 = NUll WHERE Game_id = '$Game_id'";
					$response['status'] = 'failed';
				}
				else
				{
					$response['status'] = 'failed';
					$response['error'] = 'Not in any room';
				}
				if($response['status'] == 'success')
				{
					mysqli_query($db, $SQL_QUIT_ROOM);
					$SQL_CHECK_ROOM_EMPTY = "SELECT P1, P2, P3  FROM Game WHERE Game_id = '$Game_id'";
					$r = mysqli_query($db, $SQL_CHECK_ROOM_EMPTY);
					$t = mysqli_fetch_row($r);
					if($t[0] == null && $t[1] == null && $t[2] == null)
					{
						$SQL_DELETE_ROOM = "DELETE FROM Game WHERE Game_id = '$Game_id'";
						mysqli_query($db, $SQL_DELETE_ROOM);
						$response['msg'] = 'Room deleted';
					}
					else
					{
						$response['msg'] = 'Room not deleted';
					}
				}
			}
			$response['Game_id'] = $Game_id;
			
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