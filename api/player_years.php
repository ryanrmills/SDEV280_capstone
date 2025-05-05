<?php
  require_once __DIR__ . '/../../../config/db.php';
  header('Content-Type: application/json');
  if (!isset($_GET['pdga_number'])) {
    http_response_code(400);
    echo json_encode(['error'=>'Missing pdga_number']);
    exit;
  }
  $db = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
  $pdga = intval($_GET['pdga_number']);

  // Pull every unique year from your events table (assuming events.start_date)
  $sql = "
    SELECT DISTINCT YEAR(events.start_date) AS year
      FROM event_rounds
      JOIN events
        ON event_rounds.pdga_event_id = events.pdga_event_id
     WHERE event_rounds.pdga_number = ?
     ORDER BY year DESC
  ";
  $stmt = $db->prepare($sql);
  $stmt->bind_param('i',$pdga);
  $stmt->execute();
  $years = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
  echo json_encode(array_column($years,'year'));
  
?>