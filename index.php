<!-- <?php
  include("database.php");
?> -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./css/index.css">
  <title>Document</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Permanent+Marker&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=visibility" />
</head>

<body>
  <nav>
    <div class="navbar_icon">
      <img src="./assets/logo-banner.png">
    </div>

    <div class="navbar_links">
      <div>
        <h3>Live</h3>
      </div>

      <div>
        <h3>Rankings</h3>
      </div>

      <div>
        <h3>Player Profiles</h3>
      </div>

      <div>
        <h3>Monday</h3>
      </div>

      <div>
        <h3>Head-to-Head</h3>
      </div>

      <div>
        <h3>StatZone</h3>
      </div>
    </div>

  </nav>

  <section class="player_container">
    <div class="playerbio_section">
      <div class="playerbio_section_profilepic">
        <img src="./assets/brianSchweberger.jpg" >
      </div>
      

      <div class="playerbio_section_selfIntro">
        <h1>
          Brian
        </h1>

        <h1>
          Schweberger
        </h1>

        <p><i class="fi fi-us"></i> Tarboro, NC</p>

        
      </div>

      <div class="playerbio_section_media">
        <p><i class="material-symbols-outlined">visibility</i>11M views in 74 media appearances</p>
      </div>

      <div class="playerbio_section_mainStats">
        <div class="mainStats_wins">
          <h1>32</h1>
          <p>Wins</p>
        </div>

        <div class="mainStats_topTens">
          <h1>32</h1>
          <p>Top Tens</p>
        </div>

        <div class="mainStats_podiums">
          <h1>32</h1>
          <p>Podiums</p>
        </div>

        <div class="mainStats_earnings">
          <h1>$6,005,234</h1>
          <p>Earnings</p>
        </div>

        
      </div>

      <div class="playerbio_section_searchCompare">
        <h4>See Brian compared to </h4><input placeholder="SEARCH..."><button>Go</button>
      </div>
    </div>
  </section>
  <section class="totalStats_container">
    <div class="totalStats_section">

    </div>
  </section>
</body>
</html>