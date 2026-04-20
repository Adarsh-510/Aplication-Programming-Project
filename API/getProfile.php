<?php
require_once 'db_config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$userID = $data['userID'];

$query = "SELECT * FROM users WHERE userID = '$userID'";
$result = $connection->query($query);

$row = $result->fetch_assoc();
echo json_encode(['profile' => $row]);