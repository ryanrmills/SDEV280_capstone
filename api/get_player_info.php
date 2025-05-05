<?php
//this is for displaying errors and debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//This is to say 'All of this code is meant to return a json format data'
header('Content-Type: application/json');

//this is to tell the code where to get the parameters. This is the file path
require_once __DIR__ . '/../../../config/db.php';

//if the pdga number is not set, then return the error
if (!isset($_GET['pdga_number'])) {
  echo json_encode(['error' => 'Missing pdga_number']);
  exit;
}

// Connect (using your config constants)
$db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

//if the 'connect_error' property has a value, then return the http error code
// and return a json format error, then exit or end the process.
if ($db->connect_error) {
  http_response_code(500);
  echo json_encode(['error'=>'DB connection failed: '.$db->connect_error]);
  exit;
}

//assign the pdga number, that is an int value and retrieved from GET, to the pdga variable
$pdga = intval($_GET['pdga_number']);

// ——— 1) Main player summary (wins, top_tens, podiums, total_events) ———

$sql = "SELECT
    players.pdga_number, 
    first_name,
    last_name,
    players.division,
    CONCAT(players.city, ', ', players.state) AS hometown,
    nationality,
    member_since,
    SUM(CASE WHEN event_results.place = 1 THEN 1 ELSE 0 END) AS wins,
    SUM(CASE WHEN event_results.place <= 10 THEN 1 ELSE 0 END) AS top_tens,
    SUM(CASE WHEN event_results.place <= 3 THEN 1 ELSE 0 END) AS podiums,
    SUM(event_results.cash) AS earnings,
    ROUND(AVG(event_rating), 0) AS avg_rating,
    COUNT(event_results.place) AS total_events
  FROM players
  LEFT JOIN event_results 
    ON players.pdga_number = event_results.pdga_number
  JOIN events ON event_results.pdga_event_id = events.pdga_event_id
  WHERE players.pdga_number = ?
   -- AND events.start_date BETWEEN '2024-01-01' AND '2025-01-01'
  GROUP BY players.pdga_number
";

$stmt = $db->prepare($sql);

if (!$stmt) {
  echo json_encode(['error' => 'Prepare failed: ' . $db->error]);
  exit;
}
$stmt->bind_param('i', $pdga);
$stmt->execute();
$player = $stmt->get_result()->fetch_assoc();
$stmt->close();

//if the player variable is null, then return an error, and end the process
if (!$player) {
  echo json_encode(['error' => 'Athlete not found.']);
  exit;
}

//querying average place across all events
$avgPlaceStmt = $db->prepare("SELECT ROUND(AVG(place), 0) AS avg_place
    FROM event_results
   WHERE pdga_number = ?
");
$avgPlaceStmt->bind_param('i', $pdga);
$avgPlaceStmt->execute();
$avgPlaceRow = $avgPlaceStmt->get_result()->fetch_assoc();
$avgPlace = $avgPlaceRow ? (float)$avgPlaceRow['avg_place'] : null;
$avgPlaceStmt->close();
$player['avg_place'] = $avgPlace !== null ? round($avgPlace, 1) : null;


// calculating the average strokes per event ———
$avgStrokesStmt = $db->prepare("SELECT AVG(event_totals.total_score) AS avg_strokes_per_event
    FROM (
           SELECT pdga_event_id,
                  SUM(score) AS total_score
             FROM event_rounds
            WHERE pdga_number = ?
            GROUP BY pdga_event_id
         ) AS event_totals
");
$avgStrokesStmt->bind_param('i', $pdga);
$avgStrokesStmt->execute();
$avgStrokesRow = $avgStrokesStmt->get_result()->fetch_assoc();
$avgStrokes = $avgStrokesRow ? (float)$avgStrokesRow['avg_strokes_per_event'] : null;
$avgStrokesStmt->close();
$player['avg_strokes_per_event'] = $avgStrokes !== null ? round($avgStrokes, 1) : null;

//query to display the list of events
// $eventsStmt = $db->prepare("SELECT DISTINCT
//     event_rounds.pdga_event_id,
//     events.name,
//     events.start_date,
//     events.end_date,
//     events.tier,
//     events.city,
//     events.state,
//     events.country
//   FROM event_rounds
//   JOIN events
//     ON event_rounds.pdga_event_id = events.pdga_event_id
//   WHERE event_rounds.pdga_number = ?
//   ORDER BY events.start_date DESC
// ");
// $eventsStmt->bind_param('i', $pdga);
// $eventsStmt->execute();
// $events = $eventsStmt->get_result()->fetch_all(MYSQLI_ASSOC);
// $eventsStmt->close();

// //all round‐stat details
// $statsStmt = $db->prepare("SELECT
//       event_rounds.pdga_event_id,
//       event_rounds.event_round_id,
//       event_rounds.round,
//       event_rounds.score,
//       event_rounds.division,
//       event_round_player_stats.stat_id,
//       stats.stat_name,
//       event_round_player_stats.stat_count,
//       event_round_player_stats.opportunity_count,
//       event_round_player_stats.printed_value
//     FROM event_rounds
//     JOIN event_round_player_stats
//       ON event_rounds.event_round_id = event_round_player_stats.event_round_id
//     JOIN stats
//       ON stats.stat_id = event_round_player_stats.stat_id
//     WHERE event_rounds.pdga_number = ?
//     ORDER BY
//       event_rounds.pdga_event_id,
//       event_rounds.round,
//       stats.stat_id
// ");
// $statsStmt->bind_param('i', $pdga);
// $statsStmt->execute();
// $round_stats = $statsStmt->get_result()->fetch_all(MYSQLI_ASSOC);
// $statsStmt->close();




//─── 6) output everything ───────────────────────────────────────────────────
echo json_encode([
  'player'      => $player,
  // 'events'      => $events,
  // 'round_stats' => $round_stats
]);
?>