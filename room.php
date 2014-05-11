<!DOCTYPE html>
<html>
<head>
    <title>Room Information</title>
    <link rel="stylesheet" type="text/css" href="room/room.css">
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.js"></script>
    <script type="text/javascript" src="/jquery.cookie.js"></script>
    <script type="text/javascript" src="/room/room.js"></script>

</head>
<body>
    <div id="bg0">
        <div id="header">
            
        </div>
            <?php 
                echo "<div id='roomNum'>"; 
                require_once("lib/db.php");
                $cookie = $_COOKIE['USER_COOKIE'];
                if(!check_cookie($db))
                {
                    #redirect to room.html
                    echo "<script type=\"text/javascript\">location.href=\"login/login.php\"</script>";
                }
                if(mysqli_connect_errno())
                {
                    echo "{\"status\":\"CANNOT_ACCESS_MYSQL\"}";
                    exit;
                }

    
                $game_id = 1;
                $prev_game_id = 1;
                $SQL_INSPECT_GAMES = "SELECT * FROM Game ORDER BY game_id ASC";
                $result = mysqli_query($db,$SQL_INSPECT_GAMES);
                $SQL_INSPECT_USERS = "SELECT username FROM User ORDER BY user_id ASC";
                $result2 = mysqli_query($db,$SQL_INSPECT_USERS);
                $usernames = mysqli_fetch_all($result2);
                $user_name = $_COOKIE['CURRENT_USERNAME'];

                $SQL_GET_USER_ID = "SELECT user_id FROM User WHERE username = '$user_name'";
                $temp = mysqli_query($db, $SQL_GET_USER_ID);
                $user_id = mysqli_fetch_row($temp)[0];

                while($row = mysqli_fetch_row($result))
                {
                   $num = $row[0];
                   $p1 = $row[1]; $p1Name = "";
                   $p2 = $row[2]; $p2Name = "";
                   $p3 = $row[3]; $p3Name = "";
                   if($p1)
                   {
                    $p1Name = $usernames[$p1][0];
                   }
  
                   if($p2)
                   {
                    $p2Name = $usernames[$p2][0];
                   }
                  
                   if($p3)
                   {
                    $p3Name = $usernames[$p3][0];
                   }
                  
                   
                    //echo "<button type='submit' class='roomBtn' id=$num>Room $num ! Click to enter room</button>";
                    echo "<div class='roomBtn' id=$num onclick=room_onclick()><div class='numDiv' id='room$num'>Room $num ! Click  and Enter this room ! !</div><div class='gameInfo' id='room$numInfo' P1='$p1' P2='$p2' P3='$p3'><br>Player1 : $p1Name<br>Player2 : $p2Name<br>Player3 : $p3Name<br></div></div>";
                    if($num % 3 == 0)
                    {
                        echo "<br><br>";
                    }
                    else
                    {
                        echo "&nbsp;&nbsp;&nbsp;";
                    }
                }

                /*$i = 0;
                while($i < 40){
                    $i++;
                    $num = $i % 7;
                    echo "<button type='submit' class='roomBtn'>Room $i ! Click to enter room</button><br><br>";
                }*/
                $SQL_CHECK_ROOM = "SELECT Game_id FROM Game WHERE P1 = '$user_id' OR P2 = '$user_id' OR P3 = '$user_id'";
                $result = mysqli_query($db, $SQL_CHECK_ROOM);
                if(mysqli_num_rows($result) == 0)
                {
                    echo "</div><div id='main' align='right'><button type='button'id='newRoom' onclick='room_create()''>Create New Room</button><button type='button' id='logout' onclick='logout()''>Log Out</button><br/><br/><div id='userInfo'>Current Player : $user_name<br/><p id='line1'>Now you are not in any room.</p><p id='line2'>You can create a new room or join an existed room.</p></div></div>";
                }
                else if(mysqli_num_rows($result) == 1)
                {
                    $room_num = mysqli_fetch_row($result)[0];
                    echo "</div><div id='main' align='right'><button type='button' id='newRoom' onclick='room_create()''>Create New Room</button><button type='button' id='logout' onclick='logout()''>Log Out</button><br/><br/><div id='userInfo'>Current Player : $user_name<br/>Now you are in Room $room_num<button type='button' id='quit' onclick='quit_room()'>Quit Current Room</button></div></div>";
                }
             ?>
    </div>

</body>
</html>
