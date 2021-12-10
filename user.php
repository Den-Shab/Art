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

    <header>
    <form action="user.php" method="POST">
      <input type="text" name="Pic"/>
      <input type="submit" value="Найти">
      <input type="text" name="Del"/>
      <input type="submit" value="Удалить">
    </form>
    </header>
    <div class="main-block">
        <?php
			$link = new mysqli("localhost", "root", "","art");
            mysqli_query($link,'SET NAMES utf8');
            
            if($_POST["Pic"] != ""){
				$stmt = $link->prepare('CALL finding(?)');
				$stmt->bind_param("s", $_POST['Pic']);
				$stmt->execute();
                $result = $stmt->get_result();
                $enter = "<br>";
                foreach ($result as $row) {
                    $string = "painting:" . $row['painting_name'] . $enter;
                    echo "<div class = 'block'>" . $string .  "</div>";
                }
            }
            elseif($_POST["Del"] != ""){
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