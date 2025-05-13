<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
  
  //This is to say 'All of this code is meant to return a json format data'
  header('Content-Type: application/json');
  
  //this is to tell the code where to get the parameters. This is the file path
  require_once __DIR__ . '/../../../config/db.php';
  
  //if the pdga number is not set, then return the error
  if (!isset($_GET['pdga_number'])) {
    echo json_encode(['error' => 'Missing pdga_number']);
    exit;
  }
  
  // Connect (using your config constants)
  $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  $db->set_charset('utf8mb4');
  
  //if the 'connect_error' property has a value, then return the http error code
  // and return a json format error, then exit or end the process.
  if ($db->connect_error) {
    http_response_code(500);
    echo json_encode(['error'=>'DB connection failed: '.$db->connect_error]);
    exit;
  }
  
  //assign the pdga number, that is an int value and retrieved from GET, to the pdga variable
  $pdga = intval($_GET['pdga_number']);




  function geocodeNominatim($city, $state, $country) {
    // 1) build the URL with the real $q value
    $q   = urlencode("$city, $state, $country");
    $url = "https://nominatim.openstreetmap.org/search?"
         . "q={$q}&format=json&limit=1";

    // 2) set a proper User‑Agent (per Nominatim policy)
    $opts = [
      'http' => [
        'header' => "User-Agent: statmando-geocode/1.0\r\n"
      ]
    ];
    $context = stream_context_create($opts);

    // 3) fetch & decode
    $json = file_get_contents($url, false, $context);
    $data = json_decode($json, true);

    // 4) read the correct keys ("lat" and "lon")
    if (!empty($data[0]['lat']) && !empty($data[0]['lon'])) {
      return [
        'latitude'  => (float)$data[0]['lat'],
        'longitude' => (float)$data[0]['lon']
      ];
    }

    return null;
  }


  // 1. add nullable lat/lon columns
  // ALTER TABLE events ADD COLUMN lat DOUBLE NULL, ADD COLUMN lon DOUBLE NULL;

  $stmt = $db->query("
  SELECT pdga_event_id, city, state, country
  FROM events
  WHERE latitude IS NULL OR longitude IS NULL
");

while ($row = $stmt->fetch_assoc()) {
  $coords = geocodeNominatim($row['city'], $row['state'], $row['country']);
  if ($coords) {
    $upd = $db->prepare("
      UPDATE events
      SET latitude  = ?,
          longitude = ?
      WHERE pdga_event_id = ?
    ");
    $upd->bind_param('ddi',
      $coords['latitude'],
      $coords['longitude'],
      $row['pdga_event_id']
    );
    if ($upd->execute()) {
      echo "Geocoded {$row['city']} → {$coords['latitude']},{$coords['longitude']}\n";
    } else {
      error_log("Update failed for event {$row['pdga_event_id']}: " . $upd->error);
    }
  } else {
    error_log("No match for {$row['city']}, {$row['state']}, {$row['country']}");
  }
  sleep(1);
}


?>
