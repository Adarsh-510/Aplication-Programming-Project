<?php
$host = 'localhost';
$db   = 'game data';
$user = 'root';
$pass = '';

$connection = new mysqli($host,$user,$pass,$db);

if ($connection->connect_error) {
  die("connection failed: ".$connection->connect_error);
}
?>
