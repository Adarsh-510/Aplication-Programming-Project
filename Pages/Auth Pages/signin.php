<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SignIn</title>

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

    <h1>SignIn</h1>
    <p>SignIn to an already existing account.</p>
  </header>

  <div class="authForm">
    <div class="authOptions">
      <a href="#">SignIn</a>
      <a href="./signup.php" id="notCurrentSelection" style="border-top-left-radius: 0px; border-bottom-right-radius: 0px;">SignUp</a>
    </div>

    <form method="POST">
      <label for="userId">User ID or Username</label><br>
      <input type="text" id="userId" placeholder="BT25CSE170 / Adarsh Jain" required name="userid"><br>
      <label for="password">Password</label><br>
      <input type="password" id="password" placeholder="********" required name="password"><br>

      <input id="submitBtn" type="submit" value="SignIn">
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
  $user = $_POST['userid'];
  $password = $_POST['password'];

  $query = "SELECT * FROM users WHERE userID = '$user' OR userName = '$user'";
  $result = $connection->query($query);

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row['password'] == $password) {
      echo "Welcome back " . $row['userName'] . ".";
    } else {
      echo "Incorrect password. Try again.";
    }
  } else {
    echo "User " . $user . " not found. Check username / userID and try again.";
  }
}
?>
