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
<button type="button" onclick="logout()">logout</button>
<button type="button" onclick="room_create()">create a new room</button>
    <div id="bg0">
        <div id="header">
            
        </div>
        <div id="roomNum">  
            <?php  
                $i = 0;
                while($i < 40){
                    $i++;
                    $num = $i % 7;
                    echo "<button type='submit' class='button$num'>Room $i ! Click to enter room</button><br><br>";
                }
            ?>
        </div>
        <div id="Info" align="right">
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
        </div>
    </div>

</body>
</html>
