<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header class="headerAllPics">
        <form action="index.php" method="POST" class="ExAllP">
            <input type="submit" value="На главную">
        </form>
        <form action="user.php" method="POST" enctype="multipart/form-data">
            <div>
            <h3>Найти/Удалить картину</h3>
            <div>
                <input type="text" name="Pic" placeholder="поиск"/>
                <input type="submit" value="Найти">
            </div>
            <div>
                <input type="text" name="Del" placeholder="удалить картину"/>
                <input type="submit" value="Удалить">
            </div>
            </div>
            <div>
                <h3>Добавить картину</h3>
                <div>
                    <input type="text" name="EnterPicName" placeholder="картина"/>
                    <input type="text" name="EnterAuthorName" placeholder="автор"/>
                </div>
                <div>
                    <input name="myFile" type="file" accept=".jpg, .jpeg, .png" style="color:white" enctype="multipart/form-data"s>
                </div>
                <input type="submit" value="Добавить новую картину">
            </div>
        </form>
    </header>
    <div class="main-block">
        <?php 
			error_reporting(E_ALL);
			ini_set('display_errors', 1);
			$link = new mysqli("localhost", "root", "","art");
            mysqli_query($link,'SET NAMES utf8');
            if($_POST["Pic"] != ""){
				$stmt = $link->prepare('CALL finding(?)');
				$stmt->bind_param("s", $_POST['Pic']);
				$stmt->execute();
                $result = $stmt->get_result();
                $_POST["Pic"] = "";
                print_r($_POST["Pic"]);
                $enter = "<br>";
                foreach ($result as $row) {
                    $string = $row['painting_name'];
                    $src = $row['reff'];
                    $author_name = $row['pain_name'];
					echo "<div class = 'block'>" . $string . $enter  . $author_name . $enter . $enter . "<img class='block-img' src=". $src . ">" . "</div>";
                }
            }
            elseif( array_key_exists('Del', $_POST) &&  ($_POST["Del"] != "")){
				$stmt = $link->prepare('CALL del(?)');
				$stmt->bind_param("s", $_POST['Del']);
				$stmt->execute();
                $result = $stmt->get_result();
                $enter = "<br>";
                $result = $link->query('Call pr()');
                foreach ($result as $row) {
                    $string = $row['painting_name'];
                    $src = $row['reff'];
                    $author_name = $row['pain_name'];
					echo "<div class = 'block'>" . $string . $enter  . $author_name . $enter . $enter . "<img class='block-img' src=". $src . ">" . "</div>";
                }
                $_POST["Del"] = "";
            }
            elseif( array_key_exists("EnterPicName", $_POST) && array_key_exists("EnterAuthorName", $_POST) && $_POST["EnterPicName"]!="" && $_POST["EnterAuthorName"]!=""){
                $query = 'Call last(?)';
				$a = 1;
				$stmt = mysqli_prepare($link, $query);
				mysqli_stmt_bind_param($stmt, "i", $a);
				mysqli_stmt_execute($stmt);
				$id = mysqli_stmt_get_result($stmt);
                $k=0;
                $res = 0;
                foreach ($id as $row) {
                    if ($k===0)
                    {
                      $res = $row['painting_id'] + 1;
                    }
                }
				mysqli_free_result($id);
				mysqli_next_result($link);
                $destination = "assets/pics_quiz/new_pics/";
                $format = ".jpg";
                $d = $destination  . $res . $format;
                $aut = $_POST['EnterAuthorName'];
				$query = 'CALL checkone(?)';
				$stmt = mysqli_prepare($link, $query);
				mysqli_stmt_bind_param($stmt, "s", $aut);
				mysqli_stmt_execute($stmt);
				$res = mysqli_stmt_get_result($stmt);
				if (!($res->num_rows)){	
					mysqli_free_result($res);
					mysqli_next_result($link);
					$query = 'CALL Addddd(?)';
					$stmt = mysqli_prepare($link, $query);
					mysqli_stmt_bind_param($stmt, "s", $aut);
					mysqli_stmt_execute($stmt);
					$sql = mysqli_stmt_get_result($stmt);
					mysqli_free_result($sql);
					mysqli_next_result($link);
				}
				else{
					mysqli_free_result($res);
					mysqli_next_result($link);
				}
				$pic = $_POST["EnterPicName"];
				$query = 'CALL checktwo(?, ?)';
				$stmt = mysqli_prepare($link, $query);
				mysqli_stmt_bind_param($stmt, "ss", $aut, $pic);
				mysqli_stmt_execute($stmt);
				$res = mysqli_stmt_get_result($stmt);
				if (!($res->num_rows)){	
					mysqli_free_result($res);
					mysqli_next_result($link);
					$sql2 = $link->prepare('Call Proced(?, ?, ?)');
					$sql2->bind_param("sss", $aut, $pic, $d);
					$sql2->execute();
					$sq2 = $sql2->get_result();
					mysqli_free_result($sq2);
					mysqli_next_result($link);
				}
				else{
					mysqli_free_result($sq2);
					mysqli_next_result($link);
				}
            }
            else{
                $result = $link->query('Call pr()');
                $enter = "<br>";
                foreach ($result as $row) {
                    $string = $row['painting_name'];
                    $src = $row['reff'];
                    $author_name = $row['pain_name'];
					echo "<div class = 'block'>" . $string . $enter  . $author_name . $enter . $enter . "<img class='block-img' src=". $src . ">" . "</div>";
                }
            }     
        ?>
   </div>
</body>
</html>