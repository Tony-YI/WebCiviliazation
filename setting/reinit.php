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
	$SQL_DROP_User = "DROP TABLE User";
	$SQL_DROP_Cookie = "DROP TABLE Cookie";
	$SQL_DROP_Game = "DROP TABEL Game";
	
	$SQL_CREATE_User = "CREATE TABLE User";
	$SQL_CREATE_User .= "(user_id CHAR(32) PRIMARY KEY,";
	$SQL_CREATE_User .= "password CHAR(32))";
	
	$SQL_CREATE_Cookie = "CREATE TABLE Cookie";
	$SQL_CREATE_Cookie .= "(cookie CHAR(32) PRIMARY KEY,";
	$SQL_CREATE_Cookie .= "user_id CHAR(32) REFERENCE User.user_id)";


	$SQL_CREATE_Game = "CREATE TABLE Game";
	$SQL_CREATE_Game = "(Game_id INT PRIMARY KEY)";
	
	db_drop_table($db,$SQL_DROP_User,"User");
	db_drop_table($db,$SQL_DROP_Cookie,"Cookie");
	db_drop_table($db,$SQL_DROP_Game,"Game");

	db_create_table($db,$SQL_CREATE_User,"User");
	db_create_table($db,$SQL_CREATE_Cookie,"Cookie");
	db_create_table($db,$SQL_CREATE_Game,"Game");
?>
</body>
</html>
