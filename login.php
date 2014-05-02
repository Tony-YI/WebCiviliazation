<!DOCTYPE HTML>
<html>
<head>
	<title>LogIn</title>
	<link rel="stylesheet" type="text/css" href="login/login.css">
	<script type="text/javascript" src="login/login.js"></script>
</head>

<body>
<h1>Welcome To WebCivilization</h1>

<div class="form">
	<form method=post action="login/auth.php">
		<table cellspacing=5pt cellpadding=10pt>
			<tr>
				<td>User</td>
				<td><input type="text" size=32 id="username"></td>
			</tr>

			<tr>
				<td>Password</td>
				<td><input type="password" size=32 id="password"></td>
			</tr>

			<tr>
				<td><button type="button" onclick="login()"><h4>LogIn</h4></button></td>
			</tr>
		</table>
	</form>
		<a href="register.html">Click To Register</a>
</div>

</body>
</html>

