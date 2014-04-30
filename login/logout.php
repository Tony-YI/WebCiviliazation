<?php
	require_once("../lib/db.php");

	$USER_COOKIE = $_COOKIE["USER_COOKIE"];
	$SQL_COOKIE_QUERY = "SELECT * FROM Cookie WHERE `cookie` = '$USER_COOKIE'";
	if($result = mysqli_query($con,$SQL_COOKIE_QUERY))
	{
		if(mysqli_num_rows($result))
		{
			$row = mysqli_fetch_row($result);
			#|cookie | user_id |
			$usr_id = $row[1];

			setcookie("USER_COOKIE",$USER_COOKIE,time() - 3600,"/");
			setcookie("CURRENT_USER",$usr_id,time() - 3600,"/");
			$SQL_DELETE_COOKIE = "DELETE FROM Cookie WHERE `cookie` = '$USER_COOKIE'";
			echo "{\"status\":\"success\"}";
		}
	}
?>