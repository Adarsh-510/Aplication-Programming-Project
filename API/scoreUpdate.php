<?php
require_once 'db_config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$userID = $data['userID'];
$game = $data['game']; 
$points = $data['points'];

$query = "UPDATE `scores` SET $game = $game + $points WHERE `userID` = '$userID'";
$connection->query($query);