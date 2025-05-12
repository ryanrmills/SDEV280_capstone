<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Player List</title>
  <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script> -->
  <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Permanent+Marker&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <script src="../js/player_list.js" defer></script>
  <link rel="stylesheet" href="./../css/player_list.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/2.2.2/css/dataTables.dataTables.css" />
  <script src="https://cdn.datatables.net/2.2.2/js/dataTables.js"></script>
</head>
<body>
  <nav>
      <div class="navbar_icon">
        <img src="./../assets/logo-banner.png"></img>
      </div>

      <div class="navbar_links">
        <div>
          <h3>Live</h3>
        </div>

        <div>
          <h3>Rankings</h3>
        </div>

        <div>
          <a href="./../pages/player_list.php" style="margin: 0em; padding: 0em;color: white; text-decoration: none;">
            <h3>Player Profiles</h3>
          </a>
        </div>

        <div>
          <h3>Monday</h3>
        </div>

        <div>
          <a href="./../pages/head2head.php" style="margin: 0em; padding: 0em;color: white; text-decoration: none;">
            <h3>Head-to-Head</h3>
          </a>
        </div>

        <div>
          <h3>StatZone</h3>
        </div>
      </div>
  </nav>

  <section class="playerList_container">
    <table id="player_table">
      <thead>
        <tr>
          <th>PDGA #</th>
          <th>Name</th>
          <th>Division</th>
          <th>City</th>
          <th>State</th>
          <th>Country</th>
          <th>Nationality</th>
          <th>Members since</th>
        </tr>
      </thead>
    </table>
  </section>
</body>
</html>