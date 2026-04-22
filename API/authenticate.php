<?php
require_once 'db_config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if ($data['create']){
  $userID = $data['userID'];
  $username = $data['username'];
  $password = password_hash($data['password'], PASSWORD_DEFAULT);

  $query = "SELECT 1 FROM users WHERE userID = '$userID' OR username = '$username' LIMIT 1";
  $result = $connection->query($query);
  if ($result->num_rows > 0)
    echo json_encode(['status' => 'Account already exists.']);
  else {
    $query = "INSERT INTO `users`(`userID`, `username`, `password`) VALUES ('$userID','$username','$password')";
    $connection->query($query);
    $query = "INSERT INTO `scores`(`userID`) VALUES ('$userID')";
    $connection->query($query);

    setcookie("userID", $userID, time() + (3 * 24 * 60 * 60), '/');
    setcookie("username", $username, time() + (3 * 24 * 60 * 60), '/');

    echo json_encode(['status' => 'Account created.']);
  }
} else {
  $user = $data['user'];
  $password = $data['password'];

  $query = "SELECT `userID`, `password` FROM users WHERE userID = '$user' OR username = '$user' LIMIT 1";
  $result = $connection->query($query);
  $userData = $result->fetch_assoc();

  if ($result->num_rows == 0) 
    echo json_encode(['status' => 'Invalid username or userID.']);
  else if (password_verify($password, $userData['password'])) {
    echo json_encode(['status' => 'Logged in succesfully.']);
    setcookie("userID", $userData['userID'], time() + (3 * 24 * 60 * 60), '/');
    setcookie("username", $userData['username'], time() + (3 * 24 * 60 * 60), '/');
  } else {
    echo json_encode(['status' => 'Incorrect password.']);
  }
}