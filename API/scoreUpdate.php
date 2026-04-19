<?php
require_once 'db_config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['userId'];
$game = $data['game']; 
$points = $data['points'];

$query = "UPDATE `scores` SET $game = $game + $points WHERE `userID` = '$userId'";

$connection->query($query);

echo json_encode(["success" => $success]);
?>