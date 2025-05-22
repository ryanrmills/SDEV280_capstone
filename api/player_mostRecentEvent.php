<?php
  //this is for displaying errors and debugging
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
  
  header('Content-Type: application/json');

  require_once __DIR__ . '/../../../config/db.php';

  $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  $db->set_charset('utf8mb4');



  if (!isset($_GET['pdga_number'])){
    echo json_encode(["error" => "missing pdga number"]);
  }

  $pdgaNumber = intval($_GET['pdga_number']);
  

  $headerSql =
  "SELECT
    events.pdga_event_id,
    events.name AS event_name,
    CONCAT(
      events.city, ', ',
      events.state, ', ',
      events.country
    ) AS event_location,
    CONCAT(MONTHNAME(events.start_date), ' ', DAY(events.start_date), ', ', YEAR(events.start_date)) AS event_start_date,
    event_results.event_rating  AS event_rating,
    event_totals.total_score AS event_score
  FROM
    events
  JOIN
    event_results
      ON events.pdga_event_id = event_results.pdga_event_id
    AND event_results.pdga_number = ?          -- bind your player’s PDGA number
  JOIN
    (
      SELECT
        event_rounds.pdga_event_id,
        SUM(event_rounds.score) AS total_score
      FROM
        event_rounds
      WHERE
        event_rounds.pdga_number = ?            -- same PDGA #
      GROUP BY
        event_rounds.pdga_event_id
    ) AS event_totals
      ON event_totals.pdga_event_id = events.pdga_event_id
  WHERE
      events.start_date < CURDATE()           -- only past events
  AND events.pdga_event_id = (                  -- pick the one with the latest date
      SELECT
        event_rounds_inner.pdga_event_id
      FROM
        event_rounds AS event_rounds_inner
      JOIN
        events AS events_inner
          ON event_rounds_inner.pdga_event_id = events_inner.pdga_event_id
      WHERE
        event_rounds_inner.pdga_number = ?
        AND events_inner.start_date < CURDATE()
      ORDER BY
        events_inner.start_date DESC
      LIMIT 1
    );
  ";

  $roundSql = 
  "SELECT
    event_rounds.round    AS round_number,
    event_rounds.score    AS round_score,
    event_rounds.rating   AS round_rating        -- same cash each round, if you need it here
  FROM
    event_rounds
  JOIN
    event_results
      ON event_rounds.pdga_event_id = event_results.pdga_event_id
    AND event_rounds.pdga_number    = event_results.pdga_number
  WHERE
      event_rounds.pdga_number     = ?         -- same PDGA #
  AND event_rounds.pdga_event_id   = ?         -- the event_id from query #1
  ORDER BY
    event_rounds.round ASC;
  ";

  
  $headerStmt = $db->prepare($headerSql);
  $headerStmt->bind_param('iii', $pdgaNumber, $pdgaNumber, $pdgaNumber);
  $headerStmt->execute();
  $eventInfo = $headerStmt->get_result()->fetch_assoc();
  $headerStmt->close();

  // 2) get that event’s round‐by‐round details
  $roundStmt = $db->prepare($roundSql);
  $roundStmt->bind_param('ii', $pdgaNumber, $eventInfo['pdga_event_id']);
  $roundStmt->execute();
  $roundDetails = $roundStmt->get_result()->fetch_all(MYSQLI_ASSOC);
  $roundStmt->close();

  // 3) return both in one JSON payload
  echo json_encode([
    'event'  => $eventInfo,
    'rounds' => $roundDetails
  ]);
?>