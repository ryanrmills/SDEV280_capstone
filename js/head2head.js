const urlParams = new URLSearchParams(window.location.search);
let pdgaNumOne = urlParams.get("pdga_number1");
let pdgaNumTwo = urlParams.get("pdga_number2");

const playerBioUrl = `http://localhost/sdev280capstone/api/get_player_info.php`;
const playerRadialUrl = `http://localhost/sdev280capstone/api/player_radials.php`;
const playerRadarUrl = `http://localhost/sdev280capstone/api/player_radar.php`;
const playerRatingUrl = `http://localhost/sdev280capstone/api/player_rating.php`;
const playerSearchUrl =  `http://localhost/sdev280capstone/api/player_search.php`;
const playerYearsUrl = `http://localhost/sdev280capstone/api/player_years.php`;
const statIdsList = `http://localhost/sdev280capstone/api/get_abbrev_and_stat.php`;
const playerEventsUrl = `http://localhost/sdev280capstone/api/player_events.php`;


// const playerBioUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/get_player_info.php`;
// const playerRadialUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_radials.php`;
// const playerRadarUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_radar.php`;
// const playerRatingUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_rating.php`;
// const playerSearchUrl =  `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_search.php`;
// const playerYearsUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_years.php`;
// const statIdsList = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/get_abbrev_and_stat.php`;
// const playerEventsUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_events.php`;


async function getJsons(url){
  try {
    const response = await fetch(url);
    if (!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const playerInfoJson = await response.json();
    return playerInfoJson;

  } catch (error){
    console.log("Something went wrong: " + error);
  }
}

if (pdgaNumOne || pdgaNumTwo){
  document.getElementById('comparison_layout').style.display = 'grid';
} else if (!pdgaNumOne && !pdgaNumTwo){
  document.getElementById('slider_container').style.display = 'flex';
}


let playerOneInput = document.getElementById('playerOne_search_input');
let playerTwoInput = document.getElementById('playerTwo_search_input');
let playerOneSuggestion = document.getElementById('playerOne_suggestion');
let playerTwoSuggestion = document.getElementById('playerTwo_suggestion');

playerOneInput.addEventListener('input', async () => {
  let query = playerOneInput.value.trim();
  if (query.length === 0){
    playerOneSuggestion.style.display = 'none';
    return;
  }

  let url = query
    ? playerSearchUrl + `?query=` + query
    : '';

  let searchData = await getJsons(url);

  playerOneSuggestion.innerHTML = "";

  if (searchData.length > 0){
    searchData.forEach((suggestion) => {
      let player = document.createElement('div');
      player.className = 'playerOneOptions';
      
      let playerName = document.createElement('h4');
      playerName.innerHTML = suggestion.full_name;

      let playerId = document.createElement('p');
      playerId.innerHTML = `#${suggestion.pdga_number}`;

      player.append(playerName);
      player.append(playerId);


      player.onclick = () => {
        pdgaNumOne = suggestion.pdga_number;
        window.location.href = pdgaNumTwo
          ? `./head2head.php?pdga_number1=${pdgaNumOne}&pdga_number2=${pdgaNumTwo}`
          : `./head2head.php?pdga_number1=${pdgaNumOne}`;
      }
      playerOneSuggestion.append(player);
    })
    playerOneSuggestion.style.display = 'flex';
  } else {
    playerOneSuggestion.style.display = 'none';
  }

})

playerTwoInput.addEventListener('input', async () => {
  let query = playerTwoInput.value.trim();
  if (query.length === 0){
    playerTwoSuggestion.style.display = 'none';
    return;
  }

  let url = query
    ? playerSearchUrl + `?query=` + query
    : '';

  let searchData = await getJsons(url);

  playerTwoSuggestion.innerHTML = "";

  if (searchData.length > 0){
    searchData.forEach((suggestion) => {
      let player = document.createElement('div');
      player.className = 'playerTwoOptions';
      
      let playerName = document.createElement('h4');
      playerName.innerHTML = suggestion.full_name;

      let playerId = document.createElement('p');
      playerId.innerHTML = `#${suggestion.pdga_number}`;

      player.append(playerName);
      player.append(playerId);


      player.onclick = () => {
        pdgaNumTwo = suggestion.pdga_number;
        window.location.href = pdgaNumOne
          ? `./head2head.php?pdga_number1=${pdgaNumOne}&pdga_number2=${pdgaNumTwo}`
          : `./head2head.php?pdga_number2=${pdgaNumTwo}`;
      }
      playerTwoSuggestion.append(player);
    })
    playerTwoSuggestion.style.display = 'flex';
  } else {
    playerTwoSuggestion.style.display = 'none';
  }

})






const radialCharts = {
  FWH_radial: null,
  C2R_radial: null,
  C1X_radial: null,


  FWH_radial2: null,
  C2R_radial2: null,
  C1X_radial2: null
};


function createOrUpdateRadial(elementId, label, value, color) {
  if (!color){
    color = "#000000";
  }

  const el = document.querySelector(`#${elementId}`);
  const opts = {
    series: [value],
    labels: [`${label}%`],
    chart: { height: 170, type: 'radialBar' },
    colors: ["#00450E"],
    plotOptions: {
      radialBar: {
        // 
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: { 
            show: true,
            offsetY: 60,
            fontSize: '14px', 
            fontWeight: 550, 
            color: color//"#FEFAE0"
          },
          value: {
            show: true,
            offsetY: -6,
            fontSize: '20px',
            fontWeight: 800,
            color: color,//'#FEFAE0',
            formatter: v => v
          }
        },
        hollow: { size: "50%", /*background: "#FFEDD6"*/ }
      }
    },
    fill: {
      type: "gradient",
      gradient: { shade: "dark", type: "diagonal", gradientToColors: ["#20E647"], stops: [0,100] }
    },
    stroke: { lineCap: "round" }
  };

  if (radialCharts[elementId]) {
    // already created → just update
    radialCharts[elementId].updateSeries(opts.series);
    radialCharts[elementId].updateOptions({ labels: opts.labels });
  } else {
    // first time → create & render
    radialCharts[elementId] = new ApexCharts(el, opts);
    radialCharts[elementId].render();
  }
}


async function displayPlayerRadials(){


  let yearUrl = 
    pdgaNumOne && !pdgaNumTwo ? playerYearsUrl + "?pdga_number=" + pdgaNumOne :
    pdgaNumOne && pdgaNumTwo ? playerYearsUrl + "?pdga_number=" + pdgaNumOne :
    !pdgaNumOne && pdgaNumTwo ? playerYearsUrl + "?pdga_number=" + pdgaNumTwo :
    '';

  const yearSelect = document.getElementById('h2h_radial_dropdown');
  const allOptYears = document.createElement('option');
  allOptYears.innerHTML = 'All Time';
  allOptYears.value = '';
  yearSelect.append(allOptYears);

  const yearData = yearUrl ? await getJsons(yearUrl) : '';

  yearData.forEach((year) => {
    let yearOption = document.createElement('option');
    yearOption.innerHTML = year;
    yearOption.value = year;
    yearSelect.append(yearOption);
  })

  async function drawRadials(year){
    let url = pdgaNumOne
      ? playerRadialUrl + `?pdga_number=${pdgaNumOne}`
      : '';

    url = year
      ? url + "&year=" + year : url;
        
    let url2 = pdgaNumTwo
      ? playerRadialUrl + `?pdga_number=${pdgaNumTwo}`
      : '';
    
    url2 = year
      ? url2 + "&year=" + year : url2;
        
        
    const data = pdgaNumOne ? await getJsons(url) : '';
    const [ fwhLabel, c2rLabel, c1xLabel ] = data ? data.stat : '';
    const [ fwhVal,   c2rVal,   c1xVal   ] = data ? data.values : '';
        
    const data2 = pdgaNumTwo ? await getJsons(url2) : '';
    const [ fwhLabel2, c2rLabel2, c1xLabel2 ] = data2 ? data2.stat : '';
    const [ fwhVal2,   c2rVal2,   c1xVal2   ] = data2 ? data2.values : '';
    

      /**
       * Color comparison section
       * depending on the comparison of tow values, they're either
       * #FF3E3E or'#A6FFA6 if they're higher or lwoer than the other
       * then assign the color to 'createOrUpdateRadial
       */

    let fwhValcolor, c2rValcolor, c1xValcolor, fwhVal2color, c2rVal2color, c1xVal2color
    if (data && data2){
      if (Number(fwhVal) < Number(fwhVal2)){
        fwhValcolor = '#C20017';
        fwhVal2color = '#20A000';
      } else if (Number(fwhVal) > Number(fwhVal2)){
        fwhValcolor = '#20A000';
        fwhVal2color = '#C20017';
      }
    
      if (Number(c2rVal) < Number(c2rVal2)){
        c2rValcolor = '#C20017';
        c2rVal2color = '#20A000';
      } else if (Number(c2rVal) > Number(c2rVal2)){
        c2rValcolor = '#20A000';
        c2rVal2color = '#C20017';
      }
    
      if (Number(c1xVal) < Number(c1xVal2)){
        c1xValcolor = '#C20017';
        c1xVal2color = '#20A000';
      } else if (Number(c1xVal) > Number(c1xVal2)){
        c1xValcolor = '#20A000';
        c1xVal2color = '#C20017';
      }
    }

      
    if (data){
      createOrUpdateRadial("FWH_radial", fwhLabel, fwhVal, fwhValcolor);
      createOrUpdateRadial("C2R_radial", c2rLabel, c2rVal, c2rValcolor);
      createOrUpdateRadial("C1X_radial", c1xLabel, c1xVal, c1xValcolor);
    }

    if (data2){
      createOrUpdateRadial("FWH_radial2", fwhLabel2, fwhVal2, fwhVal2color);
      createOrUpdateRadial("C2R_radial2", c2rLabel2, c2rVal2, c2rVal2color);
      createOrUpdateRadial("C1X_radial2", c1xLabel2, c1xVal2, c1xVal2color);
    }
  }

  yearSelect.addEventListener('change', (e) => {
    drawRadials(e.target.value);
  });

  drawRadials('');
}

displayPlayerRadials();




async function displayPlayerBio(
  pdgaNum, 
  picElement, 
  nameElement, 
  homeElement,
  pdgaNumElement,
  divElement,
  memberElement,
  winsElement,
  tensElement,
  podiumsElement,
  earningsElement,
  avgRateElement,
  totalEventsElement,
  avgPlaceElement,
  avgStrokesPerEventElement,


  pdgaNum2, 
  picElement2, 
  nameElement2, 
  homeElement2,
  pdgaNumElement2,
  divElement2,
  memberElement2,
  winsElement2,
  tensElement2,
  podiumsElement2,
  earningsElement2,
  avgRateElement2,
  totalEventsElement2,
  avgPlaceElement2,
  avgStrokesPerEventElement2
)
{

  const h2hCareerProfileDropdown = document.getElementById('h2h_careerProfile_dropdown');
    
  async function drawCareerProfile(isLast12){
      /**
     * Pulling data for playerOne
     * Adding contents for playerOne
     */

    let url = pdgaNum
      ? playerBioUrl + `?pdga_number=${pdgaNum}`
      : '';

    url = isLast12
      ? url + '&is_last_12_months=' + isLast12
      : url;
  
    
    const data = url ? await getJsons(url) : '';

    if (data){
      let earnings = parseFloat(data.player.earnings).toLocaleString('en-US')
    
      document.getElementById(picElement).src = `./../assets/${data.player.pdga_number}.jpg`;
      document.getElementById(nameElement).innerHTML = data.player.full_name;
      document.getElementById(homeElement).innerHTML = data.player.hometown;
      document.getElementById(pdgaNumElement).innerHTML = `#${data.player.pdga_number}`;
      document.getElementById(divElement).innerHTML = `${data.player.division} Division`;
      document.getElementById(memberElement).innerHTML = `member since <strong>${data.player.member_since}</strong>`;
      document.getElementById(winsElement).innerHTML = data.player.wins;
      document.getElementById(tensElement).innerHTML = data.player.top_tens;
      document.getElementById(podiumsElement).innerHTML = data.player.podiums;
      document.getElementById(earningsElement).innerHTML = `$${earnings}`
      document.getElementById(avgRateElement).innerHTML = data.player.avg_rating;
      document.getElementById(totalEventsElement).innerHTML = data.player.total_events;
      document.getElementById(avgPlaceElement).innerHTML = data.player.avg_place;
      document.getElementById(avgStrokesPerEventElement).innerHTML = data.player.avg_strokes_per_event;
    } else if (!data){
      document.getElementById(picElement).src = `./../assets/blank-profile.jpg`;
    }
    
    
    
    
    /**
     * Pulling data for playerTwo
     * Inserting data to proper elements - playerTwo
     */
    let url2 = pdgaNum2
      ? playerBioUrl + `?pdga_number=${pdgaNum2}`
      : '';

    url2 = isLast12
      ? url2 + '&is_last_12_months=' + isLast12
      : url2;
    
    
    const data2 = url2 ? await getJsons(url2) : '';

    if (data2){
      let earnings2 = parseFloat(data2.player.earnings).toLocaleString('en-US')
      document.getElementById(picElement2).src = `./../assets/${data2.player.pdga_number}.jpg`;
      document.getElementById(nameElement2).innerHTML = data2.player.full_name;
      document.getElementById(homeElement2).innerHTML = data2.player.hometown;
      document.getElementById(pdgaNumElement2).innerHTML = `#${data2.player.pdga_number}`;
      document.getElementById(divElement2).innerHTML = `${data2.player.division} Division`;
      document.getElementById(memberElement2).innerHTML = `member since <strong>${data2.player.member_since}</strong>`;
      document.getElementById(winsElement2).innerHTML = data2.player.wins;
      document.getElementById(tensElement2).innerHTML = data2.player.top_tens;
      document.getElementById(podiumsElement2).innerHTML = data2.player.podiums;
      document.getElementById(earningsElement2).innerHTML = `$${earnings2}`
      document.getElementById(avgRateElement2).innerHTML = data2.player.avg_rating;
      document.getElementById(totalEventsElement2).innerHTML = data2.player.total_events;
      document.getElementById(avgPlaceElement2).innerHTML = data2.player.avg_place;
      document.getElementById(avgStrokesPerEventElement2).innerHTML = data2.player.avg_strokes_per_event;
    } else if (!data2){
      document.getElementById(picElement2).src = `./../assets/blank-profile.jpg`;
    }

    

    /**
     * Start comparisons for stats
     */
    if (data && data2){
      if (parseInt(data.player.wins) > parseInt(data2.player.wins)){
        document.getElementById(winsElement).style.color = '#A6FFA6';
        document.getElementById(winsElement2).style.color = '#FF3E3E';
      } else if (parseInt(data.player.wins) < parseInt(data2.player.wins)) {
        document.getElementById(winsElement2).style.color = '#A6FFA6';
        document.getElementById(winsElement).style.color = '#FF3E3E';
      }
  
  
      if (parseInt(data.player.top_tens) > parseInt(data2.player.top_tens)){
        document.getElementById(tensElement).style.color = '#A6FFA6';
        document.getElementById(tensElement2).style.color = '#FF3E3E';
      } else if (parseInt(data.player.top_tens) < parseInt(data2.player.top_tens)) {
        document.getElementById(tensElement2).style.color = '#A6FFA6';
        document.getElementById(tensElement).style.color = '#FF3E3E';
      }
  
      if (parseInt(data.player.podiums) > parseInt(data2.player.podiums)){
        document.getElementById(podiumsElement).style.color = '#A6FFA6';
        document.getElementById(podiumsElement2).style.color = '#FF3E3E';
      } else if (parseInt(data.player.podiums) < parseInt(data2.player.podiums)) {
        document.getElementById(podiumsElement2).style.color = '#A6FFA6';
        document.getElementById(podiumsElement).style.color = '#FF3E3E';
      }
  
      if (parseInt(data.player.podiums) > parseInt(data2.player.podiums)){
        document.getElementById(podiumsElement).style.color = '#A6FFA6';
        document.getElementById(podiumsElement2).style.color = '#FF3E3E';
      } else if (parseInt(data.player.podiums) < parseInt(data2.player.podiums)) {
        document.getElementById(podiumsElement2).style.color = '#A6FFA6';
        document.getElementById(podiumsElement).style.color = '#FF3E3E';
      }
  
      if (parseInt(data.player.earnings) > parseInt(data2.player.earnings)){
        document.getElementById(earningsElement).style.color = '#A6FFA6';
        document.getElementById(earningsElement2).style.color = '#FF3E3E';
      } else if (parseInt(data.player.earnings) < parseInt(data2.player.earnings)) {
        document.getElementById(earningsElement2).style.color = '#A6FFA6';
        document.getElementById(earningsElement).style.color = '#FF3E3E';
      }
  
      if (parseInt(data.player.avg_rating) > parseInt(data2.player.avg_rating)){
        document.getElementById(avgRateElement).style.color = '#A6FFA6';
        document.getElementById(avgRateElement2).style.color = '#FF3E3E';
      } else if (parseInt(data.player.avg_rating) < parseInt(data2.player.avg_rating)) {
        document.getElementById(avgRateElement2).style.color = '#A6FFA6';
        document.getElementById(avgRateElement).style.color = '#FF3E3E';
      }
  
      if (parseInt(data.player.avg_rating) > parseInt(data2.player.avg_rating)){
        document.getElementById(avgRateElement).style.color = '#A6FFA6';
        document.getElementById(avgRateElement2).style.color = '#FF3E3E';
      } else if (parseInt(data.player.avg_rating) < parseInt(data2.player.avg_rating)) {
        document.getElementById(avgRateElement2).style.color = '#A6FFA6';
        document.getElementById(avgRateElement).style.color = '#FF3E3E';
      }
  
      if (parseInt(data.player.total_events) > parseInt(data2.player.total_events)){
        document.getElementById(totalEventsElement).style.color = '#A6FFA6';
        document.getElementById(totalEventsElement2).style.color = '#FF3E3E';
      } else if (parseInt(data.player.total_events) < parseInt(data2.player.total_events)) {
        document.getElementById(totalEventsElement2).style.color = '#A6FFA6';
        document.getElementById(totalEventsElement).style.color = '#FF3E3E';
      }
  
      if (parseInt(data.player.avg_place) < parseInt(data2.player.avg_place)){
        document.getElementById(avgPlaceElement).style.color = '#A6FFA6';
        document.getElementById(avgPlaceElement2).style.color = '#FF3E3E';
      } else if (parseInt(data.player.avg_place) > parseInt(data2.player.avg_place)) {
        document.getElementById(avgPlaceElement2).style.color = '#A6FFA6';
        document.getElementById(avgPlaceElement).style.color = '#FF3E3E';
      }
  
      if (parseInt(data.player.avg_strokes_per_event) < parseInt(data2.player.avg_strokes_per_event)){
        document.getElementById(avgStrokesPerEventElement).style.color = '#A6FFA6';
        document.getElementById(avgStrokesPerEventElement2).style.color = '#FF3E3E';
      } else if (parseInt(data.player.avg_strokes_per_event) > parseInt(data2.player.avg_strokes_per_event)) {
        document.getElementById(avgStrokesPerEventElement2).style.color = '#A6FFA6';
        document.getElementById(avgStrokesPerEventElement).style.color = '#FF3E3E';
      }
    }
  }

  h2hCareerProfileDropdown.addEventListener('change', (e) => {
    document.getElementById(winsElement).innerHTML = '';
    document.getElementById(tensElement).innerHTML = '';
    document.getElementById(podiumsElement).innerHTML = '';
    document.getElementById(earningsElement).innerHTML = '';
    document.getElementById(avgRateElement).innerHTML = '';
    document.getElementById(totalEventsElement).innerHTML = '';
    document.getElementById(avgPlaceElement).innerHTML = '';
    document.getElementById(avgStrokesPerEventElement).innerHTML = '';

    document.getElementById(winsElement2).innerHTML = '';
    document.getElementById(tensElement2).innerHTML = '';
    document.getElementById(podiumsElement2).innerHTML = '';
    document.getElementById(earningsElement2).innerHTML = '';
    document.getElementById(avgRateElement2).innerHTML = '';
    document.getElementById(totalEventsElement2).innerHTML = '';
    document.getElementById(avgPlaceElement2).innerHTML = '';
    document.getElementById(avgStrokesPerEventElement2).innerHTML = '';

    drawCareerProfile(e.target.value);
  })

  drawCareerProfile('');
}

displayPlayerBio(
  pdgaNumOne,
  'playerone_pic',
  'playerone_name',
  'playerone_home',
  'playerone_pdgaNum',
  'playerone_division',
  'playerone_memberSince',
  "playerone_wins",
  "playerone_topTens",
  "playerone_podiums",
  "playerone_earnings",
  "playerone_rating",
  "playerone_events",
  "playerone_place",
  "playerone_strokes",


  pdgaNumTwo,
  'playertwo_pic',
  'playertwo_name',
  'playertwo_home',
  'playertwo_pdgaNum',
  'playertwo_division',
  'playertwo_memberSince',
  "playertwo_wins",
  "playertwo_topTens",
  "playertwo_podiums",
  "playertwo_earnings",
  "playertwo_rating",
  "playertwo_events",
  "playertwo_place",
  "playertwo_strokes"
)






async function displayPlayerRadars(
){
  /**
   * Creating radar blueprint
   * to be called upon later
   */
  let radarChartOne, radarChartTwo;
  async function createOrUpdateRadar(
    label, 
    data, 
    elementId,
    label2,
    data2,
    elementId2
  ){
    //grab element
    let canvas = document.getElementById(`${elementId}`);
    let canvas2 = document.getElementById(`${elementId2}`);

    let options = {
      type: 'radar',
      data: {
        labels: label,//data.abbrev,
        datasets: [{
          label: 'Performance',
          data: data,//data.z_score,
          fill: true,
          backgroundColor: 'rgba(0, 183, 64, 0.2)',
          borderColor:   'rgb(1, 97, 27)',
          borderWidth: 2,
          pointBackgroundColor: 'rgb(54, 162, 235)'
        }]
      },
      options: {
        responsive: false,
        scales: {
          r: {
            beginAtZero: false,
            suggestedMax: 0.8,
            suggestedMin: -1,
            ticks: {
              font: { size: 8 },
              color: '#EA7317'
            },
            pointLabels: {
              font: { size: 12 },
              color: '#252525'
            },
            grid: { circular: true }
          }
        },
        plugins: { legend: { display: false } }
      }
    }

    let options2 = {
      type: 'radar',
      data: {
        labels: label2,//data.abbrev,
        datasets: [{
          label: 'Performance',
          data: data2,//data.z_score,
          fill: true,
          backgroundColor: 'rgba(0, 183, 64, 0.2)',
          borderColor:   'rgb(1, 97, 27)',
          borderWidth: 2,
          pointBackgroundColor: 'rgb(54, 162, 235)'
        }]
      },
      options: {
        responsive: false,
        scales: {
          r: {
            beginAtZero: false,
            suggestedMax: 0.8,
            suggestedMin: -1,
            ticks: {
              font: { size: 8 },
              color: '#EA7317'
            },
            pointLabels: {
              font: { size: 12 },
              color: '#252525'
            },
            grid: { circular: true }
          }
        },
        plugins: { legend: { display: false } }
      }
    }



    if (radarChartOne){
      radarChartOne.data.labels = label;
      radarChartOne.data.datasets[0].data = data;
      radarChartOne.update();
    } else {

      radarChartOne = new Chart(canvas, options);
    }

    if (radarChartTwo){
      radarChartTwo.data.labels = label2;
      radarChartTwo.data.datasets[0].data = data2;
      radarChartTwo.update();
    } else {

      radarChartTwo = new Chart(canvas2, options2);
    }

  }
  const radarChecklistContainer = document.getElementById('radar_checklist_container');
  const statIdsData = await getJsons(statIdsList);

  for (let i = 0; i < statIdsData.id.length; i++){
    const label = document.createElement('label');
    label.style.display = 'block';

    const checkInput = document.createElement('input');
    checkInput.type = 'checkbox';
    checkInput.id = 'stats_check';
    checkInput.value = statIdsData.id[i]
    label.append(checkInput);

    label.append(statIdsData.name[i]);

    const hoverDiv = document.createElement('div');
    hoverDiv.className = 'radar_modification_list_hover';
    hoverDiv.style.display = 'none';
    hoverDiv.style.position = 'fixed';

    const hoverDivTextTitle = document.createElement('p');
    hoverDivTextTitle.style.fontWeight = 'bolder';
    const hoverDivTextDesc = document.createElement('p');


    hoverDivTextTitle.innerHTML = statIdsData.fullName[i];
    hoverDivTextTitle.style.display = 'block';
    hoverDiv.append(hoverDivTextTitle);

    hoverDivTextDesc.innerHTML = statIdsData.desc[i];
    hoverDivTextDesc.style.display = 'block';
    hoverDiv.append(hoverDivTextDesc);   

    label.addEventListener('mouseover', e => {
      hoverDiv.style.display = 'block';
    })

    label.addEventListener('mousemove', e => {
      hoverDiv.style.left = (e.clientX + 8) + 'px';
      hoverDiv.style.top = (e.clientY - 30) + 'px';
    })

    label.addEventListener('mouseout', e => {
      hoverDiv.style.display = 'none';
    })

    label.append(hoverDiv);
    radarChecklistContainer.append(label);  
  }

  const yearSelect = document.getElementById('radar_yearSelect');
  const radarSelect = document.getElementById('radar_eventSelect');
  
  const allOptYears = document.createElement('option');
  allOptYears.value = '';
  allOptYears.textContent = 'All Time';
  yearSelect.append(allOptYears);

  const allOptEvents = document.createElement('option');
  allOptEvents.value = '';

  allOptEvents.textContent = 'All Events';
  radarSelect.append(allOptEvents);

  let yearUrl = 
    pdgaNumOne && !pdgaNumTwo ? playerYearsUrl + "?pdga_number=" + pdgaNumOne :
    pdgaNumOne && pdgaNumTwo ? playerYearsUrl + "?pdga_number=" + pdgaNumOne :
    !pdgaNumOne && pdgaNumTwo ? playerYearsUrl + "?pdga_number=" + pdgaNumTwo :
    '';

  const dataYear = yearUrl ? await getJsons(yearUrl) : '';

  dataYear.forEach((y) => {
    const option = document.createElement('option'); 
    option.value = y;
    option.innerHTML = y;
    yearSelect.append(option);
  })

  async function drawRadars(year, eventId, valuesIds){
    let url = pdgaNumOne
      ? playerRadarUrl + `?pdga_number=${pdgaNumOne}`
      : '';

    url = year 
      ? url + "&year=" + year
      : url;
    
    url = eventId
      ? url + "&event=" + eventId
      : url;
      
    let url2 = pdgaNumTwo
      ? playerRadarUrl + `?pdga_number=${pdgaNumTwo}`
      : '';
    
    url2 = year
      ? url2 + "&year=" + year
      : url2;
    
    url2 = eventId
      ? url2 + "&event=" + eventId
      : url2;
    
    if (valuesIds.length > 0){
      url = url + "&ids=" + valuesIds;
      url2 = url2 + "&ids=" + valuesIds;
    }

    const data = url ? await getJsons(url) : '';
    let labelsOne = data ? data.abbrev : '';
    let dataOne = data ? data.z_score : '';
    let elementIdOne = 'playerone_radar';

    const data2 = url2 ? await getJsons(url2) : '';
    let labelsTwo = data2 ? data2.abbrev : '';
    let dataTwo = data2 ? data2.z_score : '';
    let elementIdTwo = 'playertwo_radar';

    createOrUpdateRadar(
      labelsOne,
      dataOne,
      elementIdOne,

      labelsTwo,
      dataTwo,
      elementIdTwo
    )
  }

  async function getEventsFromYear(year){
    let eventsUrl = 
      pdgaNumOne && !pdgaNumTwo ? playerEventsUrl + "?pdga_number=" + pdgaNumOne :
      pdgaNumOne && pdgaNumTwo ? playerEventsUrl + "?pdga_number=" + pdgaNumOne :
      !pdgaNumOne && pdgaNumTwo ? playerEventsUrl + "?pdga_number=" + pdgaNumTwo :
      '';
    eventsUrl = year ? eventsUrl + "&year=" + year : eventsUrl;

    console.log(eventsUrl)

    const eventsList = eventsUrl ? await getJsons(eventsUrl) : '';
    eventsList.forEach((e) => {
      const option = document.createElement('option');
      option.value = e.pdga_event_id;
      option.innerHTML = e.name;
      radarSelect.append(option);
    })

  }

  yearSelect.addEventListener('change', e => {

    radarSelect.innerHTML = '';

    radarSelect.append(allOptEvents);

    getEventsFromYear(e.target.value);

    drawRadars(e.target.value, '', values);
  })

  radarSelect.addEventListener('change', e => {
    console.log("radar event select is invoked.\n", yearSelect.value, " ", e.target.value, " ",values)
    drawRadars(yearSelect.value, e.target.value, values);
  })

  const submitBtn = document.getElementById('radar_checklist_submitBtn');
  let values = []
  let checkboxes = document.querySelectorAll('#stats_check');
  submitBtn.onclick = () => {
    values = [];
    checkboxes.forEach(checkbox => {
      if (checkbox.checked){
        values.push(parseInt(checkbox.value));
      }
    })
    yearSelect.innerHTML = ''

    yearSelect.append(allOptYears);

    dataYear.forEach((y) => {
      const option = document.createElement('option'); 
      option.value = y;
      option.innerHTML = y;
      yearSelect.append(option);
    })

    radarSelect.innerHTML = '';

    radarSelect.append(allOptEvents);

    drawRadars('', '', values);
  }

  const selectAllBtn = document.getElementById('radar_checklist_selectAllBtn');
  selectAllBtn.onclick = () => {
    checkboxes.forEach(checkbox => {
      if (!checkbox.checked){
        checkbox.checked = true;
      }
    })
  }

  const unselectAllBtn = document.getElementById('radar_checklist_unselectBtn');
  unselectAllBtn.onclick = () => {
    checkboxes.forEach(checkbox => {
      if (checkbox.checked){
        checkbox.checked = false;
      }
    })
  }

  const radarCuratedOptions = document.getElementById('radarModification_curatedOptions');

  radarCuratedOptions.addEventListener('change', (e) => {
    values = [];

    checkboxes.forEach(checkbox => {
      if (checkbox.checked){
        checkbox.checked = false;
      }
    })

    if (e.target.value == 1){
      values=[1, 9, 17, 2, 3, 4, 5]

      yearSelect.innerHTML = ''

      yearSelect.append(allOptYears);

      dataYear.forEach((y) => {
        const option = document.createElement('option'); 
        option.value = y;
        option.innerHTML = y;
        yearSelect.append(option);
      })

      radarSelect.innerHTML = '';

      radarSelect.append(allOptEvents);

      drawRadars('', '', values);
    } else if (e.target.value == 3){
      values=[6,7,8,16,18]

      yearSelect.innerHTML = ''

      yearSelect.append(allOptYears);

      dataYear.forEach((y) => {
        const option = document.createElement('option'); 
        option.value = y;
        option.innerHTML = y;
        yearSelect.append(option);
      })

      radarSelect.innerHTML = '';

      radarSelect.append(allOptEvents);

      drawRadars('', '', values);
    } else if (e.target.value == 4){
      values=[10,11,12,13,14,15]

      yearSelect.innerHTML = ''

      yearSelect.append(allOptYears);

      dataYear.forEach((y) => {
        const option = document.createElement('option'); 
        option.value = y;
        option.innerHTML = y;
        yearSelect.append(option);
      })

      radarSelect.innerHTML = '';

      radarSelect.append(allOptEvents);

      drawRadars('', '', values);
    } else if (!e.target.value){
      drawRadars('', '', values);
    }
  })

  drawRadars('', '', values);
}

displayPlayerRadars()



  async function displayPlayerRatingLine(){
    
    let lineChart;
    function createOrUpdateLine(
      elementId, 
      label, 
      lineData, 
      lineData2,
      barData,
      barData2
    ){
      const canvas = document.getElementById(`${elementId}`);

      let options;
      if (lineData && lineData2){
        options = {
          chart: {
            type: 'line',
            width: 900,
            height: 400,
            //sparkline: { enabled: true },   // ← removes axes, grid, legend, title
          },
          colors: ["#FF9F50", "#7CC6FF", "#C3956F", "#597F9C"],
          series: [
            {
            //playerOne running averages - line
            name: 'P1 running',
            type: 'line',
            data: lineData
            },
            {
              name: 'P2 running',
              type: 'line',
              data: lineData2
            },
            {
              name: 'P1 avg',
              type: 'column',
              data: barData
            },
            {
              name: 'P2 avg',
              type: 'column',
              data: barData2
            }
          ],
          stroke: {
            curve: 'smooth',
            width: 2
          },
          xaxis: {
            categories: label,
            axisBorder: {
              show: true
            },
            axisTicks: {
              show: false
            }
          },
          yaxis: {
            //seriesName: 'P1 running',
            axisBorder: {
              show: true
            },
            min: 950,
            max: 1100
          },
          grid: {
            show: true,
            strokeDashArray: 6,
            xaxis: {
              lines: {
                show: true
              }
            },
            yaxis: {
              lines: {
                show: true
              }
            }
          },
          markers: {
            size: 6
          },
          tooltip: {
            enabled: true,
            theme: 'light',
            x: { show: false },
            y: { formatter: v => v.toFixed(1) }
          }
        }
      } else if (lineData && !lineData2){
        options = {
          chart: {
            type: 'line',
            width: 900,
            height: 400,
            //sparkline: { enabled: true },   // ← removes axes, grid, legend, title
          },
          colors: ["#FF9F50", /*"#7CC6FF",*/ "#C3956F" /*, "#597F9C"*/],
          series: [
            {
            //playerOne running averages - line
            name: 'P1 running',
            type: 'line',
            data: lineData
            },
            // {
            //   name: 'P2 running',
            //   type: 'line',
            //   data: lineData2
            // },
            {
              name: 'P1 avg',
              type: 'column',
              data: barData
            },
            // {
            //   name: 'P2 avg',
            //   type: 'column',
            //   data: barData2
            // }
          ],
          stroke: {
            curve: 'smooth',
            width: 2
          },
          xaxis: {
            categories: label,
            axisBorder: {
              show: true
            },
            axisTicks: {
              show: false
            }
          },
          yaxis: {
            //seriesName: 'P1 running',
            axisBorder: {
              show: true
            },
            min: 950,
            max: 1100
          },
          grid: {
            show: true,
            strokeDashArray: 6,
            xaxis: {
              lines: {
                show: true
              }
            },
            yaxis: {
              lines: {
                show: true
              }
            }
          },
          markers: {
            size: 6
          },
          tooltip: {
            enabled: true,
            theme: 'light',
            x: { show: false },
            y: { formatter: v => v.toFixed(1) }
          }
        }
      } else if (!lineData && lineData2){
        options = {
          chart: {
            type: 'line',
            width: 900,
            height: 400,
            //sparkline: { enabled: true },   // ← removes axes, grid, legend, title
          },
          colors: [/*"#FF9F50",*/ "#7CC6FF",/*"#C3956F",*/ "#597F9C"],
          series: [
            // {
            // //playerOne running averages - line
            // name: 'P1 running',
            // type: 'line',
            // data: lineData
            // },
            {
              name: 'P2 running',
              type: 'line',
              data: lineData2
            },
            // {
            //   name: 'P1 avg',
            //   type: 'column',
            //   data: barData
            // },
            {
              name: 'P2 avg',
              type: 'column',
              data: barData2
            }
          ],
          stroke: {
            curve: 'smooth',
            width: 2
          },
          xaxis: {
            categories: label,
            axisBorder: {
              show: true
            },
            axisTicks: {
              show: false
            }
          },
          yaxis: {
            //seriesName: 'P1 running',
            axisBorder: {
              show: true
            },
            min: 950,
            max: 1100
          },
          grid: {
            show: true,
            strokeDashArray: 6,
            xaxis: {
              lines: {
                show: true
              }
            },
            yaxis: {
              lines: {
                show: true
              }
            }
          },
          markers: {
            size: 6
          },
          tooltip: {
            enabled: true,
            theme: 'light',
            x: { show: false },
            y: { formatter: v => v.toFixed(1) }
          }
        }
      }






      if (lineChart){
        
      } else {
        lineChart = new ApexCharts(canvas, options);
        lineChart.render();
      }
    }




    /**
     * data needed:
     *  playerOne - running averages
     *  playerTwo - running averages
     *  playerOne - averages
     *  playerTwo - averages
     * 
     * the running averages are line graphs
     * the normal averages are bar graphs
     */
    let url = pdgaNumOne
      ? playerRatingUrl + `?pdga_number=${pdgaNumOne}`
      : '';

    let url2 = pdgaNumTwo
      ? playerRatingUrl + `?pdga_number=${pdgaNumTwo}`
      : '';

    

    const p1data = url ? await getJsons(url) : ''
    let labels = p1data.dates;
    let values = p1data.values;
    let regAvg = p1data.reg_avg;
    
    const p2data = url2 ? await getJsons(url2) : '';
    //let labels2 = p2data.dates;
    let values2 = p2data.values;
    let regAvg2 = p2data.reg_avg;

    createOrUpdateLine(
      'playerVplayer_lineChart',
      labels,
      values,
      values2,
      regAvg,
      regAvg2
    )
  }

  displayPlayerRatingLine()



  let items = document.querySelectorAll('.slider .item');
  let next = document.getElementById('next');
  let prev = document.getElementById('prev');


  let active = 3;
  function loadShow(){
    let stt = 0;
    items[active].style.transform = 'none';
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    for (var i = active + 1; i < items.length; i++){
      stt++;
      items[i].style.transform = `translate(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
      items[i].style.zIndex = -stt;
      items[i].style.filter = 'blur(5px)';
      items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = 0;
    for(var i = active - 1; i >= 0; i--){
      stt++;
      items[i].style.transform = `translate(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
      items[i].style.zIndex = -stt;
      items[i].style.filter = 'blur(5px)';
      items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
  }

  loadShow();


  next.onclick = function() {
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
  }

  prev.onclick = function() {
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
  }

  let playerCards = document.querySelectorAll('.item');

  playerCards.forEach((card) => {
    card.addEventListener('click', () => {
      console.log(card.dataset.value)
      window.location.href = `./head2head.php?pdga_number1=${card.dataset.value}`
    })
  })




let initialInput = document.getElementById('initial_search_input');

let initialPlayerSuggestion = document.getElementById('initialPlayer_suggestion');

initialInput.addEventListener('input', async () => {

  let query = initialInput.value.trim();
  if (query.length === 0){
    initialPlayerSuggestion.style.display = 'none';
    return;
  }

  let url = query
    ? playerSearchUrl + `?query=` + query
    : '';

  let searchData = await getJsons(url);


  initialPlayerSuggestion.innerHTML = "";

  if (searchData.length > 0){
    searchData.forEach((suggestion) => {
      let player = document.createElement('div');
      player.className = 'initialPlayerOptions';
      
      let playerName = document.createElement('h4');
      playerName.innerHTML = suggestion.full_name;

      let playerId = document.createElement('p');
      playerId.innerHTML = `#${suggestion.pdga_number}`;

      player.append(playerName);
      player.append(playerId);


      player.onclick = () => {
        pdgaNumOne = suggestion.pdga_number;
        window.location.href = pdgaNumOne
          ? `./head2head.php?pdga_number1=${pdgaNumOne}` : '';
      }
      initialPlayerSuggestion.append(player);
    })
    initialPlayerSuggestion.style.display = 'flex';
  } else {
    initialPlayerSuggestion.style.display = 'none';
  }

})
