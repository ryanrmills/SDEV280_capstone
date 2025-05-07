const urlParams = new URLSearchParams(window.location.search);
const pdgaNum  = urlParams.get("pdga_number");

//I put all the urls in one place
const playerBioUrl = `http://localhost/sdev280capstone/api/get_player_info.php?pdga_number=${pdgaNum}`;
const playerRadialUrl = `http://localhost/sdev280capstone/api/player_radials.php?pdga_number=${pdgaNum}`;
const playerRadarUrl = `http://localhost/sdev280capstone/api/player_radar.php?pdga_number=${pdgaNum}`;
const playerHbarUrl = `http://localhost/sdev280capstone/api/player_hbars.php?pdga_number=${pdgaNum}`;
const playerYearsUrl = `http://localhost/sdev280capstone/api/player_years.php?pdga_number=${pdgaNum}`;
const playerEventsUrl = `http://localhost/sdev280capstone/api/player_events.php?pdga_number=${pdgaNum}&year=`;
//function defined so that I can keep reusing to retrieve json data
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

//this part of the code starts displaying the player bio
async function playerBio() {
  const data = await getJsons(playerBioUrl);

  //adding appropriate commas to thousands place to earnings
  let earnings = parseFloat(data.player.earnings).toLocaleString('en-US');

  //populate your player info into the HTML
  document.getElementById('athlete_image').src = `./assets/${data.player.pdga_number}.jpg`;
  // document.getElementById('first_name').innerHTML = data.player.first_name;
  // document.getElementById('last_name').innerHTML = data.player.last_name;
  document.getElementById('full_name').innerHTML = data.player.full_name
  document.getElementById('bio_pdga_number').innerHTML = "#" + data.player.pdga_number + ", member since " + data.player.member_since;
  document.getElementById('hometown').innerHTML  = data.player.hometown;
  document.getElementById('bio_division').innerHTML = data.player.division
  document.getElementById('wins').innerHTML = data.player.wins;
  document.getElementById('top_tens').innerHTML = data.player.top_tens;
  document.getElementById('earnings').innerHTML = `\$${earnings}`;
  document.getElementById('podiums').innerHTML = data.player.podiums;
  //document.getElementById('first_name_compared').innerHTML = data.player.first_name;
  document.getElementById('total_events').innerHTML = data.player.total_events;
  document.getElementById('avg_place').innerHTML = Math.floor(data.player.avg_place) + "th";
  document.getElementById('avg_rating').innerHTML = data.player.avg_rating;
  document.getElementById('avg_strokes').innerHTML = Math.floor(data.player.avg_strokes_per_event);

}
playerBio();

//this part is responsible for retrieving the data for the radar graph
async function playerRadar(){
  const yearSelect = document.getElementById('radar_yearSelect');
  const radarSelect = document.getElementById('radar_eventSelect');
  
  const allOptYears = document.createElement('option');
  allOptYears.value = '';
  allOptYears.textContent = 'All Time';
  yearSelect.append(allOptYears);

  const allOptEvents = document.createElement('option');
  allOptEvents.value = '';
  // allOptEvents.class = 'radarEventSelectDefault'
  allOptEvents.textContent = 'All Events';
  radarSelect.append(allOptEvents);

  
  const dataYear = await getJsons(playerYearsUrl);

  dataYear.forEach((y) => {
    const option = document.createElement('option'); 
    option.value = y;
    option.innerHTML = y;
    yearSelect.append(option);
  })

  async function drawHbar(year, eventId){
    let url = year
      ? playerRadarUrl + "&year=" + year
      : playerRadarUrl;
    
    url = eventId
      ? url + "&event=" + eventId
      : url
    
    console.log(url)
      
    const data = await getJsons(url);

    const label = data.abbrev;
    const statData = data.z_score;

    createOrUpdateRadar(label, statData, 'radar_chart');
    
  }

  //function to retrieve events from specific year
  async function getEventsFromYear(year){

    const eventsList = await getJsons(`${playerEventsUrl}${year}`);
    eventsList[0].forEach((e) => {
      const option = document.createElement('option');
      option.value = e.pdga_event_id;
      option.innerHTML = e.name;
      radarSelect.append(option);
    })

  }

  yearSelect.addEventListener('change', e => {
    //let currentYear = e.target.value;

    radarSelect.innerHTML = '';

    radarSelect.append(allOptEvents);

    getEventsFromYear(e.target.value);

    drawHbar(e.target.value, '');
  })

  radarSelect.addEventListener('change', e => {
    console.log("year: " + yearSelect.value + "\neventId: " + e.target.value);
    drawHbar(yearSelect.value, e.target.value);
  })

  drawHbar('', '');

};
playerRadar();

let radarChart;
async function createOrUpdateRadar(label, data, elementId){
  //grab element
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
























//let fwhChart, c2rChart, c1xChart;
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

    // destructure
    const [ fwhLabel, c2rLabel, c1xLabel ] = data.stat;
    const [ fwhVal,   c2rVal,   c1xVal   ] = data.values;

    // call our create/update helper
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
    chart: { height: 150, type: 'radialBar' },
    colors: ["#00450E"],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { fontSize: '14px', fontWeight: 550 },
          value: {
            fontSize: '20px',
            fontWeight: 800,
            color: '#5D5D5D',
            formatter: v => v
          }
        },
        hollow: { size: "57.5%", background: "#FFEDD6" }
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






















































async function playerHbar(){
  // Chart.register(ChartDataLabels);
  // const data = await getJsons(playerHbarUrl);

  // const statLabels = data.stat_abbrev;
  // const percentileValues = data.percentile;

  // in your JS, after loading Chart.js
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
    
    console.log(url)
      
    const data = await getJsons(url);

    const label = data.stat_abbrev;
    const statData = data.percentile;

    createOrUpdateHbar(label, statData, 'hbar_percentile_chart');
    
  }

  //function to retrieve events from specific year
  async function getEventsFromYear(year){

    const eventsList = await getJsons(`${playerEventsUrl}${year}`);
    console.log(eventsList)
    eventsList[0].forEach((e) => {
      const option = document.createElement('option');
      option.value = e.pdga_event_id;
      option.innerHTML = e.name;
      eventSelect.append(option);
    })

  }

  yearSelect.addEventListener('change', e => {
    //let currentYear = e.target.value;

    eventSelect.innerHTML = '';

    eventSelect.append(allOptEvents);

    getEventsFromYear(e.target.value);

    drawHbar(e.target.value, '');
  })

  eventSelect.addEventListener('change', e => {
    console.log("year: " + yearSelect.value + "\neventId: " + e.target.value);
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
        // the dots
        // {
        //   type: 'bubble',
        //   label: 'Marker',
        //   data: data.map((v,i)=>({ x: v, y: i, r: 6 })),
        //   backgroundColor: '#FFF',
        //   borderColor: '#2F855A',
        //   borderWidth: 2,
        //   datalabels: {
        //     anchor: 'start',
        //     align: 'right',
        //     formatter: (value) => value.x,
        //     font: {
        //       weight: 'bold',
        //       size: 10
        //     },
        //     color: '#444'
        //   },
        //   hoverRadius: 8,
        // }
      ]
    },
    options: {
      maintainAspectRatio: false,
      responsive:true,
      indexAxis: 'y',
      scales: {
        x: {
          max: 105,
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