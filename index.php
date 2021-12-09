<!DOCTYPE html>
<html>
  <head lang="en">
      <meta charset="UTF-8">
      <title>art-quiz</title>
      <link rel="stylesheet" href="style.css">
      <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
  <?php
      $link = new mysqli("localhost", "root", "","art-quiz");
  ?>
    <audio id="audio" src="assets/audio/sound.mp3" style="display:none;" controls autoplay></audio>
    <div id="app">
      <form action="user.php" method="POST">
        <input type="text" name="Pic" style="display:none"/>
        <input type="submit" value="Отправить">
      </form>
    </div>
    <footer class="footer">
      <a href="https://github.com/timkorn" target='_blank'><p>github</p></a>
      <p id='year'>2021</p>
      <a href="https://rs.school/" target='_blank'><img src="assets/footer/scale_1200.webp" alt="" width="80px"></a>
    </footer>
    <script src="assets/images.js"> </script>
    <script src="src/js/audio.js"></script>
    <script src="src/js/quiz_aut.js"></script>
    <script src="src/js/quiz_pics.js"></script>
    <script src="src/js/router2.js"></script>
  </body>
</html>