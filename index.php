<!DOCTYPE html>
<html>
<?php
	<?php
		#Check Cookie here
		#if cookie exist, redirect the page
		#else ask the user to login
		$cookie = $_COOKIE['USER_COOKIE'];
		require_once("lib/db.php");
		if(check_cookie($db))
		{
			#redirect to room.php
			echo "<script type=\"text/javascript\">location.href=\"room.php\"</script>";
		}
		else
		{
			#redirect to login.php
			echo "<script type=\"text/javascript\">location.href=\"login.php\"</script>";
		}
	?>
?>
</html>
