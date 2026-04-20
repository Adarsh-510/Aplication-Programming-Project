<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SignUp</title>

  <link rel="stylesheet" href="./authPagesStyleSheet.css">
</head>
<body>
  <header>
    <nav>
      <a id="homeButton" href="../../index.html">🏠</a>
      <a id="profileButton" href="../Profile/profile.html">Profile</a>
      <a id="loginButton" href="#">SignIn/SignUp</a>
      <a id="leaderboardButton" href="../Leaderboard/leaderboard.html">Leaderboard</a>
    </nav>

    <h1>SignUp</h1>
    <p>SignUp for a new account.</p>
  </header>

  <div class="authForm">
    <div class="authOptions">
      <a href="./signin.php" id="notCurrentSelection" style="border-top-right-radius: 0px; border-bottom-left-radius: 0px;">SignIn</a>
      <a href="#">SignUp</a>
    </div>

    <form method="POST">
      <label for="userID">User ID (collage id)</label><br>
      <input type="text" id="userID"
             placeholder="BT25CSE170" 
             oninput="this.value = this.value.toUpperCase()"
             pattern="^BT[0-9]{2}[A-Z]{3}[0-9]{3}$"
             required name="userID"><br>
      <label for="username">Username</label><br>
      <input type="text" id="username" placeholder="Adarsh Jain" required name="username"><br>
      <label for="password">Password</label><br>
      <input type="password" id="password" placeholder="********" required name="password"><br>
      <label for="repassword">Retype Password</label><br>
      <input type="password" id="repassword" placeholder="********" required name="repassword"><br>

      <input id="submitBtn" type="submit" value="SignUp">
    </form>
  </div>

  <footer>
    &copy COPYRIGHTS RESERVED BY THE NATION OF CROATIA! DO NOT DISTRIBUTE!
  </footer>
</body>
</html>

<?php
require_once '..\..\API\db_config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $userID = $_POST['userID'];
  $username = $_POST['username'];
  $password = $_POST['password'];
  $repassword = $_POST['repassword'];

  if ($password !== $repassword)
    die('Retyped password should be the same as password.');

  $query = "SELECT * FROM users WHERE userID = '$userID' OR username = '$username'";
  $result = $connection->query($query);

  if ($result->num_rows > 0) {
    echo "User already exists";
  } else {
    $query = "INSERT INTO `users`(`userID`, `username`, `password`) VALUES ('$userID','$username','$password')";
    $connection->query($query);
    $query = "INSERT INTO `scores`(`userID`) VALUES ('$userID')";
    $connection->query($query);

    setcookie("userID", $userID, time() + (3 * 24 * 60 * 60), '/');
    setcookie("username", $username, time() + (3 * 24 * 60 * 60), '/');
    header('Location: ../Profile/profile.html');

    echo "Account successfully made. welcome " . $username . ".";
  }
}
?>