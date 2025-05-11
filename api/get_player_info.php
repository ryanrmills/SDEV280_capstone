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
//1) Main player summary (wins, top_tens, podiums, total_events)

$sql = 
  "SELECT
    players.pdga_number, 
    CONCAT(players.first_name, ' ',players.last_name) AS full_name,
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
  GROUP BY players.pdga_number
";

//query for finding a player's average place
$avgPlaceQuery =
"SELECT ROUND(AVG(place), 0) AS avg_place
  FROM event_results
  WHERE pdga_number = ?
";

$avgStrokesQuery = 
"SELECT 
    AVG(event_totals.total_score) AS avg_strokes_per_event
 FROM (
    SELECT 
      pdga_event_id,
      SUM(score) AS total_score
    FROM event_rounds
    WHERE pdga_number = ?
    GROUP BY pdga_event_id
 ) AS event_totals
";


$oneYearAgo = date('Y-m-d', strtotime('-12 months'));

if (isset($_GET['is_last_12_months']) == true){
  $sql = 
  "SELECT
      players.pdga_number,
      CONCAT(players.first_name, ' ', players.last_name) AS full_name,
      players.division,
      CONCAT(players.city, ', ', players.state) AS hometown,
      players.nationality,
      players.member_since,
      SUM(CASE WHEN event_results.place = 1 THEN 1 ELSE 0 END) AS wins,
      SUM(CASE WHEN event_results.place <= 10 THEN 1 ELSE 0 END) AS top_tens,
      SUM(CASE WHEN event_results.place <= 3 THEN 1 ELSE 0 END) AS podiums,
      SUM(event_results.cash) AS earnings,
      ROUND(AVG(event_results.event_rating), 0) AS avg_rating,
      COUNT(event_results.place) AS total_events
    FROM
      players
    LEFT JOIN
      event_results
        ON players.pdga_number = event_results.pdga_number
    LEFT JOIN
      events
        ON event_results.pdga_event_id = events.pdga_event_id
    WHERE
      players.pdga_number = ?
      AND events.start_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY
      players.pdga_number
    ";

  $avgPlaceQuery =
  "SELECT
    ROUND(AVG(event_results.place), 0) AS avg_place
  FROM
    event_results
  JOIN
    events
      ON event_results.pdga_event_id = events.pdga_event_id
        AND events.start_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
  WHERE
    event_results.pdga_number = ?
  ";

  $avgStrokesQuery =
  "SELECT
    AVG(event_totals.total_score) AS avg_strokes_per_event
   FROM (
    SELECT
      event_rounds.pdga_event_id,
      SUM(event_rounds.score) AS total_score
    FROM
      event_rounds
    JOIN
      events
        ON event_rounds.pdga_event_id = events.pdga_event_id
          AND events.start_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    WHERE
      event_rounds.pdga_number = ?
    GROUP BY
      event_rounds.pdga_event_id
   ) AS event_totals
  ";
}


/**
 * For prepare and execute for the main query
 */
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

/**
 * For preparing and executing the query for average place
 */
$avgPlaceStmt = $db -> prepare($avgPlaceQuery);
$avgPlaceStmt->bind_param('i', $pdga);
$avgPlaceStmt->execute();
$avgPlaceRow = $avgPlaceStmt->get_result()->fetch_assoc();
$avgPlace = $avgPlaceRow ? (float)$avgPlaceRow['avg_place'] : null;
$avgPlaceStmt->close();
$player['avg_place'] = $avgPlace !== null ? round($avgPlace, 1) : null;


/**
 * For preparing and executing the query for average strokes
 */
$avgStrokesStmt = $db -> prepare($avgStrokesQuery);
$avgStrokesStmt->bind_param('i', $pdga);
$avgStrokesStmt->execute();
$avgStrokesRow = $avgStrokesStmt->get_result()->fetch_assoc();
$avgStrokes = $avgStrokesRow ? (float)$avgStrokesRow['avg_strokes_per_event'] : null;
$avgStrokesStmt->close();
$player['avg_strokes_per_event'] = $avgStrokes !== null ? round($avgStrokes, 1) : null;


/**
 * Echoing the final json format data
 */
echo json_encode([
  'player' => $player
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
