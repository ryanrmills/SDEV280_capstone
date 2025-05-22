const urlParams = new URLSearchParams(window.location.search);
const pdgaNum  = urlParams.get("pdga_number"); //?pdga_number=

//I put all the urls in one place
const playerBioUrl = `http://localhost/sdev280capstone/api/get_player_info.php?pdga_number=${pdgaNum}`;
const playerRadialUrl = `http://localhost/sdev280capstone/api/player_radials.php?pdga_number=${pdgaNum}`;
const playerRadarUrl = `http://localhost/sdev280capstone/api/player_radar.php?pdga_number=${pdgaNum}`;
const playerHbarUrl = `http://localhost/sdev280capstone/api/player_hbars.php?pdga_number=${pdgaNum}`;
const playerYearsUrl = `http://localhost/sdev280capstone/api/player_years.php?pdga_number=${pdgaNum}`;
const playerEventsUrl = `http://localhost/sdev280capstone/api/player_events.php?pdga_number=${pdgaNum}&year=`;
const playerRatingUrl = `http://localhost/sdev280capstone/api/player_rating.php?pdga_number=${pdgaNum}`;
const statIdsList = `http://localhost/sdev280capstone/api/get_abbrev_and_stat.php`;
const globeUrl = `http://localhost/sdev280capstone/api/get_player_event_locations.php?pdga_number=${pdgaNum}`;
const playerEventsListUrl = `http://localhost/sdev280capstone/api/player_events_list.php?pdga_number=${pdgaNum}`
const playerRoundsListUrl = `http://localhost/sdev280capstone/api/player_rounds_list.php?pdga_number=${pdgaNum}`
const allPlayerRankingsUrl = `http://localhost/sdev280capstone/api/player_stat_ranking.php`;
const getYearQuickCompare = `http://localhost/sdev280capstone/api/getQuickCompare.php?pdga_number=${pdgaNum}`;
const getMostRecentResults = `http://localhost/sdev280capstone/api/player_mostRecentEvent.php?pdga_number=${pdgaNum}`
const getTopThree = `http://localhost/sdev280capstone/api/get_player_top_three.php?pdga_number=${pdgaNum}`




// const playerBioUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/get_player_info.php?pdga_number=${pdgaNum}`;
// const playerRadialUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_radials.php?pdga_number=${pdgaNum}`;
// const playerRadarUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_radar.php?pdga_number=${pdgaNum}`;
// const playerHbarUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_hbars.php?pdga_number=${pdgaNum}`;
// const playerYearsUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_years.php?pdga_number=${pdgaNum}`;
// const playerEventsUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_events.php?pdga_number=${pdgaNum}&year=`;
// const playerRatingUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_rating.php?pdga_number=${pdgaNum}`;
// const statIdsList = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/get_abbrev_and_stat.php`;
// const globeUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/get_player_event_locations.php?pdga_number=${pdgaNum}`;
// const playerEventsListUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_events_list.php?pdga_number=${pdgaNum}`
// const playerRoundsListUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_rounds_list.php?pdga_number=${pdgaNum}`
// const allPlayerRankingsUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_stat_ranking.php`;
// const getYearQuickCompare = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/getQuickCompare.php?pdga_number=${pdgaNum}`;
// const getMostRecentResults = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_mostRecentEvent.php?pdga_number=${pdgaNum}`
// const getTopThree = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/get_player_top_three.php?pdga_number=${pdgaNum}`


window.addEventListener('DOMContentLoaded', () => {
  if (pdgaNum === 'undefined' || pdgaNum === null || pdgaNum === ''){
    window.location.href = './pages/player_list.php';
  }
})

document.getElementById('head2head_link').href = `./pages/head2head.php?pdga_number1=${pdgaNum}`;

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


async function playerBio() {
  function createOrUpdateCareerProfile(data){

    let earnings = parseFloat(data.player.earnings).toLocaleString('en-US');

    //populate your player info into the HTML
    document.getElementById('athlete_image').src = `./assets/${data.player.pdga_number}.jpg`;
    // document.getElementById('first_name').innerHTML = data.player.first_name;
    // document.getElementById('last_name').innerHTML = data.player.last_name;
    document.getElementById('full_name').innerHTML = data.player.full_name
    document.getElementById('player_window_title').innerHTML = data.player.full_name;
    document.getElementById('bio_pdga_number').innerHTML = "#" + data.player.pdga_number + ", member since " + data.player.member_since;
    document.getElementById('hometown').innerHTML  = data.player.hometown;
    document.getElementById('bio_division').innerHTML = `${data.player.division} Division`
    document.getElementById('wins').innerHTML = data.player.wins;
    document.getElementById('top_tens').innerHTML = data.player.top_tens;
    document.getElementById('earnings').innerHTML = `\$${earnings}`;
    document.getElementById('podiums').innerHTML = data.player.podiums;
    //document.getElementById('first_name_compared').innerHTML = data.player.first_name;
    document.getElementById('total_events').innerHTML = data.player.total_events;
    document.getElementById('avg_place').innerHTML = Math.floor(data.player.avg_place);
    document.getElementById('avg_rating').innerHTML = data.player.avg_rating;
    document.getElementById('avg_strokes').innerHTML = Math.floor(data.player.avg_strokes_per_event);
  }

  const timelineSelect = document.getElementById('careerProfile_12moBool');
  const timeline = document.getElementById('careerProfile_12moBool').value;


  async function drawCareerProfile(isLast12){
    let url = isLast12
      ? playerBioUrl + `&is_last_12_months=${timeline}`
      : playerBioUrl;
      
    const data = await getJsons(url);

    createOrUpdateCareerProfile(data);
  }

  timelineSelect.addEventListener('change', (e) => {
    document.getElementById('top_tens').innerHTML = ''
    document.getElementById('earnings').innerHTML = ''
    document.getElementById('podiums').innerHTML = ''
    document.getElementById('wins').innerHTML = '';
    document.getElementById('total_events').innerHTML = ''
    document.getElementById('avg_place').innerHTML = ''
    document.getElementById('avg_rating').innerHTML = ''
    document.getElementById('avg_strokes').innerHTML = ''
    drawCareerProfile(e.target.value);
  })

  drawCareerProfile('');

}
playerBio();





































async function playerRatingLine(){
  const data = await getJsons(playerRatingUrl);
  
  let dates = data.dates;
  let values = data.values;
  let barData = data.reg_avg;
  
  createOrUpdateLine(dates, values, barData, 'rating_lineChart');
}

playerRatingLine();


let lineChart;
async function createOrUpdateLine(label, data, barData, elementId){
  const canvas = document.getElementById(`${elementId}`);

  const options = {
    chart: {
      type: 'line',
      width: 320,
      height: 120,
      sparkline: { enabled: true },
      stacked: false
    },
    colors: ["#00F5D4", "#FFF"],
    series: [
      {
        name: 'Running avg',
        type: 'line',
        data: data
      },
      {
        name: 'Event avg',
        type: 'column',
        data: barData
      }
    ],
    plotOptions: {
      bar: {
        columnWidth: '40%'
      }
    },
    stroke: {
      curve: 'smooth',
      width: 4
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
      min: 950,
      max: 1100,
      axisBorder: {
        show: true
      }
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
      size: 4
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      x: { show: false },
      y: { formatter: v => v.toFixed(1) }
    }
  }
  
  if (lineChart){
    
  } else {
    lineChart = new ApexCharts(canvas, options);
    lineChart.render();
  }
  

}



async function grabMostRecentEvent(){
  const mostRecentData = await getJsons(getMostRecentResults);

  const eventName = document.getElementById('mostRecent_eventName')
  eventName.innerHTML = mostRecentData.event.event_name;

  const eventLocation = document.getElementById('mostRecent_eventLocation')
  eventLocation.innerHTML = mostRecentData.event.event_location;

  const eventDate = document.getElementById('mostRecent_eventDate')
  eventDate.innerHTML = mostRecentData.event.event_start_date;

  const eventRating = document.getElementById('mostRecent_eventRating')
  eventRating.innerHTML = mostRecentData.event.event_rating;

  const eventScore = document.getElementById('mostRecent_eventScore')
  eventScore.innerHTML = mostRecentData.event.event_score;


}

grabMostRecentEvent();


const goLeft = document.getElementById('infoDiv_cycleLeft')
const goRight = document.getElementById('infoDiv_cycleRight')

let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("infoDivSlide");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "flex";  
}

goLeft.onclick = () => {
  plusDivs(-1);
}

goRight.onclick = () => {
  plusDivs(1);
}



async function topThreeMetric(){
  function getOrdinalSuffix(number) {
  if (number >= 11 && number <= 19) {
    return "th";
  }
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}


  const topThreeData = await getJsons(getTopThree);

  let firstMetricValue = document.getElementById('topThree_firstMetricValue');
  firstMetricValue.innerHTML = topThreeData.top3[1].player_average_value;

  let firstMetricName = document.getElementById('topThree_firstMetricName');
  firstMetricName.innerHTML = topThreeData.top3[1].abbreviation;

  let firstMetricRank = document.getElementById('topThree_firstMetricRank');
  firstMetricRank.innerHTML = `ranked ${topThreeData.top3[1].rank_in_division}${getOrdinalSuffix(topThreeData.top3[1].rank_in_division)}`;

  let secondMetricValue = document.getElementById('topThree_secondMetricValue');
  secondMetricValue.innerHTML = topThreeData.top3[2].player_average_value;

  let secondMetricName = document.getElementById('topThree_secondMetricName');
  secondMetricName.innerHTML = topThreeData.top3[2].abbreviation;

  let secondMetricRank = document.getElementById('topThree_secondMetricRank');
  secondMetricRank.innerHTML = `ranked ${topThreeData.top3[2].rank_in_division}${getOrdinalSuffix(topThreeData.top3[2].rank_in_division)}`;

  let thirdMetricValue = document.getElementById('topThree_thirdMetricValue');
  thirdMetricValue.innerHTML = topThreeData.top3[3].player_average_value;

  let thirdMetricName = document.getElementById('topThree_thirdMetricName');
  thirdMetricName.innerHTML = topThreeData.top3[3].abbreviation;

  let thirdMetricRank = document.getElementById('topThree_thirdMetricRank');
  thirdMetricRank.innerHTML = `ranked ${topThreeData.top3[3].rank_in_division}${getOrdinalSuffix(topThreeData.top3[3].rank_in_division)}`;
}

topThreeMetric();




























async function playerRadar(){

  
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

  
  const dataYear = await getJsons(playerYearsUrl);

  dataYear.forEach((y) => {
    const option = document.createElement('option'); 
    option.value = y;
    option.innerHTML = y;
    yearSelect.append(option);
  })

  async function drawRadar(year, eventId, valuesIds){
    let url = year
      ? playerRadarUrl + "&year=" + year
      : playerRadarUrl;
    
    url = eventId
      ? url + "&event=" + eventId
      : url
    


    if (valuesIds.length > 0){
      url = url + "&ids=" + valuesIds;
    }
      
    const data = await getJsons(url);

    const label = data.abbrev;
    const statData = data.z_score;

    createOrUpdateRadar(label, statData, 'radar_chart');
    
  }


  async function getEventsFromYear(year){

    const eventsList = await getJsons(`${playerEventsUrl}${year}`);
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

    drawRadar(e.target.value, '', values);
  })

  radarSelect.addEventListener('change', e => {

    drawRadar(yearSelect.value, e.target.value, values);
  })

  //the section of the code responsible fo r the checklist. 
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

    drawRadar('', '', values);

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
      values=[1,9,17]

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

      drawRadar('', '', values);
    } else if (e.target.value == 2){
      values=[2,3,4,5]

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

      drawRadar('', '', values);
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

      drawRadar('', '', values);
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

      drawRadar('', '', values);
    } else if (!e.target.value){
      drawRadar('', '', values);
    }
  })



  

  drawRadar('', '', values);

};
playerRadar();





async function playerRadar2(){
  const radarChecklistContainer = document.getElementById('radar_checklist_container2');
  const statIdsData = await getJsons(statIdsList);

  for (let i = 0; i < statIdsData.id.length; i++){
    const label = document.createElement('label');
    label.style.display = 'block';

    const checkInput = document.createElement('input');
    checkInput.type = 'checkbox';
    checkInput.id = 'stats_check2';
    checkInput.value = statIdsData.id[i]
    label.append(checkInput);

    label.append(statIdsData.name[i]);

    const hoverDiv = document.createElement('div');
    hoverDiv.className = 'radar_modification_list_hover2';
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

  





















  const yearSelect = document.getElementById('radar_yearSelect2');
  const radarSelect = document.getElementById('radar_eventSelect2');
  
  const allOptYears = document.createElement('option');
  allOptYears.value = '';
  allOptYears.textContent = 'All Time';
  yearSelect.append(allOptYears);

  const allOptEvents = document.createElement('option');
  allOptEvents.value = '';

  allOptEvents.textContent = 'All Events';
  radarSelect.append(allOptEvents);

  
  const dataYear = await getJsons(playerYearsUrl);

  dataYear.forEach((y) => {
    const option = document.createElement('option'); 
    option.value = y;
    option.innerHTML = y;
    yearSelect.append(option);
  })

  async function drawRadar(year, eventId, valuesIds){
    let url = year
      ? playerRadarUrl + "&year=" + year
      : playerRadarUrl;
    
    url = eventId
      ? url + "&event=" + eventId
      : url
    


    if (valuesIds.length > 0){
      url = url + "&ids=" + valuesIds;
    }
      
    const data = await getJsons(url);

    const label = data.abbrev;
    const statData = data.z_score;

    createOrUpdateRadar2(label, statData, 'radar_chart2');
  }


  async function getEventsFromYear(year){

    const eventsList = await getJsons(`${playerEventsUrl}${year}`);
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

    drawRadar(e.target.value, '', values);
  })

  radarSelect.addEventListener('change', e => {

    drawRadar(yearSelect.value, e.target.value, values);
  })

  const submitBtn = document.getElementById('radar_checklist_submitBtn2');
  let values = []
  let checkboxes = document.querySelectorAll('#stats_check2');
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

    drawRadar('', '', values);

  }

  const selectAllBtn = document.getElementById('radar_checklist_selectAllBtn2');
  selectAllBtn.onclick = () => {
    checkboxes.forEach(checkbox => {
      if (!checkbox.checked){
        checkbox.checked = true;
      }
    })
  }

  const unselectAllBtn = document.getElementById('radar_checklist_unselectBtn2');
  unselectAllBtn.onclick = () => {
    checkboxes.forEach(checkbox => {
      if (checkbox.checked){
        checkbox.checked = false;
      }
    })
  }

  const radarCuratedOptions = document.getElementById('radarModification_curatedOptions2');
  radarCuratedOptions.addEventListener('change', (e) => {
    values = [];
    
    checkboxes.forEach(checkbox => {
      if (checkbox.checked){
        checkbox.checked = false;
      }
    })

    if (e.target.value == 1){
      values=[1,9,17]

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

      drawRadar('', '', values);
    } else if (e.target.value == 2){
      values=[2,3,4,5]

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

      drawRadar('', '', values);
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

      drawRadar('', '', values);
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

      drawRadar('', '', values);
    } else if (!e.target.value){
      drawRadar('', '', values);
    }
  })

  drawRadar('', '', values);

};

let radarChart;
async function createOrUpdateRadar(label, data, elementId){

  let canvas = document.getElementById(`${elementId}`);
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

  if (radarChart){
    radarChart.data.labels = label;
    radarChart.data.datasets[0].data = data;
    radarChart.update();
  } else {

    radarChart = new Chart(canvas, options);
  }
}

playerRadar2();







let radarChart2;
async function createOrUpdateRadar2(label2, data2, elementId2){

  let canvas2 = document.getElementById(`${elementId2}`)
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

  if (radarChart2){
    radarChart2.data.labels = label2;
    radarChart2.data.datasets[0].data = data2;
    radarChart2.update();
  } else {

    radarChart2 = new Chart(canvas2, options2);
  }
}

let radar2 = document.getElementById('radarChart_comparisonContainer');

let radarCompareButton = document.getElementById('radarGraphCompareButton');
radarCompareButton.addEventListener('click', () => {
  radarCompareButton.style.display = 'none';
  radar2.classList.toggle('toggled');
})


let radarCompareCloseButton = document.getElementById('radarCompareCloseButton');
radarCompareCloseButton.addEventListener('click', () => {
  radar2.classList.toggle('toggled');
  radarCompareButton.style.display = 'block';
})






























async function playerRadial(){
  const yearSelect = document.getElementById('radial_dropdown');
  
  const allOpt = document.createElement('option');
  allOpt.value = '';
  allOpt.textContent = 'All Time';
  yearSelect.append(allOpt);
  
  const dataYear = await getJsons(playerYearsUrl);

  dataYear.forEach((y) => {
    const option = document.createElement('option');
    option.value = y;
    option.innerHTML = y;
    yearSelect.append(option);
  })


  async function drawRadials(year){
    const url = year
      ? `${playerRadialUrl}&year=${year}`
      : playerRadialUrl;
    const data = await getJsons(url);


    const [ fwhLabel, c2rLabel, c1xLabel ] = data.stat;
    const [ fwhVal,   c2rVal,   c1xVal   ] = data.values;


    createOrUpdateRadial("FWH_radial", fwhLabel, fwhVal);
    createOrUpdateRadial("C2R_radial", c2rLabel, c2rVal);
    createOrUpdateRadial("C1X_radial", c1xLabel, c1xVal);
  }

  yearSelect.addEventListener('change', e => {
    drawRadials(e.target.value);
  });

  drawRadials('');
}
playerRadial();

const radialCharts = {
  FWH_radial: null,
  C2R_radial: null,
  C1X_radial: null
};

function createOrUpdateRadial(elementId, label, value) {
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
            color: "#323232"//"#FEFAE0"
          },
          value: {
            show: true,
            offsetY: -6,
            fontSize: '20px',
            fontWeight: 800,
            color: "#323232",//'#FEFAE0',
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

    radialCharts[elementId].updateSeries(opts.series);
    radialCharts[elementId].updateOptions({ labels: opts.labels });
  } else {

    radialCharts[elementId] = new ApexCharts(el, opts);
    radialCharts[elementId].render();
  }
}






















































async function playerHbar(){

  const yearSelect = document.getElementById('hbar_dropdown_years');
  const eventSelect = document.getElementById('hbar_dropdown_events');
  
  const allOptYears = document.createElement('option');
  allOptYears.value = '';
  allOptYears.textContent = 'All Time';
  yearSelect.append(allOptYears);

  const allOptEvents = document.createElement('option');
  allOptEvents.value = '';
  // allOptEvents.class = 'radarEventSelectDefault'
  allOptEvents.textContent = 'All Events';
  eventSelect.append(allOptEvents);

  
  const dataYear = await getJsons(playerYearsUrl);

  dataYear.forEach((y) => {
    const option = document.createElement('option'); 
    option.value = y;
    option.innerHTML = y;
    yearSelect.append(option);
  })

  async function drawHbar(year, eventId){
    let url = year
      ? playerHbarUrl + "&year=" + year
      : playerHbarUrl;
    
    url = eventId
      ? url + "&event=" + eventId
      : url
      
    const data = await getJsons(url);

    const drivingLabel = data.drivingAbbrev;
    const drivingStatData = data.drivingPercentile;

    const shortGameLabel = data.shortGameAbbrev;
    const shortGameStatData = data.shortGamePercentile;

    const puttingLabel = data.puttingAbbrev;
    const puttingStatData = data.puttingPercentile;

    const scoringLabel = data.scoringAbbrev;
    const scoringStatData = data.scoringPercentile;

    createOrUpdateDrivingHbar(drivingLabel, drivingStatData, 'drivingHbar_percentile_chart');
    createOrUpdateApproachHbar(shortGameLabel, shortGameStatData, 'shortGameHbar_percentile_chart');
    createOrUpdatePuttingHbar(puttingLabel, puttingStatData, 'puttingHbar_percentile_chart');
    createOrUpdateScoringHbar(scoringLabel, scoringStatData, 'scoringHbar_percentile_chart');
  }


  async function getEventsFromYear(year){

    const eventsList = await getJsons(`${playerEventsUrl}${year}`);
    eventsList.forEach((e) => {
      const option = document.createElement('option');
      option.value = e.pdga_event_id;
      option.innerHTML = e.name;
      eventSelect.append(option);
    })

  }

  yearSelect.addEventListener('change', e => {


    eventSelect.innerHTML = '';

    eventSelect.append(allOptEvents);

    getEventsFromYear(e.target.value);

    drawHbar(e.target.value, '');
  })

  eventSelect.addEventListener('change', e => {

    drawHbar(yearSelect.value, e.target.value);
  })

  drawHbar('', '');
  
}

playerHbar();


// let hbarChart;
// function createOrUpdateHbar(labels, data, elementId){
//   const canvas = document.getElementById(elementId).getContext('2d');
//   options = {
//     data: {
//       labels: labels,
//       datasets: [
//         // the thin bars
//         {
//           type: 'bar',
//           label: 'Percentile',
//           data: data,
//           backgroundColor: '#38A169',
//           barThickness: 8,
//         },
//       ]
//     },
//     options: {
//       maintainAspectRatio: false,
//       responsive:true,
//       indexAxis: 'y',
//       scales: {
//         x: {
//           max: 100,
//           grid: { display: true }
//         },
//         y: {
//           grid: { display: true }
//         }
//       },
//       plugins: {
//         datalabels: {
//           display: false
//         },
//         legend: { display: false },
//         tooltip: { enabled: true }
//       }
//     },
//     // plugins: [ChartDataLabels]
//   }

//   if (hbarChart){
//     hbarChart.data.datasets[0].data = data;
//     hbarChart.data.labels = labels;
//     hbarChart.update();
//   } else {
//     hbarChart = new Chart(canvas, options);
//   }

// }

let drivingHbar;
Chart.register(ChartDataLabels);
function createOrUpdateDrivingHbar(labels, data, elementId){
  const canvas = document.getElementById(elementId).getContext('2d');
  options = {
    data: {
      labels: labels,
      datasets: [
        // the thin bars
        {
          type: 'bar',
          label: 'Percentile',
          data: data,
          backgroundColor: '#38A169',
          barThickness: 8,
        },
      ]
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 7,
      responsive:true,
      indexAxis: 'y',
      scales: {
        x: {
          max: 110,
          grid: { display: false },
          ticks: {
            display: false
          }
        },
        y: {
          grid: { display: false }
        }
      },
      plugins: {
        // datalabels: {
        //   display: true
        // },
        datalabels: {
          display: true,
          color: '#616161',
          anchor: 'end',
          align: 'end',
          offset: 4,
          formatter: value => value
        },
        legend: { display: false },
        tooltip: { enabled: true }
      }
    },
    plugins: [ChartDataLabels]
  }

  if (drivingHbar){
    drivingHbar.data.datasets[0].data = data;
    drivingHbar.data.labels = labels;
    drivingHbar.update();
  } else {
    drivingHbar = new Chart(canvas, options);
  }
}

let approachHbar;
function createOrUpdateApproachHbar(labels, data, elementId){
  const canvas = document.getElementById(elementId).getContext('2d');
  options = {
    data: {
      labels: labels,
      datasets: [
        // the thin bars
        {
          type: 'bar',
          label: 'Percentile',
          data: data,
          backgroundColor: '#38A169',
          barThickness: 8,
        },
      ]
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 5,
      responsive:true,
      indexAxis: 'y',
      scales: {
        x: {
          max: 100,
          grid: { display: false },
          ticks: {
            display: false
          }
        },
        y: {
          grid: { display: false }
        }
      },
      plugins: {
        // datalabels: {
        //   display: false
        // },
        datalabels: {
          display: true,
          color: '#616161',
          anchor: 'end',
          align: 'end',
          offset: 4,
          formatter: value => value
        },
        legend: { display: false },
        tooltip: { enabled: true }
      }
    },
    plugins: [ChartDataLabels]
  }

  if (approachHbar){
    approachHbar.data.datasets[0].data = data;
    approachHbar.data.labels = labels;
    approachHbar.update();
  } else {
    approachHbar = new Chart(canvas, options);
  }
}

let puttingHbar;
function createOrUpdatePuttingHbar(labels, data, elementId){
  const canvas = document.getElementById(elementId).getContext('2d');
  options = {
    data: {
      labels: labels,
      datasets: [
        // the thin bars
        {
          type: 'bar',
          label: 'Percentile',
          data: data,
          backgroundColor: '#38A169',
          barThickness: 8,
        },
      ]
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 4.4,
      responsive:true,
      indexAxis: 'y',
      scales: {
        x: {
          max: 100,
          grid: { display: false },
          ticks: {
            display: false
          }
        },
        y: {
          grid: { display: false }
        }
      },
      plugins: {
        // datalabels: {
        //   display: false
        // },
        datalabels: {
          display: true,
          color: '#616161',
          anchor: 'end',
          align: 'end',
          offset: 4,
          formatter: value => value
        },
        legend: { display: false },
        tooltip: { enabled: true }
      }
    },
    plugins: [ChartDataLabels]
  }

  if (puttingHbar){
    puttingHbar.data.datasets[0].data = data;
    puttingHbar.data.labels = labels;
    puttingHbar.update();
  } else {
    puttingHbar = new Chart(canvas, options);
  }
}

let scoringHbar;
function createOrUpdateScoringHbar(labels, data, elementId){
  const canvas = document.getElementById(elementId).getContext('2d');
  options = {
    data: {
      labels: labels,
      datasets: [
        // the thin bars
        {
          type: 'bar',
          label: 'Percentile',
          data: data,
          backgroundColor: '#38A169',
          barThickness: 8,
        },
      ]
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 3.6,
      responsive:true,
      indexAxis: 'y',
      scales: {
        x: {
          max: 100,
          grid: { display: false },
          ticks: {
            display: false
          }
        },
        y: {
          grid: { display: false }
        }
      },
      plugins: {
        // datalabels: {
        //   display: false
        // },
        datalabels: {
          display: true,
          color: '#616161',
          anchor: 'end',
          align: 'end',
          offset: 4,
          formatter: value => value
        },
        legend: { display: false },
        tooltip: { enabled: true }
      }
    },
    plugins: [ChartDataLabels]
  }

  if (scoringHbar){
    scoringHbar.data.datasets[0].data = data;
    scoringHbar.data.labels = labels;
    scoringHbar.update();
  } else {
    scoringHbar = new Chart(canvas, options);
  }
}










fetch(globeUrl)
  .then(res => res.json())
  .then(locations => {
    const tooltip = document.getElementById('globe_tooltip');
    const globeEl = document.getElementById('globe');

    const world = Globe()
      (globeEl)
      .width(400)
      .height(400)

      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')

      .backgroundColor('rgba(0,0,0,0)')

      .pointsData(locations)
      .pointLat(d => d.latitude)
      .pointLng(d => d.longitude)
      .pointColor(() => '#EA7317')
      .pointAltitude(0.02)
      .pointRadius(0.5)
      
      // 5) Show a tooltip on hover
      .onPointHover(point => {
        if (!point) {
          tooltip.style.display = 'none';
          return;
        }
        // Populate tooltip content
        tooltip.innerHTML = `
        <!-- <strong>${point.name}</strong> --><br>
        ${point.city}, ${point.state}, ${point.country}<br>
        ${point.start_date}
        `;

        tooltip.style.display = 'flex';
      })
      .pointOfView({lat:40.176404, lng: -95.327418, altitude: 1}, 0);


    globeEl.addEventListener('mousemove', e => {
      tooltip.style.top  = /*e.clientY + */10 + 'px';
      tooltip.style.right = /*e.clientX + */10 + 'px';
    });
  });



document.getElementById('tabsSection_roundsTab').addEventListener('click', () => {

})


















let eventsTable;

async function displayEventsTable(){
  const roundsContainer = document.getElementById('roundsTableParentContainer');
  roundsContainer.style.display = 'none';
  
  const roundTab = document.getElementById('tabsSection_roundsTab');
  roundTab.className = 'tabsSection_roundsTab';
  
  const eventContainer = document.getElementById('eventsTableParentContainer');
  eventContainer.style.display = 'flex';

  const eventTab = document.getElementById('tabsSection_eventTab');
  eventTab.className = 'tabsSection_eventTab_active'

  const eventsData = await getJsons(playerEventsListUrl);


  let table = document.getElementById('eventsTable');
  let options = {
    data: eventsData.events,
    columns: [
      {
        title: "Name", 
        data: "name",
        width: "400px",
        className: "scrollable-cell",
        render: function (data){
          return `<div class="scroll-x">${data}</div>`;
        }
      },
      {title: "Month", data: "event_month"},
      {
        title: "Date", 
        data: "start_date",
        width: "100px"
      },
      {title: "Year", data: "event_year"},
      {title: "City", data: "city"},
      {title: "State", data: "state"},
      {title: "Country", data: "country"},
      {title: "Place", data: "place"},
      {title: "Strokes", data: "strokes"},
      {title: "Cash", data: "cash"},
      {
        title: "Rating", 
        data: "event_rating",
        render: function(data){
          return `<div><strong>${data}</strong></div>`
        }
      }
    ],
    createdRow: function (row, data, dataIndex){
      row.style.fontSize = '12px'
    },
    pageLength: 10,
    paging: true,
    searching: true,
    ordering: true
  };

  if (eventsTable){

  } else {
    eventsTable = new DataTable(table, options);
  }









  
  
}

displayEventsTable();

let roundsTable;
async function displayRoundsTable(){
  const eventContainer = document.getElementById('eventsTableParentContainer');
  eventContainer.style.display = 'none';
    
  const eventTab = document.getElementById('tabsSection_eventTab');
  eventTab.className = 'tabsSection_eventTab'
  
  const roundsContainer = document.getElementById('roundsTableParentContainer');
  roundsContainer.style.display = 'flex';
  
  const roundTab = document.getElementById('tabsSection_roundsTab');
  roundTab.className = 'tabsSection_roundsTab_active';

  const roundsData = await getJsons(playerRoundsListUrl);


  let table = document.getElementById('roundsTable');
  let options = {
    autoWidth: false,
    data: roundsData.rounds,
    columns: [
      {
        title: "Name", 
        data: "name",
        width: "550px",
        className: "scrollable-cell",
        render: function (data){
          return `<div class="scroll-x">${data}</div>`;
        }
      },
      {
        title: "Date", 
        data: "start_date",
        width: "100px"
      },
      {title: "Month", data: "event_month"},
      {title: "Year", data: "event_year"},
      {title: "Division", data: "division"},
      {title: "Round", data: "round"},
      {title: "Strokes", data: "score"},
      {
        title: "Rating", 
        data: "rating",
        render: function(data){
          return `<div><strong>${data}</strong></div>`
        }
      }
    ],
    createdRow: function (row, data, dataIndex){
      row.style.fontSize = '12px';
    },
    pageLength: 10,
    paging: true,
    searching: true,
    ordering: true
  };

  if (roundsTable){

  } else {
    roundsTable = new DataTable(table, options);
  }
}

document.getElementById('tabsSection_eventTab').addEventListener('click', () => {
  displayEventsTable();
})
document.getElementById('tabsSection_roundsTab').addEventListener('click', () => {
  displayRoundsTable();
})


document.getElementById('compareSelector_optionSelect').addEventListener('change', () => {

})



document.getElementById('eventRound_pullButton').addEventListener('click', () => {
  document.getElementById('hoverTab_eventRound_comparison').classList.toggle('clicked');
})


async function displayPlayerRankings(){

  let url = pdgaNum ? allPlayerRankingsUrl + "?pdga_number=" + pdgaNum : console.log("displayPlayerRankings(): missing pdga number");

  let rankingData = await getJsons(url);

  let playerRankingsContainer = document.getElementById('playerRankings_container');

  for (let i = 0; i < rankingData.length; i++){

    if (rankingData[i].pdga_number == pdgaNum){
      document.getElementById('primaryPlayerRanking_fullName').innerHTML = rankingData[i].full_name;
      document.getElementById('primaryPlayerRanking_ranking').innerHTML = i + 1;
      document.getElementById('primaryPlayerEventNum').innerHTML = `E: ${rankingData[i].total_events}`;
      document.getElementById('primaryPlayerRoundNum').innerHTML = `R: ${rankingData[i].total_rounds}`;
      document.getElementById('primaryPlayerRatingNum').innerHTML = `${rankingData[i].average_rating}`;
    }

    if (i < 10){
      //create the container for the player
      let playerBin = document.createElement('div');
      playerBin.className = 'playerRankingBin';

      if (rankingData[i].pdga_number == pdgaNum){
        playerBin.style.border = '2px solid rgb(10, 173, 255)'
      }

      //create the container for ranking and name
      let playerRankingAndNameBin = document.createElement('div');
      playerRankingAndNameBin.className = 'playerRankingAndNameBin';
      
      let playerName = document.createElement('h4');
      playerName.innerHTML = rankingData[i].full_name;
      playerRankingAndNameBin.append(playerName);

      let playerRanking = document.createElement('h3');
      playerRanking.innerHTML = i + 1;
      playerRankingAndNameBin.append(playerRanking);

      playerBin.append(playerRankingAndNameBin);

      //create the container for events, rounds, rating
      let playerRankingFinerDetail = document.createElement('div');
      playerRankingFinerDetail.className = 'playerRankingFinerDetail';

      let playerEventsNum = document.createElement('p');
      playerEventsNum.innerHTML =  `E: ${rankingData[i].total_events}`
      playerRankingFinerDetail.append(playerEventsNum);

      let playerRoundsNum = document.createElement('p');
      playerRoundsNum.innerHTML =  `R: ${rankingData[i].total_rounds}`
      playerRankingFinerDetail.append(playerRoundsNum);

      let playerRatingNum = document.createElement('h3');
      playerRatingNum.innerHTML = rankingData[i].average_rating;
      playerRankingFinerDetail.append(playerRatingNum);

      playerBin.append(playerRankingFinerDetail);

      playerRankingsContainer.append(playerBin);
    }
  }
}

displayPlayerRankings();























async function displayQuickCompareResults(){
  let resultsDisplayMainContainer = document.getElementById('hoverTab_mainContent_resultsDisplay');
  let containerFirstCompare = document.getElementById('mainContent_resultsDisplay_firstCompare');
  let containerSecondCompare = document.getElementById('mainContent_resultsDisplay_secondCompare');

  let initialSelector = document.getElementById('compareSelector_optionSelect');

  initialSelector.addEventListener('change', async(e) => {
    containerFirstCompare.innerHTML = '';
    containerSecondCompare.innerHTML = '';

    if (e.target.value == 'years'){
      resultsDisplayMainContainer.style.display = 'flex';
      //now create the year1 and year2 selectors and add them to their containers

      let year1Selector = document.createElement('select');
      let year2Selector = document.createElement('select');

      //append default empty values in year selectors
      let yearDefaultOption = document.createElement('option');
      yearDefaultOption.value = '';
      yearDefaultOption.innerHTML = 'Choose a year...'

      let yearDefaultOption2 = document.createElement('option');
      yearDefaultOption2.value = '';
      yearDefaultOption2.innerHTML = 'Choose a year...'

      year1Selector.append(yearDefaultOption);
      year2Selector.append(yearDefaultOption2);

      let yearData = await getJsons(playerYearsUrl);

      //populate both year selectors with the years we have in our database
      yearData.forEach((year)=>{
        let yearOption = document.createElement('option');
        yearOption.value = year;
        yearOption.innerHTML = year;

        let yearOption2 = document.createElement('option');
        yearOption2.value = year;
        yearOption2.innerHTML = year;

        year1Selector.append(yearOption);
        year2Selector.append(yearOption2);
      })


      //add the year selectors to their respective containers
      containerFirstCompare.append(year1Selector);
      containerSecondCompare.append(year2Selector);

      let year1Rating = document.getElementById('year1_rating');
      let year1Earnings = document.getElementById('year1_earnings');
      let year1Wins = document.getElementById('year1_wins');
      let year1Podiums = document.getElementById('year1_podiums');
      let year1topTens = document.getElementById('year1_topTens');
      let year1Events = document.getElementById('year1_events');
      let year1Strokes = document.getElementById('year1_strokes');
      let year1Place = document.getElementById('year1_place');
      let year1Fwh = document.getElementById('year1_fwh');
      let year1C2r = document.getElementById('year1_c2r');
      let year1C1x = document.getElementById('year1_c1x');

      year1Selector.addEventListener('change', async(e) => {
        

        year1Rating.innerHTML = '';
        year1Earnings.innerHTML = '';
        year1Wins.innerHTML = '';
        year1Podiums.innerHTML = '';
        year1topTens.innerHTML = '';
        year1Events.innerHTML = '';
        year1Strokes.innerHTML = '';
        year1Place.innerHTML = '';
        year1Fwh.innerHTML = '';
        year1C2r.innerHTML = '';
        year1C1x.innerHTML = '';

        let url = e.target.value 
          ? getYearQuickCompare + '&year=' + e.target.value : '';

        let yearQuickData = await getJsons(url);

        year1Rating.innerHTML = yearQuickData.player.avg_rating;
        year1Earnings.innerHTML = yearQuickData.player.earnings;
        year1Wins.innerHTML = yearQuickData.player.wins;
        year1Podiums.innerHTML = yearQuickData.player.podiums;
        year1topTens.innerHTML = yearQuickData.player.top_tens;
        year1Events.innerHTML = yearQuickData.player.total_events;
        year1Strokes.innerHTML = yearQuickData.player.avg_strokes_per_event;
        year1Place.innerHTML = yearQuickData.player.avg_place;
        year1Fwh.innerHTML = yearQuickData.main3[0].avg_percentage;
        year1C2r.innerHTML = yearQuickData.main3[1].avg_percentage;
        year1C1x.innerHTML = yearQuickData.main3[2].avg_percentage;


        if (year1Rating.textContent && year2Rating.textContent){
          if (parseFloat(year1Rating.textContent) > parseFloat(year2Rating.textContent)){
            year1Rating.style.color = 'green';
            year2Rating.style.color = 'red';
          } else if (parseFloat(year1Rating.textContent) < parseFloat(year2Rating.textContent)){
            year1Rating.style.color = 'red';
            year2Rating.style.color = 'green';
          } else {
            year1Rating.style.color = 'black';
            year2Rating.style.color = 'black';
          }

          if (parseFloat(year1Earnings.textContent) > parseFloat(year2Earnings.textContent)){
            year1Earnings.style.color = 'green';
            year2Earnings.style.color = 'red';
          } else if (parseFloat(year1Earnings.textContent) < parseFloat(year2Earnings.textContent)){
            year1Earnings.style.color = 'red';
            year2Earnings.style.color = 'green';
          } else {
            year1Earnings.style.color = 'black';
            year2Earnings.style.color = 'black';
          }

          if (parseFloat(year1Wins.textContent) > parseFloat(year2Wins.textContent)){
            year1Wins.style.color = 'green';
            year2Wins.style.color = 'red';
          } else if (parseFloat(year1Wins.textContent) < parseFloat(year2Wins.textContent)){
            year1Wins.style.color = 'red';
            year2Wins.style.color = 'green';
          } else {
            year1Wins.style.color = 'black';
            year2Wins.style.color = 'black';
          }

          if (parseFloat(year1Podiums.textContent) > parseFloat(year2Podiums.textContent)){
            year1Podiums.style.color = 'green';
            year2Podiums.style.color = 'red';
          } else if (parseFloat(year1Podiums.textContent) < parseFloat(year2Podiums.textContent)){
            year1Podiums.style.color = 'red';
            year2Podiums.style.color = 'green';
          } else {
            year1Podiums.style.color = 'black';
            year2Podiums.style.color = 'black';
          }

          if (parseFloat(year1topTens.textContent) > parseFloat(year2topTens.textContent)){
            year1topTens.style.color = 'green';
            year2topTens.style.color = 'red';
          } else if (parseFloat(year1topTens.textContent) < parseFloat(year2topTens.textContent)){
            year1topTens.style.color = 'red';
            year2topTens.style.color = 'green';
          } else {
            year1topTens.style.color = 'black';
            year2topTens.style.color = 'black';
          }

          if (parseFloat(year1Events.textContent) > parseFloat(year2Events.textContent)){
            year1Events.style.color = 'green';
            year2Events.style.color = 'red';
          } else if (parseFloat(year1Events.textContent) < parseFloat(year2Events.textContent)){
            year1Events.style.color = 'red';
            year2Events.style.color = 'green';
          } else {
            year1Events.style.color = 'black';
            year2Events.style.color = 'black';
          }

          if (parseFloat(year1Strokes.textContent) > parseFloat(year2Strokes.textContent)){
            year1Strokes.style.color = 'green';
            year2Strokes.style.color = 'red';
          } else if (parseFloat(year1Strokes.textContent) < parseFloat(year2Strokes.textContent)){
            year1Strokes.style.color = 'red';
            year2Strokes.style.color = 'green';
          } else {
            year1Strokes.style.color = 'black';
            year2Strokes.style.color = 'black';
          }

          if (parseFloat(year1Place.textContent) > parseFloat(year2Place.textContent)){
            year1Place.style.color = 'green';
            year2Place.style.color = 'red';
          } else if (parseFloat(year1Place.textContent) < parseFloat(year2Place.textContent)){
            year1Place.style.color = 'red';
            year2Place.style.color = 'green';
          } else {
            year1Place.style.color = 'black';
            year2Place.style.color = 'black';
          }

          if (parseFloat(year1Fwh.textContent) > parseFloat(year2Fwh.textContent)){
            year1Fwh.style.color = 'green';
            year2Fwh.style.color = 'red';
          } else if (parseFloat(year1Fwh.textContent) < parseFloat(year2Fwh.textContent)){
            year1Fwh.style.color = 'red';
            year2Fwh.style.color = 'green';
          } else {
            year1Fwh.style.color = 'black';
            year2Fwh.style.color = 'black';
          }

          if (parseFloat(year1C2r.textContent) > parseFloat(year2C2r.textContent)){
            year1C2r.style.color = 'green';
            year2C2r.style.color = 'red';
          } else if (parseFloat(year1C2r.textContent) < parseFloat(year2C2r.textContent)){
            year1C2r.style.color = 'red';
            year2C2r.style.color = 'green';
          } else {
            year1C2r.style.color = 'black';
            year2C2r.style.color = 'black';
          }

          if (parseFloat(year1C1x.textContent) > parseFloat(year2C1x.textContent)){
            year1C1x.style.color = 'green';
            year2C1x.style.color = 'red';
          } else if (parseFloat(year1C1x.textContent) < parseFloat(year2C1x.textContent)){
            year1C1x.style.color = 'red';
            year2C1x.style.color = 'green';
          } else {
            year1C1x.style.color = 'black';
            year2C1x.style.color = 'black';
          }
        }
      })

      let year2Rating = document.getElementById('year2_rating');
      let year2Earnings = document.getElementById('year2_earnings');
      let year2Wins = document.getElementById('year2_wins');
      let year2Podiums = document.getElementById('year2_podiums');
      let year2topTens = document.getElementById('year2_topTens');
      let year2Events = document.getElementById('year2_events');
      let year2Strokes = document.getElementById('year2_strokes');
      let year2Place = document.getElementById('year2_place');
      let year2Fwh = document.getElementById('year2_fwh');
      let year2C2r = document.getElementById('year2_c2r');
      let year2C1x = document.getElementById('year2_c1x');

      year2Selector.addEventListener('change', async(e) => {

        year2Rating.innerHTML = '';
        year2Earnings.innerHTML = '';
        year2Wins.innerHTML = '';
        year2Podiums.innerHTML = '';
        year2topTens.innerHTML = '';
        year2Events.innerHTML = '';
        year2Strokes.innerHTML = '';
        year2Place.innerHTML = '';
        year2Fwh.innerHTML = '';
        year2C2r.innerHTML = '';
        year2C1x.innerHTML = '';

        let url2 = e.target.value 
          ? getYearQuickCompare + '&year=' + e.target.value : '';

        let yearQuickData2 = await getJsons(url2);

        year2Rating.innerHTML = yearQuickData2.player.avg_rating;
        year2Earnings.innerHTML = yearQuickData2.player.earnings;
        year2Wins.innerHTML = yearQuickData2.player.wins;
        year2Podiums.innerHTML = yearQuickData2.player.podiums;
        year2topTens.innerHTML = yearQuickData2.player.top_tens;
        year2Events.innerHTML = yearQuickData2.player.total_events;
        year2Strokes.innerHTML = yearQuickData2.player.avg_strokes_per_event;
        year2Place.innerHTML = yearQuickData2.player.avg_place;
        year2Fwh.innerHTML = yearQuickData2.main3[0].avg_percentage;
        year2C2r.innerHTML = yearQuickData2.main3[1].avg_percentage;
        year2C1x.innerHTML = yearQuickData2.main3[2].avg_percentage;

        //if (year1Selector.value && year2Selector.value){
          // year2Rating.innerHTML += 
          //   parseFloat(year2Rating.textContent) - parseFloat(year1Rating.textContent) < 0
          //   ? `<p style="color: red; font-size: 12px; text-align: right;">${parseFloat(year2Rating.textContent) - parseFloat(year1Rating.textContent)}</p>`
          //   : parseFloat(year2Rating.textContent) - parseFloat(year1Rating.textContent) > 0
          //   ? `<p style="color: green;">+${parseFloat(year2Rating.textContent) - parseFloat(year1Rating.textContent)}</p>`
          //   : ''

          
          // year2Earnings.innerHTML += 
          //   parseFloat(year2Earnings.textContent) - parseFloat(year1Earnings.textContent) < 0
          //   ? `<p style="color: red; font-size: 12px; text-align: right;">${parseFloat(year2Rating.textContent) - parseFloat(year1Rating.textContent)}</p>`
          //   : parseFloat(year2Earnings.textContent) - parseFloat(year1Earnings.textContent) > 0
          //   ? `<p style="color: green;">+${parseFloat(year2Earnings.textContent) - parseFloat(year1Earnings.textContent)}</p>`
          //   : ''
        //}

        if (year1Rating.textContent && year2Rating.textContent){
          if (parseFloat(year1Rating.textContent) > parseFloat(year2Rating.textContent)){
            year1Rating.style.color = 'green';
            year2Rating.style.color = 'red';
          } else if (parseFloat(year1Rating.textContent) < parseFloat(year2Rating.textContent)){
            year1Rating.style.color = 'red';
            year2Rating.style.color = 'green';
          } else {
            year1Rating.style.color = 'black';
            year2Rating.style.color = 'black';
          }


          if (parseFloat(year1Earnings.textContent) > parseFloat(year2Earnings.textContent)){
            year1Earnings.style.color = 'green';
            year2Earnings.style.color = 'red';
          } else if (parseFloat(year1Earnings.textContent) < parseFloat(year2Earnings.textContent)){
            year1Earnings.style.color = 'red';
            year2Earnings.style.color = 'green';
          } else {
            year1Earnings.style.color = 'black';
            year2Earnings.style.color = 'black';
          }

          if (parseFloat(year1Wins.textContent) > parseFloat(year2Wins.textContent)){
            year1Wins.style.color = 'green';
            year2Wins.style.color = 'red';
          } else if (parseFloat(year1Wins.textContent) < parseFloat(year2Wins.textContent)){
            year1Wins.style.color = 'red';
            year2Wins.style.color = 'green';
          } else {
            year1Wins.style.color = 'black';
            year2Wins.style.color = 'black';
          }

          if (parseFloat(year1Podiums.textContent) > parseFloat(year2Podiums.textContent)){
            year1Podiums.style.color = 'green';
            year2Podiums.style.color = 'red';
          } else if (parseFloat(year1Podiums.textContent) < parseFloat(year2Podiums.textContent)){
            year1Podiums.style.color = 'red';
            year2Podiums.style.color = 'green';
          } else {
            year1Podiums.style.color = 'black';
            year2Podiums.style.color = 'black';
          }

          if (parseFloat(year1topTens.textContent) > parseFloat(year2topTens.textContent)){
            year1topTens.style.color = 'green';
            year2topTens.style.color = 'red';
          } else if (parseFloat(year1topTens.textContent) < parseFloat(year2topTens.textContent)){
            year1topTens.style.color = 'red';
            year2topTens.style.color = 'green';
          } else {
            year1topTens.style.color = 'black';
            year2topTens.style.color = 'black';
          }

          if (parseFloat(year1Events.textContent) > parseFloat(year2Events.textContent)){
            year1Events.style.color = 'green';
            year2Events.style.color = 'red';
          } else if (parseFloat(year1Events.textContent) < parseFloat(year2Events.textContent)){
            year1Events.style.color = 'red';
            year2Events.style.color = 'green';
          } else {
            year1Events.style.color = 'black';
            year2Events.style.color = 'black';
          }

          if (parseFloat(year1Strokes.textContent) > parseFloat(year2Strokes.textContent)){
            year1Strokes.style.color = 'green';
            year2Strokes.style.color = 'red';
          } else if (parseFloat(year1Strokes.textContent) < parseFloat(year2Strokes.textContent)){
            year1Strokes.style.color = 'red';
            year2Strokes.style.color = 'green';
          } else {
            year1Strokes.style.color = 'black';
            year2Strokes.style.color = 'black';
          }

          if (parseFloat(year1Place.textContent) > parseFloat(year2Place.textContent)){
            year1Place.style.color = 'green';
            year2Place.style.color = 'red';
          } else if (parseFloat(year1Place.textContent) < parseFloat(year2Place.textContent)){
            year1Place.style.color = 'red';
            year2Place.style.color = 'green';
          } else {
            year1Place.style.color = 'black';
            year2Place.style.color = 'black';
          }

          if (parseFloat(year1Fwh.textContent) > parseFloat(year2Fwh.textContent)){
            year1Fwh.style.color = 'green';
            year2Fwh.style.color = 'red';
          } else if (parseFloat(year1Fwh.textContent) < parseFloat(year2Fwh.textContent)){
            year1Fwh.style.color = 'red';
            year2Fwh.style.color = 'green';
          } else {
            year1Fwh.style.color = 'black';
            year2Fwh.style.color = 'black';
          }

          if (parseFloat(year1C2r.textContent) > parseFloat(year2C2r.textContent)){
            year1C2r.style.color = 'green';
            year2C2r.style.color = 'red';
          } else if (parseFloat(year1C2r.textContent) < parseFloat(year2C2r.textContent)){
            year1C2r.style.color = 'red';
            year2C2r.style.color = 'green';
          } else {
            year1C2r.style.color = 'black';
            year2C2r.style.color = 'black';
          }

          if (parseFloat(year1C1x.textContent) > parseFloat(year2C1x.textContent)){
            year1C1x.style.color = 'green';
            year2C1x.style.color = 'red';
          } else if (parseFloat(year1C1x.textContent) < parseFloat(year2C1x.textContent)){
            year1C1x.style.color = 'red';
            year2C1x.style.color = 'green';
          } else {
            year1C1x.style.color = 'black';
            year2C1x.style.color = 'black';
          }
        }
      })

        
      


        // if (parseFloat(year1Earnings) > parseFloat(year2Earnings)){
        //   year1Earnings.style.color = 'green';
        //   year2Earnings.style.color = 'red';
        // } else if (parseFloat(year1Earnings) < parseFloat(year2Earnings)){
        //   year1Earnings.style.color = 'red';
        //   year2Earnings.style.color = 'green';
        // }
    } else {
      resultsDisplayMainContainer.style.display = 'none';
    }
  })
}

displayQuickCompareResults();
















