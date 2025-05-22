<?php
  //this is for displaying errors and debugging
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
  
  header('Content-Type: application/json');

  require_once __DIR__ . '/../../../config/db.php';

  $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  $db->set_charset('utf8mb4');



  if (!isset($_GET['pdga_number'])){
    echo json_encode(["error" => "missing pdga number"]);
  }

  $pdgaNumber = intval($_GET['pdga_number']);
  

 $sql = 
 "WITH
    -- 1) pull the target player’s division
    target_player AS (
      SELECT
        players.pdga_number,
        players.division
      FROM
        players
      WHERE
        players.pdga_number = ?
    ),

    -- 2) compute every player’s average per stat _in that division_
    division_averages AS (
      SELECT
        event_round_player_stats.stat_id,
        event_rounds.pdga_number,
        players.division,
        AVG(event_round_player_stats.printed_value) AS average_value
      FROM
        event_round_player_stats
      JOIN
        event_rounds
          ON event_round_player_stats.event_round_id = event_rounds.event_round_id
      JOIN
        players
          ON event_rounds.pdga_number = players.pdga_number
      JOIN
        target_player
          ON players.division = target_player.division
      GROUP BY
        event_round_player_stats.stat_id,
        event_rounds.pdga_number
    ),

    -- 3) rank each player within the division for each stat
    ranked_averages AS (
      SELECT
        stat_id,
        pdga_number,
        average_value,
        RANK() OVER (
          PARTITION BY stat_id
          ORDER BY average_value DESC
        ) AS rank_in_division
      FROM
        division_averages
    )

  -- 4) select only the target player, join to stats for names, pick top 3
  SELECT
    ranked_averages.stat_id,
    stats.abbreviation,
    stats.stat_name,
    ROUND(ranked_averages.average_value, 2) AS player_average_value,
    ranked_averages.rank_in_division
  FROM
    ranked_averages
  JOIN
    stats
      ON ranked_averages.stat_id = stats.stat_id
  WHERE
    ranked_averages.pdga_number = ?
  ORDER BY
    player_average_value DESC
  LIMIT 3;
  
 ";

 if (isset($_GET['year'])){
  $sql = 
  "
  
  ";
 }


 $stmt = $db -> prepare($sql);
 $stmt -> bind_param('ii', $pdgaNumber, $pdgaNumber);
 $stmt -> execute();
 $res = $stmt -> get_result();

 $top3 = [];

 if ($res -> num_rows > 0){
  while ($row = $res -> fetch_assoc()){
    $top3[] = $row;
  }
 }

 echo json_encode(["top3" => $top3]);
?>