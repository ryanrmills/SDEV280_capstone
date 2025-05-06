<?php

  require_once __DIR__ . '/../../../config/db.php';

  header('Content-Type: application/json');

  if (!isset($_GET['pdga_number']) OR !isset($_GET['year'])) {
    http_response_code(400);
    echo json_encode(['error'=>'Missing pdga_number']);
    exit;
  }

  $db = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
  $pdga = intval($_GET['pdga_number']);
  $year = intval($_GET['year']);

  // Pull every unique year from your events table (assuming events.start_date)

  $sql = 
  "SELECT DISTINCT
    -- events.pdga_event_id,
    events.name
    -- events.start_date,
    -- events.end_date,
    -- events.tier,
    -- events.city,
    -- events.state,
    -- events.country
  FROM
    event_rounds
  JOIN
    events
      ON event_rounds.pdga_event_id = events.pdga_event_id
  WHERE
    event_rounds.pdga_number = ?
    AND YEAR(events.start_date) = ?
  ORDER BY
    events.start_date DESC
";

  $stmt = $db->prepare($sql);
  $stmt->bind_param('ii',$pdga, $year);
  $stmt->execute();
  $events = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
  echo json_encode(array_column($events, 'name'));
?>