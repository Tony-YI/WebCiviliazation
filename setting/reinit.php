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
	
	$SQL_CREATE_User = <<<SQL_STATEMENT
	CREATE TABLE User
	(
		user_id INT PRIMARY KEY,
		username CHAR(32),
		password CHAR(32)
	)
SQL_STATEMENT;

	$SQL_CREATE_Cookie = <<<SQL_STATEMENT
	CREATE TABLE Cookie
	(
		cookie CHAR(32) PRIMARY KEY,
		user_id INT,
		FOREIGN KEY (user_id) REFERENCES User(user_id)
	)
SQL_STATEMENT;

	$SQL_CREATE_Game = <<<SQL_STATEMENT
	CREATE TABLE Game
	(game_id INT PRIMARY KEY,
	p1 INT,p2 INT, p3 INT,
	game_started INT,
	FOREIGN KEY(p1) REFERENCES User(user_id),
	FOREIGN KEY(p2) REFERENCES User(user_id),
	FOREIGN KEY(p3) REFERENCES User(user_id))
SQL_STATEMENT;

	$SQL_CREATE_ARMYTYPE = <<<SQL_STATEMENT
	CREATE TABLE Armytype
	(
		type_id INT PRIMARY KEY,
		name CHAR(32),
		MAX_HP INT,
		MAX_AP INT,
		ATTACK INT
	)
SQL_STATEMENT;

	$SQL_CREATE_SLOTTYPE = <<<SQL_STATEMENT
	CREATE TABLE Slottype
	(
		type_id INT PRIMARY KEY,
		gold_production INT,
		lumber_production INT
	)
SQL_STATEMENT;


	db_drop_table($db,$SQL_DROP_Game,"Game");
	db_drop_table($db,$SQL_DROP_Cookie,"Cookie");
	db_drop_table($db,$SQL_DROP_User,"User");

	db_create_table($db,$SQL_CREATE_User,"User");
	db_create_table($db,$SQL_CREATE_Cookie,"Cookie");
	db_create_table($db,$SQL_CREATE_Game,"Game");
	db_create_table($db,$SQL_CREATE_ARMYTYPE,"Armytype");
	db_create_table($db,$SQL_CREATE_SLOTTYPE,"Slottype");

	$SQL_INSERT_ADMIN = "INSERT INTO User VALUES (0,'admin','admin')";
	mysqli_query($db,$SQL_INSERT_ADMIN);
	
	mysqli_close($db);

?>
</body>
</html>
