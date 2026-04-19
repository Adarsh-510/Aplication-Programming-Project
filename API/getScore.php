<?php
require_once 'db_config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['userId'];
$game = $data['game'];

$query = "SELECT * FROM scores WHERE userID = '$userId'";
$result = $connection->query($query);

$row = $result->fetch_assoc();
// return this -> $row[$game];
