<?php
	#This file will handle the registration request from register.php
	/*
	1. Auto generate a user id for a user
	2. Check if username is duplicated with registered users 
	3. If so, deny the process and return a message to let user change another username
	4. If not, insert user id, username and password into the db and return corresponding message
	*/
	require_once("../lib/db.php");
	if(mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL server: " . mysqli_connect_error();
		show_db_php();
	}
	$user_name = $_SERVER['HTTP_USERNAME'];
	$pass_word = $_SERVER['HTTP_PASSWORD'];
	$SQL_CHECK_DUPLICATE = "SELECT * FROM `User` WHERE `username` = '$user_name'";
	$result = mysqli_query($db, $SQL_CHECK_DUPLICATE);
	if(mysqli_num_rows($result) != 0)
	{
		echo "User name has already been registered, please change to another user name.";
	}
	else
	{
		$SQL_GET_USER_NUM = "SELECT COUNT(*) FROM `User`";
		$count = mysqli_query($db, $SQL_GET_USER_NUM);
		$user_id = mysqli_fetch_row($count)[0];
		$SQL_INSERT_USER = "INSERT INTO User VALUES ($user_id,'$user_name','$pass_word')";
		mysqli_query($db, $SQL_INSERT_USER);
		echo "Register successfully, you will be redirect to login page in 5 seconds.";
	}
?>
