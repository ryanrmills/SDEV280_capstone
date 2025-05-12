<?php
//returning a json
header('Content-Type: application/json');

//load the database credentials
require_once __DIR__ . '/../../../config/db.php';// defines $db = new mysqli(...)

//Connecting to the database
$db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

//Read and validate the PDGA number
if (! isset($_GET['pdga_number'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing pdga_number']);
    exit;
}

//Grabbing the pdga number and assigning it to the variable
$pdgaNumber = intval($_GET['pdga_number']);

//Choose which stats to include in the radar
$statIds = [1, 7, 8, 5, 10];

$items = isset($_GET['ids']) ? explode(',',$_GET['ids']) : $statIds;

$items = array_map('intval', $items);


$statIds = $items;


// 1 = Fairway Hit         15 = Eagle or Better Percentage
// 2 = C1 In Regulation    16 = Putting - Total Distance
// 3 = C2 in Regulation    17 = Throw in - Longest
// 4  = Parked             18 = Putting - Average
// 5 = Scramble            100 = Strokes Gained - Total
// 6 = C1 Putting          101 = Strokes Gained - Putting
// 7 = C1X Putting         102 = Strokes Gained - Tee to Green
// 8 = C2 Putting          103 = Strokes Lost - Penalty
// 9 = OB Rate             104 = Strokes Gained - C1X
// 10 = Birdie Rate        105 = Strokes Gained - C2
// 11 = Double Bogey or Worse
// 12 = Bogey Percentage
// 13 = Par Percentage
// 14 = Birdie Percentage

//Collapsing the variable and turning it into a string
$statIdList = implode(', ', $statIds);

// $sql = "SELECT
//     stats.stat_name,
//     AVG(event_round_player_stats.printed_value) AS average_value
// FROM event_round_player_stats
// JOIN event_rounds
//   ON event_round_player_stats.event_round_id = event_rounds.event_round_id
// JOIN stats
//   ON event_round_player_stats.stat_id = stats.stat_id
// WHERE event_rounds.pdga_number = ?
//   AND event_round_player_stats.stat_id IN ($statIdList)
// GROUP BY
//     stats.stat_id,
//     stats.stat_name
// ORDER BY
//     FIELD(stats.stat_id, $statIdList);
// ";

// $sql = "SELECT
//     stats.stat_name,
//     player_averages.average_value,
//     CUME_DIST() OVER (
//       PARTITION BY player_averages.stat_id
//       ORDER BY player_averages.average_value
//     ) * 100 AS percentile
//   FROM (
//     SELECT
//       event_round_player_stats.stat_id,
//       event_rounds.pdga_number,
//       AVG(event_round_player_stats.printed_value) AS average_value
//     FROM event_round_player_stats
//     JOIN event_rounds
//       ON event_round_player_stats.event_round_id = event_rounds.event_round_id
//     WHERE event_rounds.pdga_number = ?
//       AND event_round_player_stats.stat_id IN ($statIdList)
//     GROUP BY
//       event_round_player_stats.stat_id,
//       event_rounds.pdga_number
//   ) AS player_averages
//   JOIN stats
//     ON player_averages.stat_id = stats.stat_id
//   ORDER BY
//     FIELD(stats.stat_id, $statIdList);
// ";

// $sql = "SELECT
//           stat_name,
//           average_value,
//           percentile
//         FROM (
//           SELECT
//             pa.stat_id,
//             pa.pdga_number,
//             stats.stat_name,
//             pa.average_value,
//             ROUND(
//               CUME_DIST() OVER (
//                 PARTITION BY pa.stat_id
//                 ORDER BY pa.average_value
//               ) * 100, 1
//             ) AS percentile
//           FROM (
//             SELECT
//               event_round_player_stats.stat_id,
//               event_rounds.pdga_number,
//               AVG(event_round_player_stats.printed_value) AS average_value
//             FROM event_round_player_stats
//             JOIN event_rounds
//             ON event_round_player_stats.event_round_id = event_rounds.event_round_id
//             GROUP BY
//               event_round_player_stats.stat_id,
//               event_rounds.pdga_number
//           ) AS pa
//           JOIN stats
//           ON pa.stat_id = stats.stat_id
//         ) AS ranked
//         WHERE
//           ranked.pdga_number = ?
//         AND ranked.stat_id IN ($statIdList)
//         ORDER BY
//         FIELD(ranked.stat_id, $statIdList);
//     ";



// //prepare() makes the sql query accept the '?' parameter later
// $statement = $db->prepare($sql); 

// //if the 'statement returns false (which means something is wrong), then it returns
// //an http error of 500 in JSON format, and exits (ends) the process
// if ($statement === false) {
//     http_response_code(500);
//     echo json_encode(['error' => 'Failed to prepare SQL: ' . $db->error]);
//     exit;
// }

// //bind_param() uses pdgaNumber as the '?' parameter in the sql query. 'i' tells the method
// //that it is an 'integer'
// $statement->bind_param('i', $pdgaNumber);
// $statement->execute();
// $result = $statement->get_result();

// $labels = [];
// $values = [];
// $percentile = [];
// while ($row = $result->fetch_assoc()) {
//     $labels[] = $row['stat_name'];
//     // Round to one decimal if you like, or leave raw
//     $values[] = round((float)$row['average_value'], 1);
//     $percentile[] = $row['percentile'];
// }

// $statement->close();

// // 6. Return the JSON payload
// echo json_encode([
//     'labels' => $labels,
//     'values' => $values,
//     'percentile' => $percentile
// ]);

/**
 * for the radar graph, we will need
 * - Label names
 * - number above standard deviation
 * 
 * labelname, standard deviation
 * 
 * for standard deviation, we will need
 * - averages, grouped by stat_id
 * - subtract the field average, from the player average
 * - take the difference of each, square, add, and find average
 * - square root that average = standard deviation
 * 
 * to find the specific players average against the SD:
 * - (player average - field average) / SD
 * 
 * the json format will have
 * - labels list
 * - the SD above/below/equal to average, coinciding with label name
 * 
 * 
 */
//this gets the statname and abbreviations
$stdDevQuery = 
"SELECT
--  players.pdga_number            AS player_pdga_number,
  stats.stat_id,
  stats.abbreviation,
  stats.stat_name,
--  player_stats.player_average,
--  field_stats.field_average,
--  field_stats.field_stddev,
  -- z_score = (player_average - field_average) / field_stddev
  ROUND(
    (player_stats.player_average - field_stats.field_average)
    / NULLIF(field_stats.field_stddev, 0)
  , 2) AS z_score

FROM players

-- 1) this player’s average per stat
JOIN (
  SELECT
    event_rounds.pdga_number,
    event_round_player_stats.stat_id,
    AVG(event_round_player_stats.printed_value) AS player_average
  FROM event_round_player_stats
  JOIN event_rounds
    ON event_round_player_stats.event_round_id = event_rounds.event_round_id
  WHERE event_rounds.pdga_number = ?
  GROUP BY
    event_rounds.pdga_number,
    event_round_player_stats.stat_id
) AS player_stats
  ON player_stats.pdga_number = players.pdga_number

-- 2) field average & stddev per stat for the player's division (e.g. MPO)
JOIN (
  SELECT
    event_rounds.division,
    event_round_player_stats.stat_id,
    AVG(event_round_player_stats.printed_value)   AS field_average,
    STDDEV_POP(event_round_player_stats.printed_value) AS field_stddev
  FROM event_round_player_stats
  JOIN event_rounds
    ON event_round_player_stats.event_round_id = event_rounds.event_round_id
  GROUP BY
    event_rounds.division,
    event_round_player_stats.stat_id
) AS field_stats
  ON field_stats.division = players.division
 AND field_stats.stat_id  = player_stats.stat_id

JOIN stats
  ON stats.stat_id = player_stats.stat_id

WHERE
  players.pdga_number = ?
  AND stats.stat_id IN ($statIdList)
ORDER BY
  stats.stat_id
;
";

$year = 0;

$eventId = 0;

if (isset($_GET['year'])){
  $year = intval($_GET['year']);

  $stdDevQuery = 
  "SELECT
      stats.stat_id,
      stats.abbreviation,
      stats.stat_name,
      ROUND(
        (player_stats.player_average - field_stats.field_average)
        / NULLIF(field_stats.field_stddev,0),
        2
      ) AS z_score
    FROM players

    -- 1) this player’s average per stat **for just that year**
    JOIN (
      SELECT
        er.pdga_number,
        erp.stat_id,
        AVG(erp.printed_value) AS player_average
      FROM event_round_player_stats AS erp
      JOIN event_rounds            AS er
        ON erp.event_round_id = er.event_round_id
      JOIN events                  AS e
        ON er.pdga_event_id = e.pdga_event_id
      WHERE er.pdga_number = ?     -- your bound PDGA #
        AND YEAR(e.start_date) = $year -- <<<< filter by your $year here
      GROUP BY
        er.pdga_number,
        erp.stat_id
    ) AS player_stats
      ON player_stats.pdga_number = players.pdga_number

    -- 2) field average & σ **for that same year** in each division
    JOIN (
      SELECT
        er.division,
        erp.stat_id,
        AVG(erp.printed_value)    AS field_average,
        STDDEV_POP(erp.printed_value) AS field_stddev
      FROM event_round_player_stats AS erp
      JOIN event_rounds            AS er
        ON erp.event_round_id = er.event_round_id
      JOIN events                  AS e
        ON er.pdga_event_id = e.pdga_event_id
      WHERE YEAR(e.start_date) = $year -- <<<< also filter by $year here
      GROUP BY
        er.division,
        erp.stat_id
    ) AS field_stats
      ON field_stats.division = players.division
    AND field_stats.stat_id  = player_stats.stat_id

    JOIN stats
      ON stats.stat_id = player_stats.stat_id

    WHERE
      players.pdga_number = ?
      AND stats.stat_id     IN ($statIdList)
    ORDER BY
      stats.stat_id
    ;
  ";
}

if (isset($_GET['event'])){
  $eventId = intval($_GET['event']);

  $stdDevQuery = 
    "SELECT
      stats.stat_id,
      stats.abbreviation,
      stats.stat_name,
      ROUND(
        (player_stats.player_average - field_stats.field_average)
        / NULLIF(field_stats.field_stddev, 0),
        2
      ) AS z_score
    FROM players

    -- 1) this player’s per‑stat average in that year & event
    JOIN (
      SELECT
        er.pdga_number,
        erp.stat_id,
        AVG(erp.printed_value) AS player_average
      FROM event_round_player_stats AS erp
      JOIN event_rounds            AS er
        ON erp.event_round_id = er.event_round_id
      JOIN events                  AS e
        ON er.pdga_event_id = e.pdga_event_id
      WHERE
          er.pdga_number    = ?        -- bind $pdgaNumber
        AND YEAR(e.start_date) = $year     -- bind $year
        AND e.pdga_event_id  = $eventId       -- bind $eventId
      GROUP BY
        er.pdga_number,
        erp.stat_id
    ) AS player_stats
      ON player_stats.pdga_number = players.pdga_number

    -- 2) field average & σ in that same year & event
    JOIN (
      SELECT
        er.division,
        erp.stat_id,
        AVG(erp.printed_value)       AS field_average,
        STDDEV_POP(erp.printed_value) AS field_stddev
      FROM event_round_player_stats AS erp
      JOIN event_rounds            AS er
        ON erp.event_round_id = er.event_round_id
      JOIN events                  AS e
        ON er.pdga_event_id = e.pdga_event_id
      WHERE
          YEAR(e.start_date) = $year    -- bind $year again
        AND e.pdga_event_id  = $eventId     -- bind $eventId again
      GROUP BY
        er.division,
        erp.stat_id
    ) AS field_stats
      ON field_stats.division = players.division
    AND field_stats.stat_id  = player_stats.stat_id

    JOIN stats
      ON stats.stat_id = player_stats.stat_id

    WHERE
      players.pdga_number = ?       -- bind $pdgaNumber again
      AND stats.stat_id     IN ($statIdList)
    ORDER BY
      stats.stat_id
    ;
  ";
}

$stmt = $db->prepare($stdDevQuery);
$stmt -> bind_param('ii', $pdgaNumber, $pdgaNumber);
$stmt -> execute();
$res = $stmt -> get_result();

$statId = [];
$stat_name = [];
$stat_abbreviation = [];
$zScore = [];
if ($res && $res -> num_rows > 0){
  while ($row = $res -> fetch_assoc()){
    $stat_abbreviation[] = $row["abbreviation"];
    $stat_name[] = $row["stat_name"];
    $zScore[]  = $row["z_score"];
  }
}

echo json_encode([
  "abbrev" => $stat_abbreviation,
  "z_score" => $zScore
]);

?>
