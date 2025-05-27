<?php
  //this is for displaying errors and debugging
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
  
  header('Content-Type: application/json');

  require_once __DIR__ . '/../../../config/db.php';

  $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  $db->set_charset('utf8mb4');

  //what do I need?
  /**
   * When the user chooses a stat, the players shown will pop up
   * and will show up in the order that they are ranked.
   * 
   * the get request will INITIALLY involve nothing,
   * as players shown will be judged by their rating.
   * 
   * pdga_number
   * full name
   * 
   */
  // $sql = 
  // "SELECT
  //   players.pdga_number,
  //   CONCAT(players.first_name, ' ', players.last_name) AS full_name,
  //   COUNT(DISTINCT events.pdga_event_id) AS total_events,
  //   COUNT(event_rounds.event_round_id) AS total_rounds,
  //   ROUND(AVG(event_rounds.rating), 1) AS average_rating
  // FROM
  //   players
  // JOIN
  //   event_rounds
  //     ON players.pdga_number = event_rounds.pdga_number
  // JOIN
  //   events
  //     ON event_rounds.pdga_event_id = events.pdga_event_id
  // WHERE
  //   events.start_date
  //     BETWEEN DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
  //         AND CURDATE()
  // GROUP BY
  //   players.pdga_number
  // ORDER BY
  //   average_rating DESC;
  // ";

  if (!isset($_GET['pdga_number'])){
    echo json_encode(["error" => "missing pdga number"]);
  }

  $pdga = intval($_GET['pdga_number']);
  

  $sql =
  "WITH target AS (
      SELECT
        players.division AS target_division
      FROM players
      WHERE players.pdga_number = ?
    )

    SELECT
      ranked.pdga_number,
      ranked.full_name,
      ranked.total_events,
      ranked.total_rounds,
      ranked.average_rating AS average_stat_value,
      ROW_NUMBER() OVER (ORDER BY ranked.average_rating DESC) AS player_rank
    FROM (
      SELECT
        players.pdga_number,
        CONCAT(players.first_name, ' ', players.last_name) AS full_name,
        COUNT(DISTINCT events.pdga_event_id)   AS total_events,
        COUNT(event_rounds.event_round_id)     AS total_rounds,
        ROUND(AVG(event_rounds.rating), 1)     AS average_rating
      FROM
        players
      JOIN
        event_rounds
          ON players.pdga_number = event_rounds.pdga_number
      JOIN
        events
          ON event_rounds.pdga_event_id = events.pdga_event_id
      JOIN
        target
          ON players.division = target.target_division
      WHERE
        events.start_date
          BETWEEN DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
              AND CURDATE()
      GROUP BY
        players.pdga_number
    ) AS ranked
    ORDER BY
      ranked.average_rating DESC;
  ";

  $id = 0;

  if (isset($_GET['id'])){

    $id = intval($_GET['id']);
    $sql =
      "WITH target_player AS (
        -- 1) Find the division of the specified player
        SELECT
          players.division AS target_division
        FROM
          players
        WHERE
          players.pdga_number = ?                 -- bind: the PDGA number of the player whose division to match
      )

      SELECT
        ranked.pdga_number,
        ranked.full_name,
        ranked.total_events,
        ranked.total_rounds,
        ROUND(ranked.average_stat_value, 2)      AS average_stat_value,
        ROW_NUMBER() OVER (
          ORDER BY ranked.average_stat_value DESC
        )                                        AS player_rank
      FROM (
        -- 2) Compute each player’s average for the given stat, restricted to that division and last 12 months
        SELECT
          players.pdga_number,
          CONCAT(players.first_name, ' ', players.last_name) AS full_name,
          COUNT(DISTINCT events.pdga_event_id)     AS total_events,
          COUNT(event_rounds.event_round_id)       AS total_rounds,
          AVG(event_round_player_stats.printed_value) AS average_stat_value
        FROM
          event_round_player_stats
        JOIN
          event_rounds
            ON event_round_player_stats.event_round_id = event_rounds.event_round_id
        JOIN
          events
            ON event_rounds.pdga_event_id = events.pdga_event_id
        JOIN
          players
            ON event_rounds.pdga_number = players.pdga_number
        JOIN
          target_player
            ON players.division = target_player.target_division
        WHERE
          event_round_player_stats.stat_id = $id     -- bind: the stat_id to rank by
          AND events.start_date
              BETWEEN DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
                  AND CURDATE()
        GROUP BY
          players.pdga_number
      ) AS ranked
      ORDER BY
        ranked.average_stat_value DESC;
      ";
  }

  
  $stmt = $db -> prepare($sql);
  $stmt -> bind_param('i', $pdga);
  $stmt -> execute();
  $response = $stmt -> get_result();

  $rankings = [];

  if ($response -> num_rows > 0){
    while ($row = $response -> fetch_assoc()){
      $rankings[] = $row;
    }
  }

 

  echo json_encode($rankings);
?>