<?php
	#This file will handle the authentication request from login.php or login.html
	/*
	1. Check the user credential
	2. If the credentials are correct, generate a cookie, set the expired time to +1d
	3. Save the generate cookie into the database
	4. Send the Cookie to the user
	5. Redirect the user to room selection
	*/
	require_once("../lib/db.php");
	if(mysqli_connect_errno())
	{
		echo "<p>Failed to connect to MySQL server: ".mysqli_connect_error()."</p>";
		show_db_php();
	}
	$username = $_SERVER['HTTP_USERNAME'];
	$password = $_SERVER['HTTP_PASSWORD'];
	$SQL_CHECK_CREDENTIAL = "SELECT * FROM `User` WHERE `username` = '$username' AND `password` = '$password'";

	if($result = mysqli_query($db,$SQL_CHECK_CREDENTIAL))
	{
		if(mysqli_num_rows($result))
		{
			#Authentication successful
			$cookie_value = md5($username.((string)rand()));
			
			setcookie("USER_COOKIE",$cookie_value,time() + 3600 * 24,"/");

			$row = mysqli_fetch_row($result);
			setcookie("CURRENT_USER",$row[0],time() + 3600 * 24,"/");
			$SQL_INSERT_COOKIE = "INSERT INTO Cookie VALUES ('$cookie_value',$row[0])";
			
			if(!mysqli_query($db,$SQL_INSERT_COOKIE))
			{
				$SQL_INSERT_ERROR  = mysqli_error($db);
			}
			echo "{\"username\":\"$username\",";
			echo "\"status\":\"success\",";
			echo "\"cookie\":\"$cookie_value\",";
			echo "\"sql_error\":\"$SQL_INSERT_ERROR\"}";
		}
		else
		{
			echo "{\"username\":\"$username\",";
			echo "\"status\":\"failed\",";
			echo "\"cookie\":\"\"}";		
		}
		mysqli_free_result($result);
	}
	else
	{
		echo "{\"username\":\"$username\",";
		echo "\"status\":\"unknown\",";
		echo "\"cookie\":\"\"}";
	}

?>
