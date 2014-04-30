<!DOCTYPE html>
<html>
<head>
    <title>Room Information</title>
    <link rel="stylesheet" type="text/css" href="room.css">
</head>
<body>
    <div id="bg0">
        <div id="roomNum">    
            <button type="submit">Room1 <i>Click to Join</i></button><br>
            <?php  
                $i = 0;
                while($i < 30){
                    $i++;
                    echo "<button type='submit'>whatever la hahahhahaha</button><br>";
                }
            ?>
        </div>
        <div id="Info">
            <div id="userInfo">
                <table id="useInfoTable" class="infoTable"></table>
            </div>
            <div id="roomInfo">
                <table id="roomInfoTable" class="infoTable"></table>
            </div> 
        </div>
    </div>

</body>
</html>