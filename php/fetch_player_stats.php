<?php
$connection = new mysqli("localhost", "root", "", "sdev280capstone");

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$pdga = $_GET['pdga'] ?? null;

if (!$pdga) {
    echo json_encode(["error" => "Missing player ID"]);
    exit;
}

$query = "
    SELECT 
        ROUND(AVG(CASE WHEN ps.stat_id = 1 THEN ps.printed_value END), 2) AS FWH,
        ROUND(AVG(CASE WHEN ps.stat_id = 2 THEN ps.printed_value END), 2) AS C2P,
        ROUND(AVG(CASE WHEN ps.stat_id = 3 THEN ps.printed_value END), 2) AS BRD,
        ROUND(AVG(CASE WHEN ps.stat_id = 4 THEN ps.printed_value END), 2) AS SCR,
        ROUND(AVG(CASE WHEN ps.stat_id = 5 THEN ps.printed_value END), 2) AS C1X
    FROM 
        event_round_player_stats ps
    JOIN 
        event_rounds r ON ps.event_round_id = r.event_round_id
    WHERE 
        r.pdga_number = ?
";

$stmt = $connection->prepare($query);
$stmt->bind_param("i", $pdga);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();

header('Content-Type: application/json');
echo json_encode($data);
