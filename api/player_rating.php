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

// $year = 0;

// $statIds = [1,3,7];
// $ids = implode(',', $statIds);

$sql = 
"SELECT
    events.start_date AS event_date,
    ROUND(
      AVG(event_results.event_rating) OVER (
        ORDER BY events.start_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
      )
    , 2) AS cumulative_average_rating
  FROM
    event_results
  JOIN
    events
      ON event_results.pdga_event_id = events.pdga_event_id
  WHERE
    event_results.pdga_number = ?       -- bind your player’s PDGA number here
  ORDER BY
    events.start_date ASC;
";


$stmt = $db->prepare($sql);
$stmt->bind_param('i', $pdgaNumber);
$stmt -> execute();
$res = $stmt -> get_result();

$dates = [];
$values = [];
while ($row = $res->fetch_assoc()) {
    $dates[] = $row['event_date'];
    // Round to one decimal if you like, or leave raw
    $values[] = round((float)$row['cumulative_average_rating'], 1);
}

// $statement->close();

// 6. Return the JSON payload
echo json_encode([
    'dates' => $dates,
    'values' => $values
]);

?>