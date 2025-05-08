<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../../config/db.php';

if (!isset($_GET['pdga_number'])) {
  http_response_code(400);
  echo json_encode(['error'=>'Missing pdga_number']);
  exit;
}

$db   = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
$pdga = intval($_GET['pdga_number']);

$sql = "
  SELECT DISTINCT
    events.pdga_event_id,
    events.name,
    events.start_date,
    events.city,
    events.state,
    events.country,
    events.latitude,
    events.longitude
  FROM event_rounds
  JOIN events
    ON event_rounds.pdga_event_id = events.pdga_event_id
  WHERE
    event_rounds.pdga_number = ?
    AND events.latitude  IS NOT NULL
    AND events.longitude IS NOT NULL
  ORDER BY
    events.start_date DESC
";

$stmt = $db->prepare($sql);
$stmt->bind_param('i', $pdga);
$stmt->execute();
$rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

echo json_encode($rows);

?>