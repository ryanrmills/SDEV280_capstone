<?php
  header('Content-Type: application/json');

  //creating a function to display to console to help with debugging
  

  //this is where we're going to be loading the credentials from config/db.php
  require_once __DIR__ . '/../../../config/db.php';

  try {
    $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    
  } catch (mysqli_sql_exception){
    
  };

  //This is our sql query that we'll be sending to the database to get our information
  $sql = "SELECT pdga_number, CONCAT(first_name, ' ', last_name) AS full_name, division, city, state, country, nationality, member_since FROM players";

  //What is outputted will be assigned to '$res'. We will call the query() method in 'db'
  $res = $db -> query($sql);

  //initialize an empty array where we will store
  $players = [];

  //if $res is not null AND there is a single row of data in $res
  //fetch_assoc retrieves a single of row of data, and maps the keys(columns) to its corres value
  if ($res && $res -> fetch_assoc()){

    //while there is a row that is returned by 'fetch_assoc', it continues to run
    while($row = $res -> fetch_assoc()){

      //and adds the new row of data to $players list
      $players[] = $row;
    }
  }

  //This turns the players list into a JSON file?
  echo json_encode(["data" => $players]);
?>