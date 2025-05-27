  
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <title>Head-to-Head</title>
    <link rel="icon" type="image/x-icon" href="./../assets/statmando_icon.png">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- handmade stylesheet -->
    <link rel="stylesheet" href="./../css/head2head.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Permanent+Marker&family=Urbanist:ital,wght@0,100..900;1,100..900&family=Fugaz+One&family=Rubik+Glitch&family=Splash&display=swap" rel="stylesheet">
    <!-- Provides flag images -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"/>
    <!-- provides icons, like the views icon -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- &icon_names=visibility -->
    <!-- JQuery, necessary for DataTables -->
    <script src="https://code.jquery.com/jquery-3.7.1.js" defer></script>
    <script src="./../js/head2head.js" defer></script>
    
    <!-- JS and CSS for DataTables -->
    <link rel="stylesheet" href="https://cdn.datatables.net/2.2.2/css/dataTables.dataTables.css" />
    <script src="https://cdn.datatables.net/2.2.2/js/dataTables.js" defer></script>
    <!-- cdn for Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts" defer></script>
    <!-- Testing Globe Chart -->
    <!-- <script src="https://unpkg.com/three" defer></script> -->
    <script src="https://unpkg.com/globe.gl" defer></script>

  </head>
  
  <body>
  
    <nav>
      <div class="navbar_icon">
        <img src="./../assets/logo-banner.png">
      </div>
  
      <div class="navbar_links">
        <div class="navbar_link">
          <h3>Live</h3>
        </div>
  
        <div class="navbar_link">
          <h3>Rankings</h3>
        </div>
  
        <div class="navbar_link">
          <a href="./../pages/player_list.php" target="_blank" style="margin: 0em; padding: 0em;color: white; text-decoration: none;">
            <h3>Player Profiles</h3>
          </a>
        </div>
  
        <div class="navbar_link">
          <h3>Monday</h3>
        </div>
  
        <div class="navbar_link">
          <a href="./../pages/head2head.php" target="_blank" style="margin: 0em; padding: 0em;color: white; text-decoration: none;">
            <h3>Head-to-Head</h3>
          </a>
        </div>
  
        <div class="navbar_link">
          <h3>StatZone</h3>
        </div>

        <div class="navbar_link">
          <span class="material-symbols-outlined" style="font-size: 2em;">account_circle</span>
        </div>
      </div>
    </nav>

    <div class="head2head_pageTitle">
      <img src="./../assets/logo-banner.png">
      <h1>
        Head-to-Head
      </h1>
    </div>
    
    <section class="comparison_container">
      <div class="slider_container" id="slider_container">
        <div class="sliderContainer_headerSection">
          <div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
            <h2>Pick a Player</h2>
          </div>

          Or

          <div class="initialPlayer_search_container">
            <input id="initial_search_input" placeholder="Search athlete..." type="text">
            <div id="initialPlayer_suggestion" class="suggestion_box"></div>
          </div>
          <!-- <input placeholder="Search for a specific player.."> -->
        </div>
        <div class="slider">
          <div class="item item1" data-value='37817'>
            <!-- <img src="./../assets/75412.jpg"> -->
            <h1>Eagle McMahon</h1>
            <p>#37817</p>
            
          </div>
          <div class="item item2" data-value='64927'>
            <h1>Eveliina Salonen</h1>
            <p>#64927</p>
            
          </div>
          <div class="item item3" data-value='38008'>
            <h1>Richard Wysocki</h1>
            <p>#38008</p>
          </div>
          <div class="item item4" data-value='75412'>
            <h1>Gannon Buhr</h1>
            <p>#75412</p>
          </div>
          <div class="item item5" data-value='73986'>
            <h1>Kristin Latt</h1>
            <p>#73986</p>
          </div>
          <div class="item item6" data-value='27523'>
            <h1>Paul McBeth</h1>
            <p>#27523</p>
          </div>
          <div class="item item7" data-value='48976'>
            <h1>Ohn Scoggins</h1>
            <p>#48976</p>
          </div>
          <button id="next">></button>
          <button id="prev"><</button>
        </div>
      </div>
      <div class="comparison_layout" id="comparison_layout">
        <div class="search_container">
          <div class="player1_search_container">
            <h2>Athlete 1</h2>
            <input id="playerOne_search_input" placeholder="Search athlete..." type="text">
            <div id="playerOne_suggestion" class="suggestion_box"></div>
          </div>

          <div class="player2_search_container">
            <h2>Athlete 2</h2>
            <input id="playerTwo_search_input" placeholder="Search athlete..." type="text">
            <div id="playerTwo_suggestion" class="suggestion_box"></div>
          </div>

        </div>
        <div class="comparison_player_one_bio">
          <div class="playerOne_profilepic">
            <img id="playerone_pic">
          </div>

          <div class="playerone_bioDetails">
            <h3 id="playerone_name"></h3>
            <p id="playerone_home"></p>
            <p id="playerone_pdgaNum"></p>
            <p id="playerone_division"></p>
            <p id="playerone_memberSince"></p>
          </div>
        </div>

        <div class="comparison_center_playerbio">
          <h3>
            Athlete Details
          </h3>
        </div>

        <div class="comparison_player_two_bio">
        <div class="playertwo_bioDetails">
            <h3 id="playertwo_name"></h3>
            <p id="playertwo_home"></p>
            <p id="playertwo_pdgaNum"></p>
            <p id="playertwo_division"></p>
            <p id="playertwo_memberSince"></p>
          </div>

          <div class="playerTwo_profilepic">
            <img id="playertwo_pic">
          </div>
        </div>

        <div class="playerone_radials_container">
          <div class="playerone_radials">
            <div class="player_radials" id="FWH_radial">
      
            </div>

            <div class="player_radials" id="C2R_radial">

            </div>

            <div class="player_radials" id="C1X_radial">

            </div>
          </div>
        </div>

        <div class="player_radials_center">
          <h3>
            Performance
          </h3>

          <div class="h2h_radialDropdown_container">
            <select class="categoryDropdown" id="h2h_radial_dropdown">

            </select>
          </div>
        </div>

        <div class="playertwo_radials_container">
          <div class="playertwo_radials">
            <div class="player_radials" id="FWH_radial2">
        
            </div>

            <div class="player_radials" id="C2R_radial2">

            </div>

            <div class="player_radials" id="C1X_radial2">

            </div>
          </div>
        </div>


        <!-- showing main player stats below bio -->
        <div class="comparison_playerone_stats">
          <div class="mainStats_tiles">
            <h3 id="playerone_wins"></h3>
            <p>Wins</p>
          </div>

          <div class="mainStats_tiles">
            <h3 id="playerone_topTens"></h3>
            <p>Top Tens</p>
          </div>

          <div class="mainStats_tiles">
            <h3 id="playerone_podiums"></h3>
            <p>Podiums</p>
          </div>

          <div class="mainStats_tiles">
            <h3 id="playerone_earnings"></h3>
            <p>Earnings</p>
          </div>

          <div class="mainStats_tiles">
            <h3 id="playerone_rating"></h3>
            <p>Avg. Rating</p>
          </div>

          <div class="mainStats_tiles">
            <h3 id="playerone_events"></h3>
            <p>Total Events</p>
          </div>

          <div class="mainStats_tiles">
            <h3 id="playerone_place"></h3>
            <p>Avg. Place</p>
          </div>

          <div class="mainStats_tiles">
            <h3 id="playerone_strokes"></h3>
            <p>Avg. Strokes</p>
          </div>
        </div>

        <div class="playerstats_center">
          <h3>
            Career Profile
          </h3>

          <div>
            <select class="categoryDropdown" id="h2h_careerProfile_dropdown">
              <option value=''>All-time</option>
              <option value='true'>Last 12 months</option>
            </select>
          </div>
        </div>

        <div class="comparison_playertwo_stats">
          <div class="mainStats_tiles">
            <h3 id="playertwo_wins"></h3>
            <p>Wins</p>
          </div>

          <div class="mainStats_tiles">
            <h3 id="playertwo_topTens"></h3>
            <p>Top Tens</p>
          </div>

          <div class="mainStats_tiles">
            <h3 id="playertwo_podiums"></h3>
            <p>Podiums</p>
          </div>

          <div class="mainStats_tiles">
            <h3 id="playertwo_earnings"></h3>
            <p>Earnings</p>
          </div>

          <div class="mainStats_tiles">
            <h3 id="playertwo_rating"></h3>
            <p>Avg. Rating</p>
          </div>

          <div class="mainStats_tiles">
            <h3 id="playertwo_events"></h3>
            <p>Total Events</p>
          </div>

          <div class="mainStats_tiles">
            <h3 id="playertwo_place"></h3>
            <p>Avg. Place</p>
          </div>

          <div class="mainStats_tiles">
            <h3 id="playertwo_strokes"></h3>
            <p>Avg. Strokes</p>
          </div>
        </div>


        <div class="playerone_radarContainer">
          <canvas id="playerone_radar"></canvas>
        </div>

        <div class="center_radarContainer">
          <h3>
            Skill Profile
          </h3>
          <select id="radar_yearSelect" class="categoryDropdown"></select>
          <select id="radar_eventSelect" class="categoryDropdown"></select>
          <select id="radarModification_curatedOptions">
            <option value=''>Default</option>
            <option value=1>Driving</option>
            <option value=3>Putting</option>
            <option value=4>Scoring</option>
          </select>
          <div class="radar_modification_container">
            <button id="radar_checklist_selectAllBtn" class="radar_checklist_selectAllBtn">
              Select all
            </button>
            <button id="radar_checklist_unselectBtn" class="radar_checklist_unselectBtn">
              Unselect all
            </button>
            <div id="radar_checklist_container">

            </div>
            <button id="radar_checklist_submitBtn" class="radar_checklist_submitBtn">
              Submit
            </button>
          </div>
        </div>

        <div class="playertwo_radarContainer">
          <canvas id="playertwo_radar"></canvas>
        </div>

        <div class="playerVplayer_lineComparison">
          <div class="lineComparison_titleSection">
            <h1>Rating Progression</h1>

          </div>
          <div id="playerVplayer_lineChart">

          </div>

        </div>

      </div>
    </section>
    
    
    
  </body>
  </html>