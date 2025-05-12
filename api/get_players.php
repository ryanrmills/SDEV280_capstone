<?php
  //this is for displaying errors and debugging
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
  
  header('Content-Type: application/json');

  //creating a function to display to console to help with debugging
  

  //this is where we're going to be loading the credentials from config/db.php
  require_once __DIR__ . '/../../../config/db.php';

  $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  $db->set_charset('utf8mb4');

  //This is our sql query that we'll be sending to the database to get our information
  $sql = "SELECT pdga_number, CONCAT(first_name, ' ', last_name) AS full_name, division, city, state, country, nationality, member_since FROM players";

  //What is outputted will be assigned to '$res'. We will call the query() method in 'db'
  $res = $db -> query($sql);

  //initialize an empty array where we will store
  $players = [];

  //if $res is not null AND there is a single row of data in $res
  //fetch_assoc retrieves a single of row of data, and maps the keys(columns) to its corres value
  if ($res && $res -> num_rows > 0){

    //while there is a row that is returned by 'fetch_assoc', it continues to run
    while($row = $res -> fetch_assoc()){

      //and adds the new row of data to $players list
      $players[] = $row;
    }
  }
  


// array_walk_recursive($players, function(&$v){
//   $v = mb_convert_encoding($v, 'UTF-8', 'UTF-8');
// });

// force the correct header (if not already)
//header('Content-Type: application/json'); //; charset=UTF-8

// pretty‑print only if you’re manually inspecting
/*echo json_encode([
  'data' => $players
], JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);*/

// stop any further output
//exit;
  
//   echo json_encode(['data'=>$players]);
  
//   if (json_last_error() !== JSON_ERROR_NONE) {
//     error_log('JSON encode error: ' . json_last_error_msg());
//   }



  echo json_encode(["data" => $players]);
?>