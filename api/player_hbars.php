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

$sql = 
"SELECT
  stats.stat_id,
  stats.abbreviation,
  stats.stat_name,
  ROUND(ranked.percentile, 1) AS percentile
FROM (
  SELECT
    player_avgs.pdga_number,
    player_avgs.division,
    player_avgs.stat_id,
    CUME_DIST() OVER (
      PARTITION BY player_avgs.division, player_avgs.stat_id
      ORDER BY player_avgs.average_value
    ) * 100 AS percentile
  FROM (
    SELECT
      event_round_player_stats.stat_id   AS stat_id,
      event_rounds.pdga_number           AS pdga_number,
      event_rounds.division              AS division,
      AVG(event_round_player_stats.printed_value) AS average_value
    FROM event_round_player_stats
    JOIN event_rounds
      ON event_round_player_stats.event_round_id = event_rounds.event_round_id
    GROUP BY
      event_rounds.pdga_number,
      event_rounds.division,
      event_round_player_stats.stat_id
  ) AS player_avgs
) AS ranked
JOIN stats
  ON ranked.stat_id = stats.stat_id
WHERE
  ranked.pdga_number = ?         -- bind your player’s PDGA number here
  AND ranked.stat_id BETWEEN 1 AND 18
ORDER BY
  -- ranked.stat_id;
  percentile DESC;
";

$stmt = $db->prepare($sql);
$stmt->bind_param('i', $pdgaNumber);
$stmt -> execute();
$res = $stmt -> get_result();

$abbrevStats = [];
$percentile = [];
while ($row = $res->fetch_assoc()) {
    $abbrevStats[] = $row['abbreviation'];
    
    $percentile[] = round((float)$row['percentile'], 0);

}

// $statement->close();

// 6. Return the JSON payload
echo json_encode([
    'stat_abbrev' => $abbrevStats,
    'percentile' => $percentile,
]);

?>