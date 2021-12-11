 <?php
    $link = new mysqli("localhost", "root", "","art-quiz");
    if(isset($_POST['myarray']))
    {
    $req = false;
        ob_start();
		$stmt = $link->prepare('CALL quizz(?, ?, ?)');
		$stmt->bind_param("isi", $_POST['myarray'][0], $_POST['myarray'][1], $_POST['myarray'][2]);
		$stmt->execute();
		$stmt->get_result();
        $req = ob_get_contents();
        ob_end_clean();
        echo json_encode($req);
        exit;
    }
?>