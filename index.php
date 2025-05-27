  
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <title id="player_window_title"></title>
    <link rel="icon" type="image/x-icon" href="./assets/statmando_icon.png">
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
    <!-- <link rel="stylesheet" href="https://cdn.datatables.net/2.2.2/css/dataTables.dataTables.css" />
    <script src="https://cdn.datatables.net/2.2.2/js/dataTables.js" defer></script> -->

    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.1/css/buttons.dataTables.min.css">
    <!-- ??????????????????????????????????????????????????????????????????????? -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.1/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.print.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.colVis.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>


    <!-- cdn for Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts" defer></script>
    <!-- Testing Globe Chart -->
    <!-- <script src="https://unpkg.com/three" defer></script> -->
    <script src="https://unpkg.com/globe.gl" defer></script>
    <!-- handmade js file for this specific page -->
    <!-- <script src="./js/index.js" defer></script> -->
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2" defer></script>
    <script type="text/javascript" src="./js/index.js" defer></script>
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
          <a href="./pages/player_list.php" target="_blank" style="margin: 0em; padding: 0em;color: white; text-decoration: none;">
            <h3>Player Profiles</h3>
          </a>
        </div>
  
        <div class="navbar_link">
          <h3>Monday</h3>
        </div>
  
        <div class="navbar_link">
          <a href="./pages/head2head.php" target="_blank" style="margin: 0em; padding: 0em;color: white; text-decoration: none;">
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

    <div class="lowerhalf_container">
      <div class="lowerhalf_mainContent_container">
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
              <div class="sponsors_socials">
                <img src="./assets/yt.png">
                <img src="./assets/x.png">
                <img src="./assets/ig.png">
                <img src="./assets/linkedin.png">
              </div>
              <div class="sponsors_sponsors">
                <img src="./assets/discmania.png">
                <img src="./assets/huklab.png">
                <img src="./assets/innova.png">
              </div>
            </div>
            <!-- This is the part where I create the slideshow -->
            <div class="player_informationalDiv">
              <div class="informationalDiv_mostRecentEvent infoDivSlide">
                <div class="mostRecentEvents_headerSection">
                  <h3>Most Recent Event</h3>
                </div>
                <div class="mostRecentEvents_mainContent">
                  <table>
                    <tr>
                      <th>Event:</th>
                      <td id="mostRecent_eventName" style="font-size: 14px;"></td>
                    </tr>
                    <tr>
                      <th>Location:</th>
                      <td id="mostRecent_eventLocation"></td>
                    </tr>
                    <tr>
                      <th>Date:</th>
                      <td id="mostRecent_eventDate"></td>
                    </tr>
                    <tr>
                      <th>Rating:</th>
                      <td id="mostRecent_eventRating"></td>
                    </tr>
                    <tr>
                      <th>Results:</th>
                      <td id="mostRecent_eventScore"></td>
                      <!-- <th>Place:</th>
                      <td id="mostRecent_eventPlace"></td> -->
                    </tr>
                    <!-- <tr>
                      <th>Place:</th>
                      <td id="mostRecent_eventPlace"></td>
                    </tr> -->
                  </table>

                  <!-- <table>
                      <th>R1:</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th>R2:</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th>R3:</th>
                      <td></td>
                    </tr>
                  </table> -->
                  
                </div>
              </div>

              <div class="infoDiv_top3MetricContainer infoDivSlide">
                <div class="infoDiv_topThreeStat_headerSection">
                  <h3>Top 3 Metrics</h3><p>(last 12 months)</p>
                </div>
                
                <div class="topThree_allMetricsBin">
                  <div class="topThree_firstMetricOverallBin">
                    <div class="topThree_firstMetricContainer">
                      <h3 id="topThree_firstMetricValue"></h3>
                      <h5 id="topThree_firstMetricName"></h5>
                    </div>
                    <p id="topThree_firstMetricRank"></p>
                  </div>

                  <div class="topThree_firstMetricOverallBin">
                    <div class="topThree_firstMetricContainer">
                      <h3 id="topThree_secondMetricValue"></h3>
                      <h5 id="topThree_secondMetricName"></h5>
                    </div>
                    <p id="topThree_secondMetricRank"></p>
                  </div>

                  <div class="topThree_firstMetricOverallBin">
                    <div class="topThree_firstMetricContainer">
                      <h3 id="topThree_thirdMetricValue"></h3>
                      <h5 id="topThree_thirdMetricName"></h5>
                    </div>
                    <p id="topThree_thirdMetricRank"></p>
                  </div>

                </div>
              </div>

              <div class="playerbio_ratingOverTime infoDivSlide">
                <div class="ratingOverTime_headerSection">
                  <h4>Rating Progression</h4>
                  <select class="rating_dropdown">
                    <option>All time</option>
                  </select>
                </div >

                <div id="rating_lineChart" class="ratingOverTime_chartDiv">

                </div>
              </div>

              

              <div class="informationalDiv_leftRightNavigate">
                <span id="infoDiv_cycleLeft" class="material-symbols-outlined" style="cursor: pointer">keyboard_arrow_left</span>
                <span id="infoDiv_cycleRight" class="material-symbols-outlined" style="cursor: pointer">keyboard_arrow_right</span>
              </div>
            </div>
            
            <!-- block it off here for the slideshow. It should end here -->
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
                  <p><a id="head2head_link" target="_blank" style="color: red;">Head-to-Head</a></p>
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
        <div class="allStats_container">
          <div class="totalStats_container">
            <div class="totalStats_section" id="radarChart_container">
              <div class="totalStats_sectionHeader">
                <div class="sectionHeader_titles">
                  <h2 class="totalStats_section_title">Skill Profile</h2>
                  <button id="radarGraphCompareButton">Compare</button>
                </div>

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
              <div class="radar_modification_container">
                <select id="radarModification_curatedOptions">
                  <option value=''>Default</option>
                  <option value=1>Driving</option>
                  <option value=3>Putting</option>
                  <option value=4>Scoring</option>
                </select>
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
              <canvas id="radar_chart"></canvas>
            </div>

            <div id="radarChart_comparisonContainer">
              <div class="totalStats_sectionHeader2">
                <div class="sectionHeader2_titles">
                  <h2 class="totalStats_section_title2">Skill Profile</h2>
                  <button id="radarCompareCloseButton">Close</button>
                </div>  

                <div class="totalStats_categoryDropdown2">
                  <div class="categoryDropdown_years2">
                    <select id="radar_yearSelect2" class="categoryDropdown2">
                    </select>
                  </div>

                  <div class="categoryDropdown_years">
                    <select id="radar_eventSelect2" class="categoryDropdown2">
                    </select>
                  </div>
                </div>
              </div>
              <div class="radar_modification_container2">
                <select id="radarModification_curatedOptions2">
                  <option value=''>Default</option>
                  <option value=1>Driving</option>
                  <option value=3>Putting</option>
                  <option value=4>Scoring</option>
                </select>
                <button id="radar_checklist_selectAllBtn2" class="radar_checklist_selectAllBtn2">
                  Select all
                </button>
                <button id="radar_checklist_unselectBtn2" class="radar_checklist_unselectBtn2">
                  Unselect all
                </button>
                <div id="radar_checklist_container2">

                </div>
                <button id="radar_checklist_submitBtn2" class="radar_checklist_submitBtn2">
                  Submit
                </button>
              </div>
              <canvas id="radar_chart2"></canvas>
            </div>

            <div class="totalStats_breakdown">
              <div class="totalStats_sectionHeader">
                <!-- <div>
                  <h2 class="totalStats_section_title">Breakdown</h2>

                </div> -->
                <div class="sectionHeader_titles">
                  <h2 class="totalStats_section_title">Breakdown</h2>
                  <button id="hBarGraphCompareButton">Compare</button>
                </div>

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
              <!-- <canvas id="hbar_percentile_chart" class="breakdown_hbars">

              </canvas> -->
              <div class="breakdownStats_containsAllHbars">
                <h4>Driving</h4>
                <canvas id="drivingHbar_percentile_chart" class="breakdown_hbars">
                </canvas>
                <!-- <h4>Short Game</h4>
                <canvas id="shortGameHbar_percentile_chart" class="breakdown_hbars">
                </canvas> -->
                <h4>Putting</h4>
                <canvas id="puttingHbar_percentile_chart" class="breakdown_hbars">
                </canvas>
                
                <h4>Scoring</h4>
                <canvas id="scoringHbar_percentile_chart" class="breakdown_hbars">
                </canvas>
              </div>
              
              
            </div>
            <div class="totalStats_breakdown2" id="totalStats_breakdown2">
              <div class="totalStats_sectionHeader">
                <!-- <div>
                  <h2 class="totalStats_section_title">Breakdown</h2>

                </div> -->
                <div class="sectionHeader2_titles">
                  <h2 class="totalStats_section_title">Breakdown</h2>
                  <button id="hBarGraphCompareButton2">Close</button>
                </div>

                <div class="totalStats_categoryDropdown">
                  <div  class="categoryDropdown_years">
                    <select id="hbar_dropdown_years2" class="categoryDropdown">
                    </select>
                  </div>

                  <div class="categoryDropdown_years">
                    <select id="hbar_dropdown_events2" class="categoryDropdown">
                    </select>
                  </div>
                </div>
              </div>
              <!-- <canvas id="hbar_percentile_chart" class="breakdown_hbars">

              </canvas> -->
              <div class="breakdownStats_containsAllHbars">
                <h4>Driving</h4>
                <canvas id="drivingHbar_percentile_chart2" class="breakdown_hbars">
                </canvas>
                <!-- <h4>Short Game</h4>
                <canvas id="shortGameHbar_percentile_chart" class="breakdown_hbars">
                </canvas> -->
                <h4>Putting</h4>
                <canvas id="puttingHbar_percentile_chart2" class="breakdown_hbars">
                </canvas>
                
                <h4>Scoring</h4>
                <canvas id="scoringHbar_percentile_chart2" class="breakdown_hbars">
                </canvas>
              </div>
            </div>
          </div>
        </div>

        <br>
          <section class="playerStatsContainer">
            <div class="playerStats_tabsSection">
              <div id="tabsSection_eventTab">
                <h1>Events</h1>
              </div>
              <div id="tabsSection_roundsTab">
                <h1>Rounds</h1>
              </div>
            </div>
            <div id="eventsTableParentContainer" class="eventsTableParentContainer">
              <table id="eventsTable" class="display stripe hover">
              
              </table>
            </div>


            <div id="roundsTableParentContainer" class="roundsTableParentContainer">
              <table id="roundsTable" class="display stripe hover" style="width: 100%;">
              
              </table>
            </div>

            <div style="height: 100px;">

            </div>
          
          </section>
          <section id="hoverTab_eventRound_comparison" class="hoverTab_eventRound_comparison">
            <div class="eventRound_mainContent">
              <div class="hoverTab_mainContent_headerSection">
                <h1>Quick Compare</h1>
              </div>

              <div class="hoverTab_mainContent_compareSelector">
                <p>Compare</p>
                <select id="compareSelector_optionSelect">
                  <option value=''>Choose...</option>
                  <option value='years'>Years</option>
                  <option value='events'>Events</option>
                  <option value='rounds'>Rounds</option>
                </select>
              </div>

              <div id="hoverTab_mainContent_resultsDisplay" class="hoverTab_mainContent_resultsDisplay">
                <table class=resultsTable_yearOption>
                  <tr>
                    <th></th>
                    <th>
                      <div id="mainContent_resultsDisplay_firstCompare">
                      </div>
                    </th>
                    <th>
                      <div id="mainContent_resultsDisplay_secondCompare">
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th>Avg. Rating</th>
                    <td id="year1_rating"></td>
                    <td id="year2_rating"></td>
                  </tr>
                  <tr>
                    <th>Earnings</th>
                    <td id="year1_earnings"></td>
                    <td id="year2_earnings"></td>
                  </tr>
                  <tr>
                    <th>Wins</th>
                    <td id="year1_wins"></td>
                    <td id="year2_wins"></td>
                  </tr>
                  <tr>
                    <th>Podiums</th>
                    <td id="year1_podiums"></td>
                    <td id="year2_podiums"></td>
                  </tr>
                  <tr>
                    <th>TopTens</th>
                    <td id="year1_topTens"></td>
                    <td id="year2_topTens"></td>
                  </tr>
                  <tr>
                    <th>Events</th>
                    <td id="year1_events"></td>
                    <td id="year2_events"></td>
                  </tr>
                  <tr>
                    <th>Avg. Strokes</th>
                    <td id="year1_strokes"></td>
                    <td id="year2_strokes"></td>
                  </tr>
                  <tr>
                    <th>Avg. Place</th>
                    <td id="year1_place"></td>
                    <td id="year2_place"></td>
                  </tr>
                  <tr>
                    <th>FWH%</th>
                    <td id="year1_fwh"></td>
                    <td id="year2_fwh"></td>
                  </tr>
                  <tr>
                    <th>C2R%</th>
                    <td id="year1_c2r"></td>
                    <td id="year2_c2r"></td>
                  </tr>
                  <tr>
                    <th>C1X%</th>
                    <td id="year1_c1x"></td>
                    <td id="year2_c1x"></td>
                  </tr>
                </table>
                
              </div>
              
            </div>
            <div id="eventRound_pullButton" class="eventRound_pullButton">
              <div>
                <span class="material-symbols-outlined" style="font-size: 2em;">chevron_right</span>
              </div>
            </div>
          </section>
        </div>
        <div id="playerRankings_container_bin" class="playerRankings_container">
          <div class="playerRankings_headerSection">
            <h2>Player Rankings</h2>
            <select id="playerRanking_metricSelect">
              <option value=''>Default</option>
              <option value="1">Fairway Hits</option>
              <option value="2">C1R</option>
              <option value="3">C2R</option>
              <option value="4">Parked</option>
              <option value="5">Scramble</option>
              <option value="6">C1 Putting</option>
              <option value="7">C1X Putting</option>
              <option value="8">C2 Putting</option>
              <option value="10">Birdie Rate</option>
              <option value="13">Par %</option>
              <option value="14">Birdie %</option>
              <option value="15">Eagle+ %</option>
              <option value="16">Putting(Total Distance)</option>
              <option value="17">Throw in (Longest)</option>
              <option value="18">Putting Average</option>
            </select>
          </div>
          <div class="primary_playerRanking_container">
            <div class="primaryPlayer_nameAndRank">
              <h4 id="primaryPlayerRanking_fullName"></h4>
              <h3 id="primaryPlayerRanking_ranking"></h3>
            </div>
            <div class="primaryPlayer_finerDetails">
              <p id="primaryPlayerEventNum"></p>
              <p id="primaryPlayerRoundNum"></p>
              <h3 id="primaryPlayerRatingNum"></h3>
            </div>
          </div>
          <div id="playerRankings_container" class="playerRankings_container">
  
          </div>
        </div>
      </div>
  </body>
  </html>