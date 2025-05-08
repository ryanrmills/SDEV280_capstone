<?php
//returning a json
header('Content-Type: application/json');

//load the database credentials
require_once __DIR__ . '/../../../config/db.php';// defines $db = new mysqli(...)

//Connecting to the database
$db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

//Read and validate the PDGA number
if (! isset($_GET['pdga_number'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing pdga_number']);
    exit;
}

//Grabbing the pdga number and assigning it to the variable
$pdgaNumber = intval($_GET['pdga_number']);

$year = 0;

$statIds = [1,3,7];
$ids = implode(',', $statIds);

$sql = "SELECT
    stats.stat_id,
    stats.abbreviation,
    ROUND(AVG(event_round_player_stats.printed_value),0) AS avg_percentage
  FROM event_round_player_stats
  JOIN event_rounds
    ON event_round_player_stats.event_round_id = event_rounds.event_round_id
  JOIN stats
    ON event_round_player_stats.stat_id = stats.stat_id
  JOIN events
    ON event_rounds.pdga_event_id = events.pdga_event_id
  WHERE event_rounds.pdga_number = ?
    AND stats.stat_id IN ($ids)
    -- AND event_round_player_stats.stat_count   IS NOT NULL -- exclude null‑count rows
    -- AND event_round_player_stats.printed_value IS NOT NULL
  GROUP BY stats.stat_id, stats.abbreviation
  ORDER BY FIELD(stats.stat_id, $ids)
";

if (isset($_GET['year'])){
  $year = intval($_GET['year']);

  $sql = "SELECT
    stats.stat_id,
    stats.abbreviation,
    ROUND(AVG(event_round_player_stats.printed_value),0) AS avg_percentage
  FROM event_round_player_stats
  JOIN event_rounds
    ON event_round_player_stats.event_round_id = event_rounds.event_round_id
  JOIN stats
    ON event_round_player_stats.stat_id = stats.stat_id
  JOIN events
    ON event_rounds.pdga_event_id = events.pdga_event_id
  WHERE event_rounds.pdga_number = ?
    AND stats.stat_id IN ($ids)
    AND YEAR(events.start_date) = $year
    -- AND event_round_player_stats.stat_count   IS NOT NULL -- exclude null‑count rows
    -- AND event_round_player_stats.printed_value IS NOT NULL
  GROUP BY stats.stat_id, stats.abbreviation
  ORDER BY FIELD(stats.stat_id, $ids)
";
}

$stmt = $db->prepare($sql);
$stmt->bind_param('i', $pdgaNumber);
$stmt -> execute();
$res = $stmt -> get_result();

$abbrevStats = [];
$values = [];
while ($row = $res->fetch_assoc()) {
    $abbrevStats[] = $row['abbreviation'];
    // Round to one decimal if you like, or leave raw
    $values[] = round((float)$row['avg_percentage'], 1);
}

// $statement->close();

// 6. Return the JSON payload
echo json_encode([
    'stat' => $abbrevStats,
    'values' => $values,
]);

?>