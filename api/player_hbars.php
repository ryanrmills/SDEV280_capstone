<?php
//returning a json
header('Content-Type: application/json');

//load the database credentials
require_once __DIR__ . '/../../../config/db.php';// defines $db = new mysqli(...)

//Connecting to the database
$db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
$db->set_charset('utf8mb4');

//Read and validate the PDGA number
if (! isset($_GET['pdga_number'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing pdga_number']);
    exit;
}

//Grabbing the pdga number and assigning it to the variable
$pdgaNumber = intval($_GET['pdga_number']);

$year = 0;

$event = 0;



// $sql = 
// "SELECT
//   stats.stat_id,
//   stats.abbreviation,
//   stats.stat_name,
//   ROUND(ranked.percentile, 1) AS percentile
// FROM (
//   SELECT
//     player_avgs.pdga_number,
//     player_avgs.division,
//     player_avgs.stat_id,
//     CUME_DIST() OVER (
//       PARTITION BY player_avgs.division, player_avgs.stat_id
//       ORDER BY player_avgs.average_value
//     ) * 100 AS percentile
//   FROM (
//     SELECT
//       event_round_player_stats.stat_id   AS stat_id,
//       event_rounds.pdga_number           AS pdga_number,
//       event_rounds.division              AS division,
//       AVG(event_round_player_stats.printed_value) AS average_value
//     FROM event_round_player_stats
//     JOIN event_rounds
//       ON event_round_player_stats.event_round_id = event_rounds.event_round_id
//     GROUP BY
//       event_rounds.pdga_number,
//       event_rounds.division,
//       event_round_player_stats.stat_id
//   ) AS player_avgs
// ) AS ranked
// JOIN stats
//   ON ranked.stat_id = stats.stat_id
// WHERE
//   ranked.pdga_number = ?         -- bind your player’s PDGA number here
//   AND ranked.stat_id BETWEEN 1 AND 18
// ORDER BY
//   -- ranked.stat_id;
//   percentile DESC;
// ";

// if (isset($_GET['year'])){
//   $year = intval($_GET['year']);

//   $sql =
//   "SELECT
//     stats.stat_id,
//     stats.abbreviation,
//     stats.stat_name,
//     ROUND(ranked.percentile, 1) AS percentile
//   FROM (
//     -- 2) Rank each player’s average within their division, for the chosen year
//     SELECT
//       player_averages.pdga_number,
//       player_averages.division,
//       player_averages.stat_id,
//       CUME_DIST() OVER (
//         PARTITION BY player_averages.division, player_averages.stat_id
//         ORDER BY player_averages.average_value
//       ) * 100 AS percentile
//     FROM (
//       -- 1) Compute each player’s average printed_value per stat in that year
//       SELECT
//         event_round_player_stats.stat_id,
//         event_rounds.pdga_number,
//         event_rounds.division,
//         AVG(event_round_player_stats.printed_value) AS average_value
//       FROM event_round_player_stats
//       JOIN event_rounds
//         ON event_round_player_stats.event_round_id = event_rounds.event_round_id
//       JOIN events
//         ON event_rounds.pdga_event_id = events.pdga_event_id
//       WHERE
//         YEAR(events.start_date) = $year      -- bind your desired year here
//       GROUP BY
//         event_rounds.pdga_number,
//         event_rounds.division,
//         event_round_player_stats.stat_id
//     ) AS player_averages
//   ) AS ranked
//   JOIN stats
//     ON ranked.stat_id = stats.stat_id
//   WHERE
//     ranked.pdga_number = ?              -- bind your player’s PDGA number here
//     AND ranked.stat_id BETWEEN 1 AND 18
//   ORDER BY
//     percentile DESC;
//   ";
// }

// if (isset($_GET['event'])){
//   $event = intval($_GET['event']);

//   $sql = 
//   "SELECT
//     stats.stat_id,
//     stats.abbreviation,
//     stats.stat_name,
//     ROUND(ranked.percentile, 1) AS percentile
//   FROM (
//     -- Step 2: rank each player’s average within their division, for the chosen year and event
//     SELECT
//       player_averages.pdga_number,
//       player_averages.division,
//       player_averages.stat_id,
//       CUME_DIST() OVER (
//         PARTITION BY player_averages.division, player_averages.stat_id
//         ORDER BY player_averages.average_value
//       ) * 100 AS percentile
//     FROM (
//       -- Step 1: compute each player’s average printed_value per stat,
//       -- only for rounds in the specified year and event
//       SELECT
//         event_round_player_stats.stat_id,
//         event_rounds.pdga_number,
//         event_rounds.division,
//         AVG(event_round_player_stats.printed_value) AS average_value
//       FROM event_round_player_stats
//       JOIN event_rounds
//         ON event_round_player_stats.event_round_id = event_rounds.event_round_id
//       JOIN events
//         ON event_rounds.pdga_event_id = events.pdga_event_id
//       WHERE
//         YEAR(events.start_date)    = $year    -- bind: desired year
//         AND events.pdga_event_id    = $event    -- bind: desired event ID
//       GROUP BY
//         event_rounds.pdga_number,
//         event_rounds.division,
//         event_round_player_stats.stat_id
//     ) AS player_averages
//   ) AS ranked
//   JOIN stats
//     ON ranked.stat_id = stats.stat_id
//   WHERE
//     ranked.pdga_number   = ?            -- bind: the player’s PDGA number
//     AND ranked.stat_id   BETWEEN 1 AND 18
//   ORDER BY
//     percentile DESC;
//   ";
// }

// $stmt = $db->prepare($sql);
// $stmt->bind_param('i', $pdgaNumber);
// $stmt -> execute();
// $res = $stmt -> get_result();

// $abbrevStats = [];
// $percentile = [];
// while ($row = $res->fetch_assoc()) {
//     $abbrevStats[] = $row['abbreviation'];
    
//     $percentile[] = round((float)$row['percentile'], 0);

// }

// $statement->close();

// 6. Return the JSON payload
// echo json_encode([
//     'stat_abbrev' => $abbrevStats,
//     'percentile' => $percentile,
// ]);


$drivingQuery =
"
SELECT
    stats.stat_id,
    stats.abbreviation,
    stats.stat_name,
    ROUND(ranked.percentile, 1) AS percentile
  FROM (
    SELECT
      player_avgs.pdga_number,
      player_avgs.division,
      player_avgs.stat_id,
      CUME_DIST() OVER (
        PARTITION BY player_avgs.division, player_avgs.stat_id
        ORDER BY player_avgs.average_value
      ) * 100 AS percentile
    FROM (
      SELECT
        event_round_player_stats.stat_id   AS stat_id,
        event_rounds.pdga_number           AS pdga_number,
        event_rounds.division              AS division,
        AVG(event_round_player_stats.printed_value) AS average_value
      FROM event_round_player_stats
      JOIN event_rounds
        ON event_round_player_stats.event_round_id = event_rounds.event_round_id
      GROUP BY
        event_rounds.pdga_number,
        event_rounds.division,
        event_round_player_stats.stat_id
    ) AS player_avgs
  ) AS ranked
  JOIN stats
    ON ranked.stat_id = stats.stat_id
  WHERE
    ranked.pdga_number = ?         -- bind your player’s PDGA number here
    AND ranked.stat_id IN (1, 9, 17, 2, 3, 4, 5)
  ORDER BY
    -- ranked.stat_id;
    percentile DESC;
";


// $shortGameQuery = 
// "
//   SELECT
//     stats.stat_id,
//     stats.abbreviation,
//     stats.stat_name,
//     ROUND(ranked.percentile, 1) AS percentile
//   FROM (
//     SELECT
//       player_avgs.pdga_number,
//       player_avgs.division,
//       player_avgs.stat_id,
//       CUME_DIST() OVER (
//         PARTITION BY player_avgs.division, player_avgs.stat_id
//         ORDER BY player_avgs.average_value
//       ) * 100 AS percentile
//     FROM (
//       SELECT
//         event_round_player_stats.stat_id   AS stat_id,
//         event_rounds.pdga_number           AS pdga_number,
//         event_rounds.division              AS division,
//         AVG(event_round_player_stats.printed_value) AS average_value
//       FROM event_round_player_stats
//       JOIN event_rounds
//         ON event_round_player_stats.event_round_id = event_rounds.event_round_id
//       GROUP BY
//         event_rounds.pdga_number,
//         event_rounds.division,
//         event_round_player_stats.stat_id
//     ) AS player_avgs
//   ) AS ranked
//   JOIN stats
//     ON ranked.stat_id = stats.stat_id
//   WHERE
//     ranked.pdga_number = ?         -- bind your player’s PDGA number here
//     AND ranked.stat_id IN (2, 3, 4, 5)
//   ORDER BY
//     -- ranked.stat_id;
//     percentile DESC;
// ";





$puttingQuery = 
"
  SELECT
    stats.stat_id,
    stats.abbreviation,
    stats.stat_name,
    ROUND(ranked.percentile, 1) AS percentile
  FROM (
    SELECT
      player_avgs.pdga_number,
      player_avgs.division,
      player_avgs.stat_id,
      CUME_DIST() OVER (
        PARTITION BY player_avgs.division, player_avgs.stat_id
        ORDER BY player_avgs.average_value
      ) * 100 AS percentile
    FROM (
      SELECT
        event_round_player_stats.stat_id   AS stat_id,
        event_rounds.pdga_number           AS pdga_number,
        event_rounds.division              AS division,
        AVG(event_round_player_stats.printed_value) AS average_value
      FROM event_round_player_stats
      JOIN event_rounds
        ON event_round_player_stats.event_round_id = event_rounds.event_round_id
      GROUP BY
        event_rounds.pdga_number,
        event_rounds.division,
        event_round_player_stats.stat_id
    ) AS player_avgs
  ) AS ranked
  JOIN stats
    ON ranked.stat_id = stats.stat_id
  WHERE
    ranked.pdga_number = ?         -- bind your player’s PDGA number here
    AND ranked.stat_id IN (6,7,8,16,18)
  ORDER BY
    -- ranked.stat_id;
    percentile DESC;
";



$scoringQuery = 
"
SELECT
stats.stat_id,
stats.abbreviation,
stats.stat_name,
ROUND(ranked.percentile, 1) AS percentile
FROM (
  SELECT
  player_avgs.pdga_number,
  player_avgs.division,
  player_avgs.stat_id,
  CUME_DIST() OVER (
    PARTITION BY player_avgs.division, player_avgs.stat_id
    ORDER BY player_avgs.average_value
    ) * 100 AS percentile
    FROM (
      SELECT
      event_round_player_stats.stat_id   AS stat_id,
      event_rounds.pdga_number           AS pdga_number,
      event_rounds.division              AS division,
      AVG(event_round_player_stats.printed_value) AS average_value
      FROM event_round_player_stats
      JOIN event_rounds
      ON event_round_player_stats.event_round_id = event_rounds.event_round_id
      GROUP BY
      event_rounds.pdga_number,
      event_rounds.division,
      event_round_player_stats.stat_id
      ) AS player_avgs
      ) AS ranked
JOIN stats
ON ranked.stat_id = stats.stat_id
WHERE
ranked.pdga_number = ?         -- bind your player’s PDGA number here
AND ranked.stat_id IN (10, 11, 12, 13, 14, 15)
ORDER BY
-- ranked.stat_id;
percentile DESC;
";


if (isset($_GET['year'])){
  $year = intval($_GET['year']);

  $drivingQuery =
  "SELECT
    stats.stat_id,
    stats.abbreviation,
    stats.stat_name,
    ROUND(ranked.percentile, 1) AS percentile
  FROM (
    -- 2) Rank each player’s average within their division, for the chosen year
    SELECT
      player_averages.pdga_number,
      player_averages.division,
      player_averages.stat_id,
      CUME_DIST() OVER (
        PARTITION BY player_averages.division, player_averages.stat_id
        ORDER BY player_averages.average_value
      ) * 100 AS percentile
    FROM (
      -- 1) Compute each player’s average printed_value per stat in that year
      SELECT
        event_round_player_stats.stat_id,
        event_rounds.pdga_number,
        event_rounds.division,
        AVG(event_round_player_stats.printed_value) AS average_value
      FROM event_round_player_stats
      JOIN event_rounds
        ON event_round_player_stats.event_round_id = event_rounds.event_round_id
      JOIN events
        ON event_rounds.pdga_event_id = events.pdga_event_id
      WHERE
        YEAR(events.start_date) = $year      -- bind your desired year here
      GROUP BY
        event_rounds.pdga_number,
        event_rounds.division,
        event_round_player_stats.stat_id
    ) AS player_averages
  ) AS ranked
  JOIN stats
    ON ranked.stat_id = stats.stat_id
  WHERE
    ranked.pdga_number = ?              -- bind your player’s PDGA number here
    AND ranked.stat_id IN (1, 9, 17, 2, 3, 4, 5)
  ORDER BY
    percentile DESC;
  ";

  // $shortGameQuery = 
  // "SELECT
  //   stats.stat_id,
  //   stats.abbreviation,
  //   stats.stat_name,
  //   ROUND(ranked.percentile, 1) AS percentile
  // FROM (
  //   -- 2) Rank each player’s average within their division, for the chosen year
  //   SELECT
  //     player_averages.pdga_number,
  //     player_averages.division,
  //     player_averages.stat_id,
  //     CUME_DIST() OVER (
  //       PARTITION BY player_averages.division, player_averages.stat_id
  //       ORDER BY player_averages.average_value
  //     ) * 100 AS percentile
  //   FROM (
  //     -- 1) Compute each player’s average printed_value per stat in that year
  //     SELECT
  //       event_round_player_stats.stat_id,
  //       event_rounds.pdga_number,
  //       event_rounds.division,
  //       AVG(event_round_player_stats.printed_value) AS average_value
  //     FROM event_round_player_stats
  //     JOIN event_rounds
  //       ON event_round_player_stats.event_round_id = event_rounds.event_round_id
  //     JOIN events
  //       ON event_rounds.pdga_event_id = events.pdga_event_id
  //     WHERE
  //       YEAR(events.start_date) = $year      -- bind your desired year here
  //     GROUP BY
  //       event_rounds.pdga_number,
  //       event_rounds.division,
  //       event_round_player_stats.stat_id
  //   ) AS player_averages
  // ) AS ranked
  // JOIN stats
  //   ON ranked.stat_id = stats.stat_id
  // WHERE
  //   ranked.pdga_number = ?              -- bind your player’s PDGA number here
  //   AND ranked.stat_id IN (2, 3, 4, 5)
  // ORDER BY
  //   percentile DESC;
  // ";

  $puttingQuery = 
  "SELECT
    stats.stat_id,
    stats.abbreviation,
    stats.stat_name,
    ROUND(ranked.percentile, 1) AS percentile
  FROM (
    -- 2) Rank each player’s average within their division, for the chosen year
    SELECT
      player_averages.pdga_number,
      player_averages.division,
      player_averages.stat_id,
      CUME_DIST() OVER (
        PARTITION BY player_averages.division, player_averages.stat_id
        ORDER BY player_averages.average_value
      ) * 100 AS percentile
    FROM (
      -- 1) Compute each player’s average printed_value per stat in that year
      SELECT
        event_round_player_stats.stat_id,
        event_rounds.pdga_number,
        event_rounds.division,
        AVG(event_round_player_stats.printed_value) AS average_value
      FROM event_round_player_stats
      JOIN event_rounds
        ON event_round_player_stats.event_round_id = event_rounds.event_round_id
      JOIN events
        ON event_rounds.pdga_event_id = events.pdga_event_id
      WHERE
        YEAR(events.start_date) = $year      -- bind your desired year here
      GROUP BY
        event_rounds.pdga_number,
        event_rounds.division,
        event_round_player_stats.stat_id
    ) AS player_averages
  ) AS ranked
  JOIN stats
    ON ranked.stat_id = stats.stat_id
  WHERE
    ranked.pdga_number = ?              -- bind your player’s PDGA number here
    AND ranked.stat_id IN (6,7,8,16,18)
  ORDER BY
    percentile DESC;
  ";

  $scoringQuery = 
  "SELECT
    stats.stat_id,
    stats.abbreviation,
    stats.stat_name,
    ROUND(ranked.percentile, 1) AS percentile
    FROM (
      -- 2) Rank each player’s average within their division, for the chosen year
      SELECT
        player_averages.pdga_number,
        player_averages.division,
        player_averages.stat_id,
        CUME_DIST() OVER (
          PARTITION BY player_averages.division, player_averages.stat_id
          ORDER BY player_averages.average_value
        ) * 100 AS percentile
      FROM (
        -- 1) Compute each player’s average printed_value per stat in that year
        SELECT
          event_round_player_stats.stat_id,
          event_rounds.pdga_number,
          event_rounds.division,
          AVG(event_round_player_stats.printed_value) AS average_value
        FROM event_round_player_stats
        JOIN event_rounds
          ON event_round_player_stats.event_round_id = event_rounds.event_round_id
        JOIN events
          ON event_rounds.pdga_event_id = events.pdga_event_id
        WHERE
          YEAR(events.start_date) = $year      -- bind your desired year here
        GROUP BY
          event_rounds.pdga_number,
          event_rounds.division,
          event_round_player_stats.stat_id
      ) AS player_averages
    ) AS ranked
    JOIN stats
      ON ranked.stat_id = stats.stat_id
    WHERE
      ranked.pdga_number = ?              -- bind your player’s PDGA number here
      AND ranked.stat_id IN (10, 11, 12, 13, 14, 15)
    ORDER BY
      percentile DESC;
    ";
}

if (isset($_GET['event'])){
  $event = intval($_GET['event']);

  $drivingQuery =
  "SELECT
    stats.stat_id,
    stats.abbreviation,
    stats.stat_name,
    ROUND(ranked.percentile, 1) AS percentile
  FROM (
    -- Step 2: rank each player’s average within their division, for the chosen year and event
    SELECT
      player_averages.pdga_number,
      player_averages.division,
      player_averages.stat_id,
      CUME_DIST() OVER (
        PARTITION BY player_averages.division, player_averages.stat_id
        ORDER BY player_averages.average_value
      ) * 100 AS percentile
    FROM (
      -- Step 1: compute each player’s average printed_value per stat,
      -- only for rounds in the specified year and event
      SELECT
        event_round_player_stats.stat_id,
        event_rounds.pdga_number,
        event_rounds.division,
        AVG(event_round_player_stats.printed_value) AS average_value
      FROM event_round_player_stats
      JOIN event_rounds
        ON event_round_player_stats.event_round_id = event_rounds.event_round_id
      JOIN events
        ON event_rounds.pdga_event_id = events.pdga_event_id
      WHERE
        YEAR(events.start_date)    = $year    -- bind: desired year
        AND events.pdga_event_id    = $event    -- bind: desired event ID
      GROUP BY
        event_rounds.pdga_number,
        event_rounds.division,
        event_round_player_stats.stat_id
    ) AS player_averages
  ) AS ranked
  JOIN stats
    ON ranked.stat_id = stats.stat_id
  WHERE
    ranked.pdga_number   = ?            -- bind: the player’s PDGA number
    AND ranked.stat_id IN (1, 9, 17, 2, 3, 4, 5)
  ORDER BY
    percentile DESC;
  ";


  // $shortGameQuery = 
  // "SELECT
  //   stats.stat_id,
  //   stats.abbreviation,
  //   stats.stat_name,
  //   ROUND(ranked.percentile, 1) AS percentile
  // FROM (
  //   -- Step 2: rank each player’s average within their division, for the chosen year and event
  //   SELECT
  //     player_averages.pdga_number,
  //     player_averages.division,
  //     player_averages.stat_id,
  //     CUME_DIST() OVER (
  //       PARTITION BY player_averages.division, player_averages.stat_id
  //       ORDER BY player_averages.average_value
  //     ) * 100 AS percentile
  //   FROM (
  //     -- Step 1: compute each player’s average printed_value per stat,
  //     -- only for rounds in the specified year and event
  //     SELECT
  //       event_round_player_stats.stat_id,
  //       event_rounds.pdga_number,
  //       event_rounds.division,
  //       AVG(event_round_player_stats.printed_value) AS average_value
  //     FROM event_round_player_stats
  //     JOIN event_rounds
  //       ON event_round_player_stats.event_round_id = event_rounds.event_round_id
  //     JOIN events
  //       ON event_rounds.pdga_event_id = events.pdga_event_id
  //     WHERE
  //       YEAR(events.start_date)    = $year    -- bind: desired year
  //       AND events.pdga_event_id    = $event    -- bind: desired event ID
  //     GROUP BY
  //       event_rounds.pdga_number,
  //       event_rounds.division,
  //       event_round_player_stats.stat_id
  //   ) AS player_averages
  // ) AS ranked
  // JOIN stats
  //   ON ranked.stat_id = stats.stat_id
  // WHERE
  //   ranked.pdga_number   = ?            -- bind: the player’s PDGA number
  //   AND ranked.stat_id IN (2, 3, 4, 5)
  // ORDER BY
  //   percentile DESC;
  // ";


  $puttingQuery = 
  "SELECT
    stats.stat_id,
    stats.abbreviation,
    stats.stat_name,
    ROUND(ranked.percentile, 1) AS percentile
  FROM (
    -- Step 2: rank each player’s average within their division, for the chosen year and event
    SELECT
      player_averages.pdga_number,
      player_averages.division,
      player_averages.stat_id,
      CUME_DIST() OVER (
        PARTITION BY player_averages.division, player_averages.stat_id
        ORDER BY player_averages.average_value
      ) * 100 AS percentile
    FROM (
      -- Step 1: compute each player’s average printed_value per stat,
      -- only for rounds in the specified year and event
      SELECT
        event_round_player_stats.stat_id,
        event_rounds.pdga_number,
        event_rounds.division,
        AVG(event_round_player_stats.printed_value) AS average_value
      FROM event_round_player_stats
      JOIN event_rounds
        ON event_round_player_stats.event_round_id = event_rounds.event_round_id
      JOIN events
        ON event_rounds.pdga_event_id = events.pdga_event_id
      WHERE
        YEAR(events.start_date)    = $year    -- bind: desired year
        AND events.pdga_event_id    = $event    -- bind: desired event ID
      GROUP BY
        event_rounds.pdga_number,
        event_rounds.division,
        event_round_player_stats.stat_id
    ) AS player_averages
  ) AS ranked
  JOIN stats
    ON ranked.stat_id = stats.stat_id
  WHERE
    ranked.pdga_number   = ?            -- bind: the player’s PDGA number
    AND ranked.stat_id IN (6,7,8,16,18)
  ORDER BY
    percentile DESC;
  ";


  $scoringQuery = 
  "SELECT
    stats.stat_id,
    stats.abbreviation,
    stats.stat_name,
    ROUND(ranked.percentile, 1) AS percentile
  FROM (
    -- Step 2: rank each player’s average within their division, for the chosen year and event
    SELECT
      player_averages.pdga_number,
      player_averages.division,
      player_averages.stat_id,
      CUME_DIST() OVER (
        PARTITION BY player_averages.division, player_averages.stat_id
        ORDER BY player_averages.average_value
      ) * 100 AS percentile
    FROM (
      -- Step 1: compute each player’s average printed_value per stat,
      -- only for rounds in the specified year and event
      SELECT
        event_round_player_stats.stat_id,
        event_rounds.pdga_number,
        event_rounds.division,
        AVG(event_round_player_stats.printed_value) AS average_value
      FROM event_round_player_stats
      JOIN event_rounds
        ON event_round_player_stats.event_round_id = event_rounds.event_round_id
      JOIN events
        ON event_rounds.pdga_event_id = events.pdga_event_id
      WHERE
        YEAR(events.start_date)    = $year    -- bind: desired year
        AND events.pdga_event_id    = $event    -- bind: desired event ID
      GROUP BY
        event_rounds.pdga_number,
        event_rounds.division,
        event_round_player_stats.stat_id
    ) AS player_averages
  ) AS ranked
  JOIN stats
    ON ranked.stat_id = stats.stat_id
  WHERE
    ranked.pdga_number   = ?            -- bind: the player’s PDGA number
    AND ranked.stat_id IN (10, 11, 12, 13, 14, 15)
  ORDER BY
    percentile DESC;
  ";
}





$driving_abbrev = [];
$driving_percentile = [];

$drivingStmt = $db->prepare($drivingQuery);
$drivingStmt->bind_param('i', $pdgaNumber);
$drivingStmt -> execute();
$drivingRes = $drivingStmt -> get_result();

while ($row = $drivingRes->fetch_assoc()) {
    
  $driving_abbrev[] = $row['abbreviation'];
  $driving_percentile[] = round((float)$row['percentile'], 0);

}

// $shortGame_abbrev = [];
// $shortGame_percentile = [];

// $shortGameStmt = $db->prepare($shortGameQuery);
// $shortGameStmt->bind_param('i', $pdgaNumber);
// $shortGameStmt -> execute();
// $shortGameRes = $shortGameStmt -> get_result();

// while ($row = $shortGameRes->fetch_assoc()) {
    
//   $shortGame_abbrev[] = $row['abbreviation'];
//   $shortGame_percentile[] = round((float)$row['percentile'], 0);

// }

$putting_abbrev = [];
$putting_percentile = [];
      
$puttingStmt = $db->prepare($puttingQuery);
$puttingStmt->bind_param('i', $pdgaNumber);
$puttingStmt -> execute();
$puttingRes = $puttingStmt -> get_result();
      
while ($row = $puttingRes->fetch_assoc()) {
          
  $putting_abbrev[] = $row['abbreviation'];
  $putting_percentile[] = round((float)$row['percentile'], 0);
      
}



$scoring_abbrev = [];
$scoring_percentile = [];
      
$scoringStmt = $db->prepare($scoringQuery);
      
$scoringStmt->bind_param('i', $pdgaNumber);
$scoringStmt -> execute();
$scoringRes = $scoringStmt -> get_result();
      
while ($row = $scoringRes->fetch_assoc()) {
        
  $scoring_abbrev[] = $row['abbreviation'];
  $scoring_percentile[] = round((float)$row['percentile'], 0);
        
}
      
echo json_encode([ 
  "drivingAbbrev" => $driving_abbrev,
  "drivingPercentile" => $driving_percentile,
  // "shortGameAbbrev" => $shortGame_abbrev,
  // "shortGamePercentile" => $shortGame_percentile,
  "puttingAbbrev" => $putting_abbrev,
  "puttingPercentile" => $putting_percentile,
  "scoringAbbrev" => $scoring_abbrev,
  "scoringPercentile" => $scoring_percentile
]);

?>