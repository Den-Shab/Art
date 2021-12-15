<!DOCTYPE html>
<html>
  <head lang="en">
      <meta charset="UTF-8">
      <title>art-quiz</title>
      <link rel="stylesheet" href="style.css">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
  </head>
  <body>
  <?php
      $link = new mysqli("localhost", "root", "");
      if (!mysqli_select_db($link,"a")){
        $f = file_get_contents('pr.txt', true);
        $pieces = explode(";", $f);
        $link -> query($pieces[0]);
        $k=0;
        $link = new mysqli("localhost", "root","", "a");
        $link->set_charset("utf8");
        foreach ($pieces as $value)
        {
            if(!($k==0)){
              $link -> query($value);
              echo mysqli_errno($link) . ": " . mysqli_error($link) . "\n";
            }
            $k=100;
        }
        $file = file_get_contents('proc.txt', true);
        $parts = explode("#", $file);
        //$link -> query("delimiter $$");
        echo mysqli_errno($link) . ": " . mysqli_error($link) . "\n";
        foreach ($parts as $value)
        {
              $link -> query($value);
              echo mysqli_errno($link) . ": " . mysqli_error($link) . "\n";
        }
      }
  ?>
    <audio id="audio" src="assets/audio/sound.mp3" style="display:none;" controls autoplay></audio>
    <div id="app">
      <form action="user.php" method="POST">
        <input type="text" name="Pic" style="display:none"/>
        <input type="submit" value="Отправить">
      </form>
    </div>
    <footer class="footer">
    </footer>
    <script src="assets/images.js"> </script>
    <script src="src/js/audio.js"></script>
    <script src="src/js/quiz_aut.js"></script>
    <script src="src/js/quiz_pics.js"></script>
    <script src="src/js/router2.js"></script>
    <?php
      if(isset($_POST['myarray'])){
          $req = false;
          ob_start();
          echo '<pre>';
          foreach ($_POST['myarray'] as &$value) 
          {
            echo $value ;
            echo '<pre>'; 
          }
          echo '</pre>';
          $req = ob_get_contents();
          ob_end_clean();
          echo json_encode($req);
          exit;
      }
    ?>
  </body>
</html>
