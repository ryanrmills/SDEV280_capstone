const urlParams = new URLSearchParams(window.location.search);
const pdgaNum  = urlParams.get("pdga_number");

//I put all the urls in one place
// const playerBioUrl = `http://localhost/sdev280capstone/api/get_player_info.php?pdga_number=${pdgaNum}`;
// const playerRadialUrl = `http://localhost/sdev280capstone/api/player_radials.php?pdga_number=${pdgaNum}`;
// const playerRadarUrl = `http://localhost/sdev280capstone/api/player_radar.php?pdga_number=${pdgaNum}`;
// const playerHbarUrl = `http://localhost/sdev280capstone/api/player_hbars.php?pdga_number=${pdgaNum}`;
// const playerYearsUrl = `http://localhost/sdev280capstone/api/player_years.php?pdga_number=${pdgaNum}`;
// const playerEventsUrl = `http://localhost/sdev280capstone/api/player_events.php?pdga_number=${pdgaNum}&year=`;
// const playerRatingUrl = `http://localhost/sdev280capstone/api/player_rating.php?pdga_number=${pdgaNum}`;
// const statIdsList = `http://localhost/sdev280capstone/api/get_abbrev_and_stat.php`;
// const globeUrl = `http://localhost/sdev280capstone/api/get_player_event_locations.php?pdga_number=${pdgaNum}`;
// const playerEventsListUrl = `http://localhost/sdev280capstone/api/player_events_list.php?pdga_number=${pdgaNum}`
// const playerRoundsListUrl = `http://localhost/sdev280capstone/api/player_rounds_list.php?pdga_number=${pdgaNum}`
// const allPlayerRankingsUrl = `http://localhost/sdev280capstone/api/player_stat_ranking.php`;




const playerBioUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/get_player_info.php?pdga_number=${pdgaNum}`;
const playerRadialUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_radials.php?pdga_number=${pdgaNum}`;
const playerRadarUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_radar.php?pdga_number=${pdgaNum}`;
const playerHbarUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_hbars.php?pdga_number=${pdgaNum}`;
const playerYearsUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_years.php?pdga_number=${pdgaNum}`;
const playerEventsUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_events.php?pdga_number=${pdgaNum}&year=`;
const playerRatingUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_rating.php?pdga_number=${pdgaNum}`;
const statIdsList = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/get_abbrev_and_stat.php`;
const globeUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/get_player_event_locations.php?pdga_number=${pdgaNum}`;
const playerEventsListUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_events_list.php?pdga_number=${pdgaNum}`
const playerRoundsListUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_rounds_list.php?pdga_number=${pdgaNum}`
const allPlayerRankingsUrl = `https://sandboxdev.greenriverdev.com/sdev280capstone/api/player_stat_ranking.php`;


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
      sparkline: { enabled: true },   // ← removes axes, grid, legend, title
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

    const label = data.stat_abbrev;
    const statData = data.percentile;

    createOrUpdateHbar(label, statData, 'hbar_percentile_chart');
    
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


let hbarChart;
function createOrUpdateHbar(labels, data, elementId){
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
      maintainAspectRatio: false,
      responsive:true,
      indexAxis: 'y',
      scales: {
        x: {
          max: 100,
          grid: { display: true }
        },
        y: {
          grid: { display: true }
        }
      },
      plugins: {
        datalabels: {
          display: false
        },
        legend: { display: false },
        tooltip: { enabled: true }
      }
    },
    // plugins: [ChartDataLabels]
  }

  if (hbarChart){
    hbarChart.data.datasets[0].data = data;
    hbarChart.data.labels = labels;
    hbarChart.update();
  } else {
    hbarChart = new Chart(canvas, options);
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

  let url = allPlayerRankingsUrl;

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








