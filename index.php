<!DOCTYPE html>
<html>
<?php
	//redirect to login.php
	//login.php will check whether there exists valid cookies or not
	//if yes, login.php will redirect to room.php
	//else, login.php will ask you to login
	header("Location: ./login.php");
	exit;
?>
</html>
