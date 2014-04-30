<!DOCTYPE HTML>
<html>
<head>
	<title> Reinitilization of the WebCivilazation</title>
	<link rel="stylesheet" type="text/css" href="../main.css">
</head>
<body>
<?php
	#This is a file to reinitilze the whole application
	/*
	It will
	1. Drop all the table
	2. Generate all the tables (Accroding to the db_design)
	*/
	require_once("../lib/db.php");
	if(mysqli_connect_errno())
	{
		echo "<p>Failed to connect to MySQL server: ".mysqli_connect_error()."</p>";
		show_db_php();
	}

	$SQL_DROP_User = "DROP TABLE User";
	$SQL_DROP_Cookie = "DROP TABLE Cookie";
	$SQL_DROP_Game = "DROP TABLE Game";
	
	$SQL_CREATE_User = "CREATE TABLE User";
	$SQL_CREATE_User .= "(user_id INT PRIMARY KEY,";
	$SQL_CREATE_User .= "username CHAR(32),";
	$SQL_CREATE_User .= "password CHAR(32))";
	
	$SQL_CREATE_Cookie = "CREATE TABLE Cookie";
	$SQL_CREATE_Cookie .= "(cookie CHAR(32) PRIMARY KEY,";
	$SQL_CREATE_Cookie .= "user_id CHAR(32),";
	$SQL_CREATE_Cookie .= "FOREIGN KEY (user_id) REFERENCES User(user_id))";


	$SQL_CREATE_Game = "CREATE TABLE Game";
	$SQL_CREATE_Game .= "(Game_id INT PRIMARY KEY,";
	$SQL_CREATE_Game .= "P1 CHAR(32),P2 CHAR(32), P3 CHAR(32),";
	$SQL_CREATE_Game .= "FOREIGN KEY(P1) REFERENCES User(user_id),";
	$SQL_CREATE_Game .= "FOREIGN KEY(P2) REFERENCES User(user_id),";
	$SQL_CREATE_Game .= "FOREIGN KEY(P3) REFERENCES User(user_id))";
	
	db_drop_table($db,$SQL_DROP_Game,"Game");
	db_drop_table($db,$SQL_DROP_Cookie,"Cookie");
	db_drop_table($db,$SQL_DROP_User,"User");

	db_create_table($db,$SQL_CREATE_User,"User");
	db_create_table($db,$SQL_CREATE_Cookie,"Cookie");
	db_create_table($db,$SQL_CREATE_Game,"Game");

	$SQL_INSERT_ADMIN = "INSERT INTO User VALUES (0,'admin','admin')";
	mysqli_query($db,$SQL_INSERT_ADMIN);
	
	mysqli_close($db);
?>
</body>
</html>
