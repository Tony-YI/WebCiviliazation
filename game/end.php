<?php
	$APP_ROOT = $_ENV["OPENSHIFT_REPO_DIR"];
	require_once($APP_ROOT."lib/db.php");
	require_once($APP_ROOT."game/game_logic_server/lib.php");

	$user_id = $_COOKIE["CURRENT_USER"];
	$game_id = $_COOKIE["IN_GAME"];
	
	if(!check_cookie($db))
	{
		echo "{\"status\":\"error\",";
		echo "\"error_detail\":\"no_valid_cookie\"}";
		exit;
	}

	$SQL_GET_ALL_PLAYER = "SELECT P1, P2, P3 FROM Game WHERE game_id = $game_id";
	$result = mysqli_query($db,$SQL_GET_ALL_PLAYER);
	$row = mysqli_fetch_row($result);
	$SQL_SET_PLAYER_NULL = "";
	if($row[0] == $user_id && $row[0] != null)
		$SQL_SET_PLAYER_NULL = "UPDATE Game SET P1 = NULL WHERE game_id = $game_id";
	if($row[1] == $user_id && $row[1] != null)
		$SQL_SET_PLAYER_NULL = "UPDATE Game SET P2 = NULL WHERE game_id = $game_id";
	if($row[2] == $user_id && $row[2] != null)
		$SQL_SET_PLAYER_NULL = "UPDATE Game SET P3 = NULL WHERE game_id = $game_id";
	if(!mysqli_query($db,$SQL_SET_PLAYER_NULL))
		echo mysqli_error($db);

		echo <<<HTML_CONTENT
<!DOCTYPE html>

<html>
<head>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.js"></script>
	<link rel="stylesheet" type="text/css" href="end.css"/>
    <script type="text/javascript" src="/jquery.cookie.js"></script>
	<script type="text/javascript">
		function delete_game()
		{
			$.removeCookie("IN_GAME");
			window.location.href = "/room.php";
		}
	</script>
</head>
<body>
	<div id = "conv">
	<p>$row_num players have known the game is over</p>
	<p>The game has endded !</p>
	<p>Thank you for playing !</p>
	<button type="button" onclick="delete_game()" id="btn">Click Here to return to room selection</button>
	</div>
</body>
</html>
HTML_CONTENT;
	$SQL_GET_ALL_PLAYER = "SELECT P1, P2, P3 FROM Game WHERE game_id = $game_id";
	$result = mysqli_query($db,$SQL_GET_ALL_PLAYER);
	$row = mysqli_fetch_row($result);
	if($row[0] == null && $row[1] == null && $row[2] == null)
		delete_game($db,$game_id);

?>
