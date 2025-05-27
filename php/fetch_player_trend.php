<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$connection = new mysqli("localhost", "root", "", "sdev280capstone");

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$pdga = $_GET['pdga'] ?? null;

if (!$pdga) {
    echo json_encode(['error' => 'Missing player ID']);
    exit;
}

$query = "
    SELECT 
        ev.name AS event_name,
        ev.start_date,
        er.round,
        ROUND(AVG(CASE WHEN ps.stat_id = 1 THEN ps.printed_value END), 2) AS FWH,
        ROUND(AVG(CASE WHEN ps.stat_id = 2 THEN ps.printed_value END), 2) AS C2P,
        ROUND(AVG(CASE WHEN ps.stat_id = 4 THEN ps.printed_value END), 2) AS SCR
    FROM event_round_player_stats ps
    JOIN event_rounds er ON ps.event_round_id = er.event_round_id
    JOIN events ev ON er.pdga_event_id = ev.pdga_event_id
    WHERE er.pdga_number = ?
    GROUP BY ev.name, ev.start_date, er.round
    ORDER BY ev.start_date, er.round
";

$stmt = $connection->prepare($query);
$stmt->bind_param("i", $pdga);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_all(MYSQLI_ASSOC);

header('Content-Type: application/json');
echo json_encode($data);
