<?php
require_once 'db_config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$gameName = $data['gameName'];

$query = "SELECT * FROM scores ORDER BY $gameName DESC LIMIT 10";
$result = $connection->query($query);

$scores = [];
while($row = $result->fetch_assoc()) {
  $scores[] = $row;
}
echo json_encode(['scores' => $scores]);