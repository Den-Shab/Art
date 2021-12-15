<?php 
    $link = new mysqli("localhost", "root", "");
    if (mysqli_select_db($link,"a")){
        $link = new mysqli("localhost", "root","", "a");
        $link->query('Call drp()');
        echo json_encode(1);
    }
?>