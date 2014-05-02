<!DOCTYPE html>
<html>
<head>
    <title>Room Information</title>
    <link rel="stylesheet" type="text/css" href="room/room.css">
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.js"></script>
    <script type="text/javascript" src="jquery.cookie.js"></script>
    <script type="text/javascript" src="room/room.js"></script>

</head>
<body>
    <div id="bg0">
        <div id="header">
            
        </div>
        <div id="roomNum">  
            <?php  
                require_once("lib/db.php");
                $cookie = $_COOKIE['USER_COOKIE'];
                if(!check_cookie($db))
                {
                    #redirect to room.html
                    echo "<script type=\"text/javascript\">location.href=\"login.php\"</script>";
                }
                if(mysqli_connect_errno())
                {
                    echo "{\"status\":\"CANNOT_ACCESS_MYSQL\"}";
                    exit;
                }

                $user_id = $_SERVER["HTTP_USERID"];
                $game_id = 1;
                $prev_game_id = 1;
                $SQL_INSPECT_GAMES = "SELECT * FROM Game ORDER BY game_id ASC";
                $result = mysqli_query($db,$SQL_INSPECT_GAMES);

                while($row = mysqli_fetch_row($result))
                {
                   $num = $row[0];
                   $p1 = $row[1];
                   $p2 = $row[2];
                   $p3 = $row[3];
                    //echo "<button type='submit' class='roomBtn' id=$num>Room $num ! Click to enter room</button>";
                    echo "<div class='roomBtn' id=$num><div class='numDiv' id='room'$num>Room $num ! Click ENTER BUTTON to enter room</div>
                    <div class='gameInfo' id='room'$num'Info'><br>Room Creator : $p1<br>Other Player: $p2<br>Other Player:$p3<br></div>
                    </div>";
                    if($num % 3 == 0)
                    {
                        echo "<br><br>";
                    }
                    else
                    {
                        echo "&nbsp;&nbsp;&nbsp;&nbsp;";
                    }
                }

                /*$i = 0;
                while($i < 40){
                    $i++;
                    $num = $i % 7;
                    echo "<button type='submit' class='roomBtn'>Room $i ! Click to enter room</button><br><br>";
                }*/
            ?>
        </div>
        <div id="main" align="right">
            <button type="button" id="logout" onclick="logout()">Log Out</button>
            <button type="button" id="newRoom" onclick="room_create()">Create New Room</button>
        </div>
        <!--<div id="Info" align="right">
            <div id="main" align="right">
            <button type="button" id="logout" onclick="logout()">logout</button>
            <button type="button" id="newRoom" onclick="room_create()">create a new room</button>
            <br><br>
            </div>
            <div id="userInfo">
                <table id="userInfoTable" border="3px">
                    <tr><td>what</td><td>what????????</td></tr>
                </table>
            </div>
            <div id="roomInfo">
                <table id="roomInfoTable"  border="3px">
                   <tr><td>what the hell</td><td>what????????</td></tr>
                </table>
            </div> 
        </div>-->
    </div>

</body>
</html>
