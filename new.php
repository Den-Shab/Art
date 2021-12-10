 <?php
    $link = new mysqli("localhost", "root", "","art-quiz");
    if(isset($_POST['myarray']))
    {
    $req = false;
        ob_start();
        $result =  $_POST['myarray'][0];
        $category =  $_POST['myarray'][1];
        $quiz_num =  $_POST['myarray'][2];
        $link->query("INSERT INTO history (quiz_id,user_id,res) values ((select quiz_id from quiz where (quiz_class=$quiz_num and genre_id=$category)),1,$result)");
        $req = ob_get_contents();
        ob_end_clean();
        echo json_encode($req);
        exit;
    }
?>