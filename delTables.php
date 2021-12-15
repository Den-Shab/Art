<?php 
    $link = new mysqli("localhost", "root", "");
    if (mysqli_select_db($link,"a")){
        $link = new mysqli("localhost", "root","", "a");
        $link->query('Call del_gal()');
        echo json_encode(1);
    }  
?>