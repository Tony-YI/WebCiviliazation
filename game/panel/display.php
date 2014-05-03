<!DOCTYPE html>
<html>
<head>
    <title>WebCivilization</title>
    <link rel="stylesheet" type="text/css" href="./display.css"/>
    <script type="text/javascript" src="./display.js"></script>
    <?php
        #Check Cookie here
        #if cookie exist, redirect the page
        #else ask the user to login
        $cookie = $_COOKIE['USER_COOKIE'];
        require_once("../../lib/db.php");
        if(!check_cookie($db))
        {
            #redirect to login.php
            echo "<script type=\"text/javascript\">location.href=\"../../login/login.php\"</script>";
        }
    ?>
</head>

<body>
<div class="display">
    <div class="box" name="hehe">
    </div>
</div>
</body>
</html>