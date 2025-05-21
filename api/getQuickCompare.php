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
$db->set_charset('utf8mb4');

//if the 'connect_error' property has a value, then return the http error code
// and return a json format error, then exit or end the process.
if ($db->connect_error) {
  http_response_code(500);
  echo json_encode(['error'=>'DB connection failed: '.$db->connect_error]);
  exit;
}

//assign the pdga number, that is an int value and retrieved from GET, to the pdga variable
$pdga = intval($_GET['pdga_number']);
$year = isset($_GET['year']) ? intval($_GET['year']) : '';
//1) Main player summary (wins, top_tens, podiums, total_events)

$sql = 
  "SELECT
    ROUND(AVG(event_rating), 0) AS avg_rating,
    SUM(event_results.cash) AS earnings,
    SUM(CASE WHEN event_results.place = 1 THEN 1 ELSE 0 END) AS wins,
    SUM(CASE WHEN event_results.place <= 3 THEN 1 ELSE 0 END) AS podiums,
    SUM(CASE WHEN event_results.place <= 10 THEN 1 ELSE 0 END) AS top_tens,
    COUNT(event_results.place) AS total_events
  FROM players
  LEFT JOIN event_results 
    ON players.pdga_number = event_results.pdga_number
  JOIN events ON event_results.pdga_event_id = events.pdga_event_id
  WHERE players.pdga_number = ?
    AND YEAR(events.start_date) = ?
  GROUP BY players.pdga_number
";

//query for finding a player's average place
$avgPlaceQuery =
"SELECT ROUND(AVG(place), 0) AS avg_place
  FROM event_results
  JOIN events
    ON event_results.pdga_event_id = events.pdga_event_id
  WHERE pdga_number = ?
    AND YEAR(events.start_date) = ?
";

$avgStrokesQuery = 
"SELECT 
    AVG(event_totals.total_score) AS avg_strokes_per_event
 FROM (
    SELECT 
      event_rounds.pdga_event_id,
      SUM(score) AS total_score
    FROM event_rounds
    JOIN events
        ON event_rounds.pdga_event_id = events.pdga_event_id
    WHERE pdga_number = ?
        AND YEAR(events.start_date) = ?
    GROUP BY pdga_event_id
 ) AS event_totals
";

$statIds = [1,3,7];
$ids = implode(',', $statIds);
$mainThreeQuery = 
"SELECT
    -- stats.stat_id,
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
    AND YEAR(events.start_date) = ?
    -- AND event_round_player_stats.stat_count   IS NOT NULL -- exclude null‑count rows
    -- AND event_round_player_stats.printed_value IS NOT NULL
  GROUP BY stats.stat_id, stats.abbreviation
  ORDER BY FIELD(stats.stat_id, $ids)
";





/**
 * For prepare and execute for the main query
 */
$stmt = $db->prepare($sql);

if (!$stmt) {
  echo json_encode(['error' => 'Prepare failed: ' . $db->error]);
  exit;
}
$stmt->bind_param('ii', $pdga, $year);
$stmt->execute();
$player = $stmt->get_result()->fetch_assoc();
$stmt->close();

//if the player variable is null, then return an error, and end the process
if (!$player) {
  echo json_encode(['error' => 'Athlete not found.']);
  exit;
}

$avgStrokesStmt = $db -> prepare($avgStrokesQuery);
$avgStrokesStmt->bind_param('ii', $pdga, $year);
$avgStrokesStmt->execute();
$avgStrokesRow = $avgStrokesStmt->get_result()->fetch_assoc();
$avgStrokes = $avgStrokesRow ? (float)$avgStrokesRow['avg_strokes_per_event'] : null;
$avgStrokesStmt->close();
$player['avg_strokes_per_event'] = $avgStrokes !== null ? round($avgStrokes, 1) : null;

/**
 * For preparing and executing the query for average place
 */
$avgPlaceStmt = $db -> prepare($avgPlaceQuery);
$avgPlaceStmt->bind_param('ii', $pdga, $year);
$avgPlaceStmt->execute();
$avgPlaceRow = $avgPlaceStmt->get_result()->fetch_assoc();
$avgPlace = $avgPlaceRow ? (float)$avgPlaceRow['avg_place'] : null;
$avgPlaceStmt->close();
$player['avg_place'] = $avgPlace !== null ? round($avgPlace, 1) : null;


$mainThree = [];
$mainThreeStmt = $db->prepare($mainThreeQuery);
$mainThreeStmt->bind_param('ii', $pdga, $year);
$mainThreeStmt -> execute();
$mainThreeRes = $mainThreeStmt -> get_result();

if ($mainThreeRes -> num_rows > 0){
    while ($mainThreeRow = $mainThreeRes->fetch_assoc()){
        $mainThree[] = $mainThreeRow;
    }
}


/**
 * For preparing and executing the query for average strokes
 */


/**
 * Echoing the final json format data
 */
echo json_encode([
  'player' => $player,
  'main3' => $mainThree
]);
/*
LEARNING EXP: DATE FORMAT

SELECT
  players.pdga_number,
  CONCAT(players.first_name, ' ', players.last_name) as full_name,
  players.division,
  CONCAT(players.city, ', ', players.state) as hometown,
  nationality,
  member_since,
  (
    SELECT
      COUNT(event_results.pdga_number)
    FROM
      event_results
	JOIN events
		ON event_results.pdga_event_id = events.pdga_event_id
    WHERE
      event_results.pdga_number = 75412
      AND event_results.place = 1
      AND events.start_date >= '05-11-2024'
  ) AS wins,
  (
	SELECT
      	COUNT(DISTINCT event_results.pdga_event_id)
    FROM
      event_results
	WHERE event_results.place <= 10
    AND pdga_number = 75412
  ) as top_tens,
  (
    SELECT
      COUNT(DISTINCT event_results.pdga_event_id)
    FROM
      event_results
    WHERE
      event_results.pdga_number = 75412
      AND event_results.place <= 3
  ) AS podiums,
  (
    SELECT
      SUM(event_results.cash)
    FROM
      event_results
    JOIN events
      on event_results.pdga_event_id = events.pdga_event_id
    WHERE event_results.pdga_number = 75412
    AND events.start_date >= '2024-05-11'
  ) AS earnings,
  (
    SELECT
      COUNT(DISTINCT events.pdga_event_id)
    FROM
      event_rounds
    JOIN
      events
        ON event_rounds.pdga_event_id = events.pdga_event_id
    WHERE
      event_rounds.pdga_number = 75412
      AND events.start_date >= '2024-05-11'
  ) AS total_events,
  (
  	SELECT
      AVG(event_results.event_rating)
	FROM
      event_results
	JOIN events
      ON event_results.pdga_event_id = events.pdga_event_id
    WHERE pdga_number = 75412
      AND events.start_date >= '2024-05-11'
  ) AS avg_rating

FROM
  players
WHERE
  players.pdga_number = 75412;

----------------------------------------------------------

SELECT
  players.pdga_number,
  CONCAT(players.first_name, ' ', players.last_name) as full_name,
  players.division,
  CONCAT(players.city, ', ', players.state) as hometown,
  nationality,
  member_since,
  (
    SELECT
      COUNT(event_results.pdga_number)
    FROM
      event_results
  JOIN events
    ON event_results.pdga_event_id = events.pdga_event_id
    WHERE
      event_results.pdga_number = 75412
      AND event_results.place = 1
      AND events.start_date >= '05-11-2024'
  ) AS wins,
  (
  SELECT
        COUNT(event_results.pdga_number)
    FROM
      event_results
  WHERE event_results.place <= 10
    AND pdga_number = 75412
  ) as top_tens,
  (
    SELECT
      COUNT(event_results.pdga_number)
    FROM
      event_results
    WHERE
      event_results.pdga_number = 75412
      AND event_results.place <= 3
  ) AS podiums,
  (
    SELECT
      SUM(event_results.cash)
    FROM
      event_results
    JOIN events
      on event_results.pdga_event_id = events.pdga_event_id
    WHERE event_results.pdga_number = 75412
    AND events.start_date >= '05-11-2024'
  ) AS earnings,
  (
    SELECT
      COUNT(DISTINCT events.pdga_event_id)
    FROM
      event_rounds
    JOIN
      events
        ON event_rounds.pdga_event_id = events.pdga_event_id
    WHERE
      event_rounds.pdga_number = 75412
      AND events.start_date >= '2024-05-11'
  ) AS total_events

FROM
  players
WHERE
  players.pdga_number = 75412;

*/
?>