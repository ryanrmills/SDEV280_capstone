<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../../config/db.php';

$db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
$db->set_charset('utf8mb4');

if ($db->connect_error) {
  http_response_code(500);
  echo json_encode(['error' => 'DB connection failed.']);
  exit;
}

$query = isset($_GET['query']) ? $db->real_escape_string($_GET['query']) : '';
if (strlen($query) < 1) {
  echo json_encode([]);
  //exit;
}

$sql = "
  SELECT pdga_number, CONCAT(first_name, ' ', last_name) AS full_name
  FROM players
  WHERE first_name LIKE ? OR last_name LIKE ?
  LIMIT 6
";
$stmt = $db->prepare($sql);
$searchTerm = "%". $query . "%";
$stmt->bind_param('ss', $searchTerm, $searchTerm);
$stmt->execute();
$res = $stmt->get_result();

$players = [];
while ($row = $res->fetch_assoc()) {
  $players[] = $row;
}

echo json_encode($players);
