<?php
#$DATA_DIR is the abosolute path storing the permanent data, which is not accessible by HTTP request
#$RUNTIME_DATA_DIR is the abosolute path for the runtime root repository, a symbolic link should be created here for access to the permanent data
#$MYSQL_HOST is the IP address of the MYSQL SERVER
#$MYSQL_PORT is the port of the MYSQL SERVER
#$MYSQL_PWD is the password of the MYSQL SERVER
#$MYSQL_USR is the username of the MYSQL SERVER
	$DATA_DIR = getenv('OPENSHIFT_DATA_DIR');
	$RUNTIME_DATA_DIR = getenv('OPENSHIFT_REPO_DIR');
	$MYSQL_HOST = getenv("OPENSHIFT_MYSQL_DB_HOST");
	$MYSQL_PORT = getenv("OPENSHIFT_MYSQL_DB_PORT");
	$MYSQL_PWD = getenv("OPENSHIFT_MYSQL_DB_PASSWORD");
	$MYSQL_USR = getenv("OPENSHIFT_MYSQL_DB_USERNAME");
#$db is the connection to the mysql server
	$db = mysqli_connect("$MYSQL_HOST:$MYSQL_PORT",$MYSQL_USR,$MYSQL_PWD,"project");

	function show_db_php()
	{
		global $DATA_DIR, $RUNTIME_DATA_DIR, $MYSQL_HOST, $MYSQL_PORT, $MYSQL_USR, $MYSQL_PWD;
		echo "<p>DATA_DIR: |$DATA_DIR|</p>";
		echo "<p>RUNTIME_DATA_DIR: |$RUNTIME_DATA_DIR|</p>";
		echo "<p>MYSQL_HOST: |$MYSQL_HOST|</p>";
		echo "<p>MYSQL_PORT: |$MYSQL_PORT|</p>";
		echo "<p>MYSQL_USR: |$MYSQL_USR|</p>;";
		echo "<P>MYSQL_PWD: |$MYSQL_PWD|</p>";
	}
	show_db_php();
	function check_cookie()
	{
		$USER_COOKIE = $_COOKIE["USER_COOKIE"];
	}

	function db_create_table($con,$sql,$table_name)
	{
		if(mysqli_query($con,$sql))
		{
			echo "<p>Create table $table_name successfully</p>"; 
		}
		else
		{
			echo "<p>Error creating table $table_name: ".mysqli_error($con)."</p>";
		}
	}

	function db_drop_table($con,$sql,$table_name)
	{
		if(mysqli_query($con,$sql))
		{
			echo "<p>Drop table $table_name successfully</p>";
		}
		else
		{
			echo "<p>Error dropping table $table_name: ".mysqli_error($con)."</p>";
		}
	}
?>
