<?php
$connection = new mysqli("localhost", "root", "", "sdev280capstone");

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$oneYearAgo = date('Y-m-d', strtotime('-12 months'));

$query = "
    SELECT 
        p.pdga_number,
        CONCAT(p.first_name, ' ', p.last_name) AS player_name,
        ROUND(AVG(er.rating), 2) AS avg_rating
    FROM event_rounds er
    JOIN events e ON er.pdga_event_id = e.pdga_event_id
    JOIN players p ON er.pdga_number = p.pdga_number
    WHERE e.start_date >= ?
      AND er.rating IS NOT NULL
    GROUP BY p.pdga_number
    ORDER BY avg_rating DESC
    LIMIT 10
";

$stmt = $connection->prepare($query);
$stmt->bind_param("s", $oneYearAgo);
$stmt->execute();
$result = $stmt->get_result();

$data = $result->fetch_all(MYSQLI_ASSOC);

header('Content-Type: application/json');
echo json_encode($data);
