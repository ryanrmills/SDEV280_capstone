const urlParams = new URLSearchParams(window.location.search);
const pdgaNum  = urlParams.get("pdga_number");

//I put all the urls in one place
const playerBioUrl = `http://localhost/sdev280capstone/api/get_player_info.php?pdga_number=${pdgaNum}`;
const playerRadialUrl = `http://localhost/sdev280capstone/api/player_radials.php?pdga_number=${pdgaNum}`;
const playerRadarUrl = `http://localhost/sdev280capstone/api/player_radar.php?pdga_number=${pdgaNum}`;
const playerHbarUrl = `http://localhost/sdev280capstone/api/player_hbars.php?pdga_number=${pdgaNum}`;
const playerYearsUrl = `http://localhost/sdev280capstone/api/player_years.php?pdga_number=${pdgaNum}`;
const playerEventsUrl = `http://localhost/sdev280capstone/api/player_events.php?pdga_number=${pdgaNum}&year=`;
const playerRatingUrl = `http://localhost/sdev280capstone/api/player_rating.php?pdga_number=${pdgaNum}`;
//function defined so that I can keep reusing to retrieve json data

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

//this part of the code starts displaying the player bio
async function playerBio() {
  function createOrUpdateCareerProfile(data){
    //adding appropriate commas to thousands place to earnings
    let earnings = parseFloat(data.player.earnings).toLocaleString('en-US');

    //populate your player info into the HTML
    document.getElementById('athlete_image').src = `./assets/${data.player.pdga_number}.jpg`;
    // document.getElementById('first_name').innerHTML = data.player.first_name;
    // document.getElementById('last_name').innerHTML = data.player.last_name;
    document.getElementById('full_name').innerHTML = data.player.full_name
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

  /*
  //adding appropriate commas to thousands place to earnings
  let earnings = parseFloat(data.player.earnings).toLocaleString('en-US');

  //populate your player info into the HTML
  document.getElementById('athlete_image').src = `./assets/${data.player.pdga_number}.jpg`;
  // document.getElementById('first_name').innerHTML = data.player.first_name;
  // document.getElementById('last_name').innerHTML = data.player.last_name;
  document.getElementById('full_name').innerHTML = data.player.full_name
  document.getElementById('bio_pdga_number').innerHTML = "#" + data.player.pdga_number + ", member since " + data.player.member_since;
  document.getElementById('hometown').innerHTML  = data.player.hometown;
  document.getElementById('bio_division').innerHTML = `${data.player.division} Division`
  document.getElementById('wins').innerHTML = data.player.wins;
  document.getElementById('top_tens').innerHTML = data.player.top_tens;
  document.getElementById('earnings').innerHTML = `\$${earnings}`;
  document.getElementById('podiums').innerHTML = data.player.podiums;
  //document.getElementById('first_name_compared').innerHTML = data.player.first_name;
  document.getElementById('total_events').innerHTML = data.player.total_events;
  document.getElementById('avg_place').innerHTML = Math.floor(data.player.avg_place) + "th";
  document.getElementById('avg_rating').innerHTML = data.player.avg_rating;
  document.getElementById('avg_strokes').innerHTML = Math.floor(data.player.avg_strokes_per_event);
  */
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
    //console.log("year: " + yearSelect.value + "\neventId: " + e.target.value);
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
    console.log(data)

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
      
    const data = await getJsons(url);

    const label = data.stat_abbrev;
    const statData = data.percentile;

    createOrUpdateHbar(label, statData, 'hbar_percentile_chart');
    
  }

  //function to retrieve events from specific year
  async function getEventsFromYear(year){

    const eventsList = await getJsons(`${playerEventsUrl}${year}`);
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
    //console.log("year: " + yearSelect.value + "\neventId: " + e.target.value);
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




// fetch(`http://localhost/sdev280capstone/api/get_player_event_locations.php?pdga_number=${pdgaNum}`)
//   .then(r => r.json())
//   .then(locations => {
//     Globe()
//       (document.getElementById('globe'))
//       .pointAltitude(0.02)
//       .pointColor(() => '#EA7317')
//       .labelsData(locations)
//       .labelLat(d => d.latitude)
//       .labelLng(d => d.longitude)
//       .labelText(d => `${d.start_date} • ${d.name}`);
//   });

// 4) Fetch your pre‑geocoded event locations
fetch(`http://localhost/sdev280capstone/api/get_player_event_locations.php?pdga_number=${pdgaNum}`)
  .then(res => res.json())
  .then(locations => {
    const tooltip = document.getElementById('globe_tooltip');
    const globeEl = document.getElementById('globe');

    const world = Globe()
      (globeEl)
      .width(400)
      .height(400)
      // Earth day‑texture & bump map
      // .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      // .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      // Transparent background
      .backgroundColor('rgba(0,0,0,0)')
      // Plot only points (no labelsData)
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
        // Position tooltip at mouse
        // (we’ll listen to the globeEl’s mousemove for coords)
        tooltip.style.display = 'flex';
      })
      .pointOfView({lat:40.176404, lng: -95.327418, altitude: 1}, 0);
      //40.176404, -95.327418

    // 6) Sync tooltip position with mouse
    globeEl.addEventListener('mousemove', e => {
      tooltip.style.top  = /*e.clientY + */10 + 'px';
      tooltip.style.right = /*e.clientX + */10 + 'px';
    });
  });
