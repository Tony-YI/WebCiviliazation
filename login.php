<?php
	#Check Cookie here
	#if cookie exist, redirect the page
	$cookie = $_COOKIE['USER_COOKIE'];
	require_once("lib/db.php");
	if(check_cookie($db))
	{
		#redirect to room.html
		header("Location: room.html");
		exit;
	}
?>

<!DOCTYPE HTML>
<html>
<head>
	<title>Login</title>
	<script type="text/javascript" src="login/login.js"></script>
</head>
<body style="font-family:verdana, sans-serif;">
<h2>Login</h2>
<form method=post action="login/auth.php">
	<table cellspacing=5pt cellpadding=10pt style="border:1pt solid #7777ff;">
		<tr>
		<td>User</td>
		<td><input type="text" size=32 id="username"></td>
		</tr>

		<tr>
		<td>Password</td>
		<td><input type="password" size=32 id="password"></td>
		</tr>

		<tr>
		<td><button type="button" onclick="login()">Login</button></td>
		</tr>
	</table>
	<a href="register.html">click to register</a>
</body>
</html>

