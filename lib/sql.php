<?php

//--------------------------------SQL STATEMENT TO INITILIZE THE SYSTEM ------------------------------//
//--------------------------------SQL STATEMENT TO INITILIZE THE SYSTEM ------------------------------//
//--------------------------------SQL STATEMENT TO INITILIZE THE SYSTEM ------------------------------//
//--------------------------------SQL STATEMENT TO INITILIZE THE SYSTEM ------------------------------//
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
	P1 INT, P2 INT, p3 INT,
	game_started INT,
	FOREIGN KEY(P1) REFERENCES User(user_id),
	FOREIGN KEY(P2) REFERENCES User(user_id),
	FOREIGN KEY(P3) REFERENCES User(user_id))
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

//--------------AUTO GENERATION OF SQL STATEMENT OF INITIZLIZATION OF A GAME---------------//
//--------------AUTO GENERATION OF SQL STATEMENT OF INITIZLIZATION OF A GAME---------------//
//--------------AUTO GENERATION OF SQL STATEMENT OF INITIZLIZATION OF A GAME---------------//
//--------------AUTO GENERATION OF SQL STATEMENT OF INITIZLIZATION OF A GAME---------------//
	function sql_create_playerlist($game_id)
	{
		$SQL_CREATE_PLAYERLIST = <<<SQL_STATEMENT
		CREATE TABLE game_{$game_id}_playerlist
		(
			player_id INT PRIMARY KEY,
			player_name CHAR(32),
			player_gold INT,
			player_lumber INT,
			FOREIGN KEY(player_id) REFERENCES User(user_id)
		)
SQL_STATEMENT;
		return $SQL_CREATE_PLAYERLIST;
	}

	function sql_create_armylist($game_id)
	{
		$SQL_CREATE_ARMYLIST = <<<SQL_STATEMENT
		CREATE TABLE game_{$game_id}_armylist
		(
			army_id INT PRIMARY KEY,
			army_type INT,
			owner_id INT,
			FOREIGN KEY(owner_id) REFERENCES game_{$game_id}_playerlist(player_id)
		)
SQL_STATEMENT;
		return $SQL_CREATE_ARMYLIST;
	}


	function sql_create_slotlist($game_id)
	{
		$SQL_CREATE_SLOTLIST = <<<SQL_STATEMENT
		CREATE TABLE game_{$game_id}_slotlist
		(
			slot_id INT PRIMARY KEY,
			slot_owner INT,
			slot_type INT,
			slot_army INT,
			N INT, NW INT, NE INT, W INT, E INT, SW INT, SE INT, S INT,
			FOREIGN KEY(slot_owner) REFERENCES game_{$game_id}_playerlist(player_id),
			FOREIGN KEY(slot_type) REFERENCES Slottype(type_id),
			FOREIGN KEY(slot_army) REFERENCES game_{$game_id}_armylist(army_id),
			FOREIGN KEY(N) REFERENCES game_{$game_id}_slotlist(slot_id),
			FOREIGN KEY(NW) REFERENCES game_{$game_id}_slotlist(slot_id),
			FOREIGN KEY(NE) REFERENCES game_{$game_id}_slotlist(slot_id),
			FOREIGN KEY(W) REFERENCES game_{$game_id}_slotlist(slot_id),
			FOREIGN KEY(E) REFERENCES game_{$game_id}_slotlist(slot_id),
			FOREIGN KEY(SW) REFERENCES game_{$game_id}_slotlist(slot_id),
			FOREIGN KEY(SE) REFERENCES game_{$game_id}_slotlist(slot_id),
			FOREIGN KEY(S) REFERENCES game_{$game_id}_slotlist(slot_id)
		)
SQL_STATEMENT;
		return $SQL_CREATE_SLOTLIST;
	}

?>