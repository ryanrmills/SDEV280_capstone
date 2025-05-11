  
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <title>Document</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- handmade stylesheet -->
    <link rel="stylesheet" href="./css/index.css">
    <!-- google font styling -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Permanent+Marker&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <!-- Provides flag images -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"/>
    <!-- provides icons, like the views icon -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- &icon_names=visibility -->
    <!-- JQuery, necessary for DataTables -->
    <script src="https://code.jquery.com/jquery-3.7.1.js" defer></script>
    
    <!-- JS and CSS for DataTables -->
    <link rel="stylesheet" href="https://cdn.datatables.net/2.2.2/css/dataTables.dataTables.css" />
    <script src="https://cdn.datatables.net/2.2.2/js/dataTables.js" defer></script>
    <!-- cdn for Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts" defer></script>
    <!-- Testing Globe Chart -->
    <script src="https://unpkg.com/three" defer></script>
    <script src="https://unpkg.com/globe.gl" defer></script>
    <!-- handmade js file for this specific page -->
    <script src="./js/index.js" defer></script>
  </head>
  
  <body>
  
    <nav>
      <div class="navbar_icon">
        <img src="./assets/logo-banner.png">
      </div>
  
      <div class="navbar_links">
        <div class="navbar_link">
          <h3>Live</h3>
        </div>
  
        <div class="navbar_link">
          <h3>Rankings</h3>
        </div>
  
        <div class="navbar_link">
          <h3>Player Profiles</h3>
        </div>
  
        <div class="navbar_link">
          <h3>Monday</h3>
        </div>
  
        <div class="navbar_link">
          <h3>Head-to-Head</h3>
        </div>
  
        <div class="navbar_link">
          <h3>StatZone</h3>
        </div>

        <div class="navbar_link">
          <span class="material-symbols-outlined" style="font-size: 2em;">account_circle</span>
        </div>
      </div>
  
    </nav>
  
    <section class="player_container">
      
      <div class="playerbio_section">
        <div class="playerbio_section_profilepic">
          <img id="athlete_image">
        </div>
        
  
        <div class="playerbio_section_selfIntro">

          <h4 id="full_name"></h4>
          <div class="player_origin">
            <p id="hometown"></p>
          </div>
          
          <p id="bio_pdga_number"></p>
          <p id="bio_division"></p>

        </div>
        <div class="playerbio_sponsors">

        </div>

        <div class="playerbio_ratingOverTime">

          <div class="ratingOverTime_headerSection">
            <h4>Rating Progression</h4>
            <select class="rating_dropdown">
              <option>All time</option>
            </select>
          </div >

          <div id="rating_lineChart" class="ratingOverTime_chartDiv">

          </div>
        </div>

        <div class="playerbio_globe_events">
          <div id="globe">

          </div>
          
          <div id="globe_tooltip"></div>
        </div>

        <!-- <div class="player_social_media">
          <i class="fa fa-instagram" style="font-size: 24px"></i>
          <i class="fa fa-facebook" style="font-size: 24px"></i>
          <i class="fa fa-twitter" style="font-size: 24px"></i>
        </div> -->
  
        <!-- <div class="playerbio_section_media">
          <p><i class="material-symbols-outlined">visibility</i>3M views in 17 media appearances</p>
          <div class="playerbio_section_searchCompare">
            <p>See </p><h4 id="first_name_compared"></h4><p> compared to </p><input placeholder="ATHLETE NAME..."><button>Go</button>
          </div>
        </div> -->
        <div class="playerbio_highlights">
          <div class="highlights_headerSection">
            <div class="highlights_titleAndH2H">
              <h4>Career Profile</h4>
              <p><a id="head2head_link">Head-to-Head</a></p>
            </div>
            <select id="careerProfile_12moBool" class="career_dropdown">
              <option value=''>All-time</option>
              <option value="true">Last 12 Months</option>
            </select>
          </div>
          <div class="playerbio_section_mainStats">
            <div class="mainStats_wins">
              <h1 id="wins"></h1>
              <p>Wins</p>
            </div>

            <div class="mainStats_wins">
              <h1 id="podiums"></h1>
              <p>Podiums</p>
            </div>
    
            <div class="mainStats_wins">
              <h1 id="top_tens"></h1>
              <p>Top Tens</p>
            </div>
    
            <div class="mainStats_wins">
              <h1 id="earnings"></h1>
              <p>Earnings</p>
            </div>

            <div class="mainStats_wins">
              <h1 id="total_events"></h1>
              <p>Total Events</p>
            </div>

            <div class="mainStats_wins">
              <h1 id="avg_place"></h1>
              <p>Avg. Place</p>
            </div>

            <div class="mainStats_wins">
              <h1 id="avg_rating"></h1>
              <p>Avg. Rating</p>
            </div>

            <div class="mainStats_wins">
              <h1 id="avg_strokes"></h1>
              <p>Avg. Strokes</p>
            </div>
          </div>
        </div>
  
        

        <!-- <div class="playerbio_section_xStats">
          <div class="xStats_totalEvents">
            <h1 id="total_events"></h1>
            <p>Total Events</p>
          </div>

          <div class="xStats_totalEvents">
            <h1 id="avg_place"></h1>
            <p>Avg. Place</p>
          </div>

          <div class="xStats_totalEvents">
            <h1 id="avg_rating"></h1>
            <p>Avg. Rating</p>
          </div>

          <div class="xStats_totalEvents">
            <h1 id="avg_strokes"></h1>
            <p>Avg. Strokes</p>
          </div>
        </div> -->

        
        

        <!-- <div class="playerbio_section_searchCompare">
          <p>See </p><h4 id="first_name_compared"></h4><p> compared to </p><input placeholder="ATHLETE NAME..."><button>Go</button>
        </div> -->
        
        <div class="player_mainRadials">
          <!-- <div style="display:flex; align-items:center;justify-content:center"> -->
            <div class="radialPerformance_headerSection">
              <h4>Performance</h4>
              <div class="radial_configs">
                <select id="radial_dropdown" class="radial_dropdown">
                </select>
              </div>
            </div>

            <div class="radial_bin">
              <div class="player_radials" id="FWH_radial">
    
              </div>
    
              <div class="player_radials" id="C2R_radial">
    
              </div>
    
              <div class="player_radials" id="C1X_radial">
    
              </div>
            </div>
          <!-- </div> -->
          </div>
      </div>
    </section>
    <br>
    <section class="totalStats_container">
      <div class="totalStats_section">
        <div class="totalStats_sectionHeader">
          <h2 class="totalStats_section_title">Skill Profile</h2>

          <div class="totalStats_categoryDropdown">
            <div class="categoryDropdown_years">
              <select id="radar_yearSelect" class="categoryDropdown">
              </select>
            </div>

            <div class="categoryDropdown_years">
              <select id="radar_eventSelect" class="categoryDropdown">
              </select>
            </div>
          </div>
        </div>


        <canvas id="radar_chart"></canvas>
      </div>

      <div class="totalStats_breakdown">
        <div class="totalStats_sectionHeader">
          <h2 class="totalStats_section_title">Breakdown</h2>

          <div class="totalStats_categoryDropdown">
            <div  class="categoryDropdown_years">
              <select id="hbar_dropdown_years" class="categoryDropdown">
              </select>
            </div>

            <div class="categoryDropdown_years">
              <select id="hbar_dropdown_events" class="categoryDropdown">
              </select>
            </div>
          </div>
        </div>
        <canvas id="hbar_percentile_chart" class="breakdown_hbars">

        </canvas>
      </div>
    </section>

    <!-- <section class="playerStats_tableStats">
      <table id="eventsTable" class="display" style="width: 100%;">

      </table>

      <table id="statsTable"  class="display" style="width:100%">

      </table>
    </section> -->
    <!-- <div class="window_globe_tooltip_container">
      
      </div> -->
  </body>
  </html>