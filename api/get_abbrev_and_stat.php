<?php
//returning a json
header('Content-Type: application/json');

//load the database credentials
require_once __DIR__ . '/../../../config/db.php';// defines $db = new mysqli(...)

//Connecting to the database
$db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
$db->set_charset('utf8mb4');

$sql = 
'SELECT
  stats.stat_id,
  stats.abbreviation,
  stats.stat_name,
  stats.description
FROM
  stats
WHERE 
  stats.stat_id BETWEEN 1 AND 18
';

$stmt = $db->query($sql);

$name = [];
$id = [];
$fullName = [];
$desc = [];

if ($stmt && $stmt -> num_rows > 0){
  
  while ($row = $stmt->fetch_assoc()) {
    $id[] = $row['stat_id'];
    $name[] = $row['abbreviation'];
    $fullName[] = $row['stat_name'];
    $desc[] = $row['description'];
  }

}


echo json_encode([
  "id" => $id,
  "name" => $name,
  "fullName" => $fullName,
  "desc" => $desc
]);