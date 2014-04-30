<!DOCTYPE HTML>
<html>
<head>
	<title>Login</title>
	<script type="text/javascript" src="login/login.js"></script>
</head>
<body style="font-family:verdana, sans-serif;">
<h2>Login</h2>
<?php
	#Check for cookie,
	# if cookie exist and correct, auto redirect to room selection
	#otherwise
	$html_content = <<<EOD
EOD;
	echo $html_content;
?>
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
		<td><button type="button">Login</button></td>
		</tr>
	</table>
	<a href="register.html">click to register</a>
</body>
</html>

