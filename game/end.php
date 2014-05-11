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

	if(game_is_over($db,$game_id))
	{
		$SQL_VISITED = "UPDATE game_{$game_id}_playerlist SET player_status = 3 WHERE player_id = $user_id";
		mysqli_query($db,$SQL_VISITED);
		$SQL_VISITED_NUM = "SELECT * FROM game_{$game_id}_playerlist WHERE player_status = 3";
		$result = mysqli_query($db,$SQL_VISITED_NUM);
		$row_num = mysqli_num_rows($result);

		echo <<<HTML_CONTENT
<!DOCTYPE html>

<html>
<head>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.js"></script>
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
	<p>$row_num players have known the game is over</p>
	<p>The game has endded !</p>
	<p>Thank you for playing !</p>
	<button type="button" onclick="delete_game()">Click Here to return to room selection</button>
</body>
</html>
HTML_CONTENT;
		if($row_num >= 3)
		delete_game($db,$game_id);
	}
?>
