<?php
$connection = new mysqli("localhost", "root", "", "sdev280capstone");

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$query = "
    SELECT DISTINCT pdga_number, CONCAT(first_name, ' ', last_name) AS player_name 
    FROM players 
    ORDER BY last_name ASC
";

$result = $connection->query($query);
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

header('Content-Type: application/json');
echo json_encode($data);
