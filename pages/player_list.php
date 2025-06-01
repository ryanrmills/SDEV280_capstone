<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Player List</title>
  <link rel="icon" type="image/x-icon" href="./../assets/statmando_icon.png">
  <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script> -->
  <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Permanent+Marker&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <script src="../js/player_list.js" defer></script>
  <link rel="stylesheet" href="./../css/player_list.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/2.2.2/css/dataTables.dataTables.css" />
  <script src="https://cdn.datatables.net/2.2.2/js/dataTables.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
        <a href="./../pages/player_list.php" target="_blank" style="margin: 0em; padding: 0em;color: white; text-decoration: none;">
          <h3>Player Profiles</h3>
        </a>
      </div>

      <div>
        <h3>Monday</h3>
      </div>

      <div>
        <a href="./../pages/head2head.php" target="_blank" style="margin: 0em; padding: 0em;color: white; text-decoration: none;">
          <h3>Head-to-Head</h3>
        </a>
      </div>

      <div>
        <h3>StatZone</h3>
      </div>
    </div>
  </nav>

  <!-- displaying top 10 players by scores -->
  <section class="scoreChart_section">
    <div class="chart-row">
      <!-- Chart 1 -->
      <div class="viz-box">
        <h3>Top 10 Players by Total Score</h3>
        <label for="divisionSelect">Division:</label>
        <select id="divisionSelect">
          <option value="MPO">MPO</option>
          <option value="FPO">FPO</option>
          <option value="MP40">MP40</option>
          <option value="MA1">MA1</option>
        </select>
        <canvas id="scoreChart"></canvas>
      </div>

      <!-- Chart 2 -->
      <div class="viz-box longest-throw-box">
        <h3>Top 10 Longest Throws</h3>
        <canvas id="longestThrowChart"></canvas>
      </div>
    </div>
  </section>



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