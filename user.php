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
			$link = new mysqli("localhost", "root", "","art-quiz");
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
                    $string = "painting:" . $row['painting_name'] . $enter;
                    echo "<div class = 'block'>" . $string .  "</div>";
                }
            }
            elseif( (!isset($_POST["Del"])) &&  ($_POST["Del"] != "")){
				$stmt = $link->prepare('CALL del(?)');
				$stmt->bind_param("s", $_POST['Del']);
				$stmt->execute();
                $result = $stmt->get_result();
                $enter = "<br>";
                $result = $link->query('Call pr()');
                foreach ($result as $row) {
                    $string = "painting:" . $row['painting_name'] . $enter;
                    echo "<div class = 'block'>" . $string .  "</div>";
                }
                $_POST["Del"] = "";
            }
            elseif($_POST["EnterPicName"]!="" && $_POST["EnterAuthorName"]!=""){

                //$count = $link->query("SELECT count(*) FROM `arts` WHERE painting_name=$_POST['EnterPicName'] and $_POST['EnterAuthorName']");
                $id = $link->query("SELECT * FROM `arts` ORDER BY `painting_id` DESC LIMIT 1");
                $k=0;
                $res = 0;
                foreach ($id as $row) {
                    if ($k===0)
                    {
                      $res = $row['painting_id'] + 1;
                    }
                }
                $destination = "C:/Server/data/htdocs/Art/assets/pics_quiz/new_pics/";
                $format = ".jpg";
                $d = $destination  . $res . $format;
                if (rename($_FILES['myFile']['tmp_name'], $d)) 
                {
                    echo "good";
                } else 
                {
                    echo "bad";
                }
                $aut = $_POST['EnterAuthorName'];
                $sql = "INSERT INTO  painter(painter_name,birth) values('$aut',0)";
                if ($link->query($sql) === TRUE) {
                    echo "New record created successfully";
                } else {
                    echo "Error: " . $sql . "<br>" . $link->error;
                }
                $pic = $_POST["EnterPicName"];
                $sql2 = "INSERT INTO arts (painter_id,painting_name,yer,reff) values ((select painter_id from painter where (painter_name = '$aut')),'$pic',0,'$d')";
                if ($link->query($sql2) === TRUE) {
                    echo "New record created successfully";
                } else {
                    echo "Error: " . $sql . "<br>" . $link->error;
                }
            }
            else{
                $result = $link->query('Call pr()');
                $enter = "<br>";
                foreach ($result as $row) {
                    $string = "painting:" . $row['painting_name'] . $enter;
                    echo "<div class = 'block'>" . $string .  "</div>";
                }
            }     
        ?>
   </div>
</body>
</html>