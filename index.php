<!DOCTYPE html>
<html>
<link rel="stylesheet" type="text/css" href="test.css">
<script type="text/javascript" src="test.js"></script>
	
	<?php
		#Check Cookie here
		#if cookie exist, redirect the page
		#else ask the user to login
		/*$cookie = $_COOKIE['USER_COOKIE'];
		require_once("lib/db.php");
		if(check_cookie($db))
		{
			#redirect to room.php
			echo "<script type=\"text/javascript\">location.href=\"room.php\"</script>";
		}
		else
		{
			#redirect to login.php
			echo "<script type=\"text/javascript\">location.href=\"./login/login.php\"</script>";
		}*/
	?>
	
	
	<input type="button" id="button" value="Click"/>
	<div id="box" class="box" onclick="onclick1()"><img src="images/cut3.png" id="img1"></div>

</html>
