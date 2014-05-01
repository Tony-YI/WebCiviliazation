<?php
	#This file will reply with the correct data about the current existing room
	#it should return data in JSON format
	#EXAMPLE
	/*
		{
			"status":"success";
			"game":[{"Game_id":"1","P1":"0","P2":"1","P3":"NULL"},
					{"Game_id":"2","P1":"4","P2":"5","P3":"NULL"},
					{"Game_id":"3","P1":"9","P2":"2","P3":"NULL"},
					{"Game_id":"4","P1":"12","P2":"3","P3":"NULL"}]
		}
	*/
	require_once("../lib/db.php");
	if(!check_cookie($db))
	{
		//If the cookie exists
	}
	else
	{
		echo "{\"status\":\"success\",";
	}
?>