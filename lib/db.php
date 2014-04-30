<?php
#$DATA_DIR is the abosolute path storing the permanent data, which is not accessible by HTTP request
#$RUNTIME_DATA_DIR is the abosolute path for the runtime root repository, a symbolic link should be created here for access to the permanent data
#$MYSQL_HOST is the IP address of the MYSQL SERVER
#$MYSQL_PORT is the port of the MYSQL SERVER
#$MYSQL_PWD is the password of the MYSQL SERVER
#$MYSQL_USR is the username of the MYSQL SERVER
	$DATA_DIR = $_ENV['OPENSHIFT_DATA_DIR'];
	$RUNTIME_DATA_DIR = $_ENV['OPENSHIFT_REPO_DIR'];
	$MYSQL_HOST = $_ENV['OPENSHIFT_MYSQL_DB_HOST'];
	$MYSQL_PORT = $_ENV['OPENSHIFT_MYSQL_DB_PORT'];
	$MYSQL_PWD = $_ENV['OPENSHIFT_MYSQL_DB_PASSWORD'];
	$MYSQL_USR = $_ENV['OPENSHIFT_MYSQL_DB_USERNAME'];
#$db is the connection to the mysql server
	$db = mysqli_connect("$MYSQL_HOST:$MYSQL_PORT",$MYSQL_USR,$MYSQL_PWD,"project");

	function check_cookie()
	{
		$USER_COOKIE = $_COOKIE["USER_COOKIE"];
	}

	function db_create_table($con,$sql,$table_name)
	{
		if(mysqli_query($con,$sql))
		{
			echo "Create table $table_name successfully<br>"; 
		}
		else
		{
			echo "Error creating table $table_name: ".mysqli_error($con)."<br>";
		}
	}

	function db_drop_table($con,$sql,$table_name)
	{
		if(mysqli_query($con,$sql))
		{
			echo "Drop table $table_name successfully<br>";
		}
		else
		{
			echo "Error dropping table $table_name: ".mysqli_error($con)."<br>";
		}
	}
?>
