<?php
	#This file will reply with the correct data about the current existing room
	require_once("../lib/db.php");
	if(!check_cookie($db))
	{
	}
	else
	{
		echo "{\"status\":\"success\",";
	}
?>