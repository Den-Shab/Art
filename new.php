 <?php
    /*$link = new mysqli("localhost", "root", "","art");
    if(isset($_POST['myarray']))
    {
		$req = false;
        ob_start();
		$query = 'CALL quizz(?, ?, ?)';
		$stmt = mysqli_prepare($link, $query);
		mysqli_stmt_bind_param($stmt, "isi", $_POST['myarray'][0], $_POST['myarray'][1], $_POST['myarray'][2]);
		mysqli_stmt_execute($stmt);
		$res = mysqli_stmt_get_result($stmt);
        $req = ob_get_contents();
        ob_end_clean();
        echo json_encode($req);
        exit;
    }*/
	$link = new mysqli("localhost", "root", "","a");
    if(isset($_POST['myarray']))
    {
		$req = false;
        ob_start();
		echo $_POST['myarray'][0];
		echo $_POST['myarray'][1];
		echo $_POST['myarray'][2];
		$clas = 6*($_POST['myarray'][2]-1)+$_POST['myarray'][1];
		$stmt = $link->prepare('CALL quizzzz(?, ?)');
		$stmt->bind_param("ii", $clas, $_POST['myarray'][0]);
		$stmt->execute();
		$stmt->get_result();
        $req = ob_get_contents();
        ob_end_clean();
        echo json_encode($req);
        exit;
    }
?>