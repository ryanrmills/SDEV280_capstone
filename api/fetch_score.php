<?php
require_once __DIR__ . '/../../../config/db.php';

$connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$division = isset($_GET['division']) ? $_GET['division'] : 'MPO';

$query = "
    SELECT 
        CONCAT(p.first_name, ' ', p.last_name) AS player_name,
        er.total_score
    FROM 
        event_results er
    JOIN 
        players p ON er.pdga_number = p.pdga_number
    WHERE 
        er.division = ?
    ORDER BY 
        er.total_score ASC
    LIMIT 10;
";

$stmt = $connection->prepare($query);
$stmt->bind_param("s", $division);
$stmt->execute();
$result = $stmt->get_result();

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

header('Content-Type: application/json');
echo json_encode($data);
