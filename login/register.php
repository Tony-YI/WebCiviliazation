require_once("../lib/db.php");
if(mysqli_connect_errno())
{
	echo "<p>Failed to connect to MySQL server: ".mysqli_connect_error()."</p>";
	show_db_php();
}

