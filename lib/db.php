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
$db = mysql_connect("$MYSQL_HOST:$MYSQL_PORT",$MYSQL_USR,$MYSQL_PWD);


	function check_cookie()
	{
		$USER_COOKIE = $_COOKIE["USER_COOKIE"];
	}
?>
