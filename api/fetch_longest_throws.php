<?php
$connection = new mysqli("localhost", "root", "", "sdev280capstone");

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$query = "
    SELECT 
        p.pdga_number,
        CONCAT(p.first_name, ' ', p.last_name) AS player_name,
        MAX(CAST(ps.printed_value AS DECIMAL(10,2))) AS longest_throw
    FROM event_round_player_stats ps
    JOIN event_rounds er ON ps.event_round_id = er.event_round_id
    JOIN players p ON er.pdga_number = p.pdga_number
    WHERE ps.stat_id = 17
      AND ps.printed_value IS NOT NULL
    GROUP BY p.pdga_number
    ORDER BY longest_throw DESC
    LIMIT 10
";

$result = $connection->query($query);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

header('Content-Type: application/json');
echo json_encode($data);
