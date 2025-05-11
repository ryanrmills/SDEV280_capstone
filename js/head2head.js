const urlParams = new URLSearchParams(window.location.search);
const pdgaNumOne = urlParams.get("pdga_number1");
const pdgaNumTwo = urlParams.get("pdga_number2");

const playerBioUrl = `http://localhost/sdev280capstone/api/get_player_info.php`;
const playerRadialUrl = `http://localhost/sdev280capstone/api/player_radials.php`;
const playerRadarUrl = `http://localhost/sdev280capstone/api/player_radar.php`;
const playerRatingUrl = `http://localhost/sdev280capstone/api/player_rating.php`;

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

  let url = pdgaNumOne
    ? playerRadialUrl + `?pdga_number=${pdgaNumOne}`
    : '';
      
  let url2 = pdgaNumTwo
    ? playerRadialUrl + `?pdga_number=${pdgaNumTwo}`
    : '';
      
      
  const data = pdgaNumOne ? await getJsons(url) : '';
  const [ fwhLabel, c2rLabel, c1xLabel ] = data.stat;
  const [ fwhVal,   c2rVal,   c1xVal   ] = data.values;
      
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
){

  /**
   * Pulling data for playerOne
   * Adding contents for playerOne
   */

  let url = pdgaNum
    ? playerBioUrl + `?pdga_number=${pdgaNum}`
    : '';
  
    
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






    let url = pdgaNumOne
      ? playerRadarUrl + `?pdga_number=${pdgaNumOne}`
      : ''
    
    let url2 = pdgaNumTwo
      ? playerRadarUrl + `?pdga_number=${pdgaNumTwo}`
      : ''

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
      const options = {
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
      : playerRatingUrl

      let url2 = pdgaNumOne
      ? playerRatingUrl + `?pdga_number=${pdgaNumTwo}`
      : playerRatingUrl

    const p1data = await getJsons(url)
    let labels = p1data.dates;
    let values = p1data.values;
    let regAvg = p1data.reg_avg;
    
    const p2data = await getJsons(url2);
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

  displayPlayerRatingLine();
