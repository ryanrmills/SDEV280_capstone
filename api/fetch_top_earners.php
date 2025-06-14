<?php
require_once __DIR__ . '/../../../config/db.php';

$connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$query = "
    SELECT 
        p.pdga_number,
        CONCAT(p.first_name, ' ', p.last_name) AS player_name,
        ROUND(SUM(er.cash), 2) AS total_cash
    FROM event_results er
    JOIN players p ON er.pdga_number = p.pdga_number
    WHERE er.cash IS NOT NULL
    GROUP BY er.pdga_number
    ORDER BY total_cash DESC
    LIMIT 10
";

$result = $connection->query($query);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

header('Content-Type: application/json');
echo json_encode($data);
