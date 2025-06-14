const urlParams = new URLSearchParams(window.location.search);
const pdgaNum = urlParams.get("pdga_number"); //?pdga_number=

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
// const playerEventsListUrl = `http://localhost/sdev280capstone/api/player_events_list.php?pdga_number=${pdgaNum}`;
// const playerRoundsListUrl = `http://localhost/sdev280capstone/api/player_rounds_list.php?pdga_number=${pdgaNum}`;
// const allPlayerRankingsUrl = `http://localhost/sdev280capstone/api/player_stat_ranking.php`;
// const getYearQuickCompare = `http://localhost/sdev280capstone/api/getQuickCompare.php?pdga_number=${pdgaNum}`;
// const getMostRecentResults = `http://localhost/sdev280capstone/api/player_mostRecentEvent.php?pdga_number=${pdgaNum}`;
// const getTopThree = `http://localhost/sdev280capstone/api/get_player_top_three.php?pdga_number=${pdgaNum}`;

const playerBioUrl = `./api/get_player_info.php?pdga_number=${pdgaNum}`;
const playerRadialUrl = `./api/player_radials.php?pdga_number=${pdgaNum}`;
const playerRadarUrl = `./api/player_radar.php?pdga_number=${pdgaNum}`;
const playerHbarUrl = `./api/player_hbars.php?pdga_number=${pdgaNum}`;
const playerYearsUrl = `./api/player_years.php?pdga_number=${pdgaNum}`;
const playerEventsUrl = `./api/player_events.php?pdga_number=${pdgaNum}&year=`;
const playerRatingUrl = `./api/player_rating.php?pdga_number=${pdgaNum}`;
const statIdsList = `./api/get_abbrev_and_stat.php`;
const globeUrl = `./api/get_player_event_locations.php?pdga_number=${pdgaNum}`;
const playerEventsListUrl = `./api/player_events_list.php?pdga_number=${pdgaNum}`;
const playerRoundsListUrl = `./api/player_rounds_list.php?pdga_number=${pdgaNum}`;
const allPlayerRankingsUrl = `./api/player_stat_ranking.php`;
const getYearQuickCompare = `./api/getQuickCompare.php?pdga_number=${pdgaNum}`;
const getMostRecentResults = `./api/player_mostRecentEvent.php?pdga_number=${pdgaNum}`;
const getTopThree = `./api/get_player_top_three.php?pdga_number=${pdgaNum}`;

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

window.addEventListener("DOMContentLoaded", () => {
  if (pdgaNum === "undefined" || pdgaNum === null || pdgaNum === "") {
    window.location.href = "./pages/player_list.php";
  }
});

document.getElementById(
  "head2head_link"
).href = `./pages/head2head.php?pdga_number1=${pdgaNum}`;

async function getJsons(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const playerInfoJson = await response.json();
    return playerInfoJson;
  } catch (error) {
    console.log("Something went wrong: " + error);
  }
}

async function playerBio() {
  function createOrUpdateCareerProfile(data) {
    let earnings = parseFloat(data.player.earnings).toLocaleString("en-US");

    //populate your player info into the HTML
    document.getElementById(
      "athlete_image"
    ).src = `./assets/${data.player.pdga_number}.jpg`;
    // document.getElementById('first_name').innerHTML = data.player.first_name;
    // document.getElementById('last_name').innerHTML = data.player.last_name;
    document.getElementById("full_name").innerHTML = data.player.full_name;
    document.getElementById("player_window_title").innerHTML =
      data.player.full_name;
    document.getElementById("bio_pdga_number").innerHTML =
      "#" +
      data.player.pdga_number +
      ", member since " +
      data.player.member_since;
    document.getElementById("hometown").innerHTML = data.player.hometown;
    document.getElementById(
      "bio_division"
    ).innerHTML = `${data.player.division} Division`;
    document.getElementById("wins").innerHTML = data.player.wins;
    document.getElementById("top_tens").innerHTML = data.player.top_tens;
    document.getElementById("earnings").innerHTML = `\$${earnings}`;
    document.getElementById("podiums").innerHTML = data.player.podiums;
    //document.getElementById('first_name_compared').innerHTML = data.player.first_name;
    document.getElementById("total_events").innerHTML =
      data.player.total_events;
    document.getElementById("avg_place").innerHTML = Math.floor(
      data.player.avg_place
    );
    document.getElementById("avg_rating").innerHTML = data.player.avg_rating;
    document.getElementById("avg_strokes").innerHTML = Math.floor(
      data.player.avg_strokes_per_event
    );
  }

  const timelineSelect = document.getElementById("careerProfile_12moBool");
  const timeline = document.getElementById("careerProfile_12moBool").value;

  async function drawCareerProfile(isLast12) {
    let url = isLast12
      ? playerBioUrl + `&is_last_12_months=${timeline}`
      : playerBioUrl;

    const data = await getJsons(url);

    createOrUpdateCareerProfile(data);
  }

  timelineSelect.addEventListener("change", (e) => {
    document.getElementById("top_tens").innerHTML = "";
    document.getElementById("earnings").innerHTML = "";
    document.getElementById("podiums").innerHTML = "";
    document.getElementById("wins").innerHTML = "";
    document.getElementById("total_events").innerHTML = "";
    document.getElementById("avg_place").innerHTML = "";
    document.getElementById("avg_rating").innerHTML = "";
    document.getElementById("avg_strokes").innerHTML = "";
    drawCareerProfile(e.target.value);
  });

  drawCareerProfile("");
}
playerBio();

async function playerRatingLine() {
  const data = await getJsons(playerRatingUrl);

  let dates = data.dates;
  let values = data.values;
  let barData = data.reg_avg;

  createOrUpdateLine(dates, values, barData, "rating_lineChart");
}

playerRatingLine();

let lineChart;
async function createOrUpdateLine(label, data, barData, elementId) {
  const canvas = document.getElementById(`${elementId}`);

  const options = {
    chart: {
      type: "line",
      width: 320,
      height: 120,
      sparkline: { enabled: true },
      stacked: false,
    },
    colors: ["#00F5D4", "#FFF"],
    series: [
      {
        name: "Running avg",
        type: "line",
        data: data,
      },
      {
        name: "Event avg",
        type: "column",
        data: barData,
      },
    ],
    plotOptions: {
      bar: {
        columnWidth: "40%",
      },
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    xaxis: {
      categories: label,
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 950,
      max: 1100,
      axisBorder: {
        show: true,
      },
    },
    grid: {
      show: true,
      strokeDashArray: 6,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      size: 4,
    },
    tooltip: {
      enabled: true,
      theme: "light",
      x: { show: false },
      y: { formatter: (v) => v.toFixed(1) },
    },
  };

  if (lineChart) {
  } else {
    lineChart = new ApexCharts(canvas, options);
    lineChart.render();
  }
}

async function grabMostRecentEvent() {
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
  const mostRecentData = await getJsons(getMostRecentResults);

  const eventName = document.getElementById("mostRecent_eventName");
  eventName.innerHTML = `<a target="_blank" href="https://www.pdga.com/tour/event/${mostRecentData.event.pdga_event_id}" style="color: white;">${mostRecentData.event.event_name}</a>`;

  const eventLocation = document.getElementById("mostRecent_eventLocation");
  eventLocation.innerHTML = mostRecentData.event.event_location;

  const eventDate = document.getElementById("mostRecent_eventDate");
  eventDate.innerHTML = mostRecentData.event.event_start_date;

  const eventRating = document.getElementById("mostRecent_eventRating");
  eventRating.innerHTML = mostRecentData.event.event_rating;

  const eventScore = document.getElementById("mostRecent_eventScore");
  eventScore.innerHTML = `<strong>${
    mostRecentData.event.event_score
  }</strong> strokes, <strong>${mostRecentData.event.place}${getOrdinalSuffix(
    parseInt(mostRecentData.event.place)
  )}</strong> place`;

  // const eventPlace = document.getElementById('mostRecent_eventPlace')
  // eventPlace.innerHTML = mostRecentData.event.place;
}

grabMostRecentEvent();

const goLeft = document.getElementById("infoDiv_cycleLeft");
const goRight = document.getElementById("infoDiv_cycleRight");

let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("infoDivSlide");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "flex";
}

goLeft.onclick = () => {
  plusDivs(-1);
};

goRight.onclick = () => {
  plusDivs(1);
};

async function topThreeMetric() {
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

  let firstMetricValue = document.getElementById("topThree_firstMetricValue");
  firstMetricValue.innerHTML = `${topThreeData.top3[1].player_average_value}%`;

  let firstMetricName = document.getElementById("topThree_firstMetricName");
  firstMetricName.innerHTML = topThreeData.top3[1].abbreviation;

  let firstMetricRank = document.getElementById("topThree_firstMetricRank");
  firstMetricRank.innerHTML = `<strong>${
    topThreeData.top3[1].rank_in_division
  }${getOrdinalSuffix(topThreeData.top3[1].rank_in_division)}</strong> place`;

  let secondMetricValue = document.getElementById("topThree_secondMetricValue");
  secondMetricValue.innerHTML = `${topThreeData.top3[2].player_average_value}%`;

  let secondMetricName = document.getElementById("topThree_secondMetricName");
  secondMetricName.innerHTML = topThreeData.top3[2].abbreviation;

  let secondMetricRank = document.getElementById("topThree_secondMetricRank");
  secondMetricRank.innerHTML = `<strong>${
    topThreeData.top3[2].rank_in_division
  }${getOrdinalSuffix(topThreeData.top3[2].rank_in_division)}</strong> place`;

  let thirdMetricValue = document.getElementById("topThree_thirdMetricValue");
  thirdMetricValue.innerHTML = `${topThreeData.top3[3].player_average_value}%`;

  let thirdMetricName = document.getElementById("topThree_thirdMetricName");
  thirdMetricName.innerHTML = topThreeData.top3[3].abbreviation;

  let thirdMetricRank = document.getElementById("topThree_thirdMetricRank");
  thirdMetricRank.innerHTML = `<strong>${
    topThreeData.top3[3].rank_in_division
  }${getOrdinalSuffix(topThreeData.top3[3].rank_in_division)}</strong> place`;
}

topThreeMetric();

async function playerRadar() {
  const radarChecklistContainer = document.getElementById(
    "radar_checklist_container"
  );
  const statIdsData = await getJsons(statIdsList);

  for (let i = 0; i < statIdsData.id.length; i++) {
    const label = document.createElement("label");
    label.style.display = "block";

    const checkInput = document.createElement("input");
    checkInput.type = "checkbox";
    checkInput.id = "stats_check";
    checkInput.value = statIdsData.id[i];
    label.append(checkInput);

    label.append(statIdsData.name[i]);

    const hoverDiv = document.createElement("div");
    hoverDiv.className = "radar_modification_list_hover";
    hoverDiv.style.display = "none";
    hoverDiv.style.position = "fixed";

    const hoverDivTextTitle = document.createElement("p");
    hoverDivTextTitle.style.fontWeight = "bolder";
    const hoverDivTextDesc = document.createElement("p");

    hoverDivTextTitle.innerHTML = statIdsData.fullName[i];
    hoverDivTextTitle.style.display = "block";
    hoverDiv.append(hoverDivTextTitle);

    hoverDivTextDesc.innerHTML = statIdsData.desc[i];
    hoverDivTextDesc.style.display = "block";
    hoverDiv.append(hoverDivTextDesc);

    label.addEventListener("mouseover", (e) => {
      hoverDiv.style.display = "block";
    });

    label.addEventListener("mousemove", (e) => {
      hoverDiv.style.left = e.clientX + 8 + "px";
      hoverDiv.style.top = e.clientY - 30 + "px";
    });

    label.addEventListener("mouseout", (e) => {
      hoverDiv.style.display = "none";
    });

    label.append(hoverDiv);
    radarChecklistContainer.append(label);
  }

  const yearSelect = document.getElementById("radar_yearSelect");
  const radarSelect = document.getElementById("radar_eventSelect");

  const allOptYears = document.createElement("option");
  allOptYears.value = "";
  allOptYears.textContent = "All Time";
  yearSelect.append(allOptYears);

  const allOptEvents = document.createElement("option");
  allOptEvents.value = "";

  allOptEvents.textContent = "All Events";
  radarSelect.append(allOptEvents);

  const dataYear = await getJsons(playerYearsUrl);

  dataYear.forEach((y) => {
    const option = document.createElement("option");
    option.value = y;
    option.innerHTML = y;
    yearSelect.append(option);
  });

  async function drawRadar(year, eventId, valuesIds) {
    let url = year ? playerRadarUrl + "&year=" + year : playerRadarUrl;

    url = eventId ? url + "&event=" + eventId : url;

    if (valuesIds.length > 0) {
      url = url + "&ids=" + valuesIds;
    }

    const data = await getJsons(url);

    const label = data.abbrev;
    const statData = data.z_score;

    createOrUpdateRadar(label, statData, "radar_chart");
  }

  async function getEventsFromYear(year) {
    const eventsList = await getJsons(`${playerEventsUrl}${year}`);
    eventsList.forEach((e) => {
      const option = document.createElement("option");
      option.value = e.pdga_event_id;
      option.innerHTML = e.name;
      radarSelect.append(option);
    });
  }

  yearSelect.addEventListener("change", (e) => {
    radarSelect.innerHTML = "";

    radarSelect.append(allOptEvents);

    getEventsFromYear(e.target.value);

    drawRadar(e.target.value, "", values);
  });

  radarSelect.addEventListener("change", (e) => {
    drawRadar(yearSelect.value, e.target.value, values);
  });

  //the section of the code responsible fo r the checklist.
  const submitBtn = document.getElementById("radar_checklist_submitBtn");
  let values = [];
  let checkboxes = document.querySelectorAll("#stats_check");

  submitBtn.onclick = () => {
    values = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        values.push(parseInt(checkbox.value));
      }
    });
    yearSelect.innerHTML = "";

    yearSelect.append(allOptYears);

    dataYear.forEach((y) => {
      const option = document.createElement("option");
      option.value = y;
      option.innerHTML = y;
      yearSelect.append(option);
    });

    radarSelect.innerHTML = "";

    radarSelect.append(allOptEvents);

    drawRadar("", "", values);
  };

  const selectAllBtn = document.getElementById("radar_checklist_selectAllBtn");
  selectAllBtn.onclick = () => {
    checkboxes.forEach((checkbox) => {
      if (!checkbox.checked) {
        checkbox.checked = true;
      }
    });
  };

  const unselectAllBtn = document.getElementById("radar_checklist_unselectBtn");
  unselectAllBtn.onclick = () => {
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.checked = false;
      }
    });
  };

  const radarCuratedOptions = document.getElementById(
    "radarModification_curatedOptions"
  );

  radarCuratedOptions.addEventListener("change", (e) => {
    values = [];

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.checked = false;
      }
    });

    if (e.target.value == 1) {
      values = [1, 9, 17, 2, 3, 4, 5];

      yearSelect.innerHTML = "";

      yearSelect.append(allOptYears);

      dataYear.forEach((y) => {
        const option = document.createElement("option");
        option.value = y;
        option.innerHTML = y;
        yearSelect.append(option);
      });

      radarSelect.innerHTML = "";

      radarSelect.append(allOptEvents);

      drawRadar("", "", values);
    } else if (e.target.value == 3) {
      values = [6, 7, 8, 16, 18];

      yearSelect.innerHTML = "";

      yearSelect.append(allOptYears);

      dataYear.forEach((y) => {
        const option = document.createElement("option");
        option.value = y;
        option.innerHTML = y;
        yearSelect.append(option);
      });

      radarSelect.innerHTML = "";

      radarSelect.append(allOptEvents);

      drawRadar("", "", values);
    } else if (e.target.value == 4) {
      values = [10, 11, 12, 13, 14, 15];

      yearSelect.innerHTML = "";

      yearSelect.append(allOptYears);

      dataYear.forEach((y) => {
        const option = document.createElement("option");
        option.value = y;
        option.innerHTML = y;
        yearSelect.append(option);
      });

      radarSelect.innerHTML = "";

      radarSelect.append(allOptEvents);

      drawRadar("", "", values);
    } else if (!e.target.value) {
      drawRadar("", "", values);
    }
  });

  drawRadar("", "", values);
}
playerRadar();

async function playerRadar2() {
  const radarChecklistContainer = document.getElementById(
    "radar_checklist_container2"
  );
  const statIdsData = await getJsons(statIdsList);

  for (let i = 0; i < statIdsData.id.length; i++) {
    const label = document.createElement("label");
    label.style.display = "block";

    const checkInput = document.createElement("input");
    checkInput.type = "checkbox";
    checkInput.id = "stats_check2";
    checkInput.value = statIdsData.id[i];
    label.append(checkInput);

    label.append(statIdsData.name[i]);

    const hoverDiv = document.createElement("div");
    hoverDiv.className = "radar_modification_list_hover2";
    hoverDiv.style.display = "none";
    hoverDiv.style.position = "fixed";

    const hoverDivTextTitle = document.createElement("p");
    hoverDivTextTitle.style.fontWeight = "bolder";
    const hoverDivTextDesc = document.createElement("p");

    hoverDivTextTitle.innerHTML = statIdsData.fullName[i];
    hoverDivTextTitle.style.display = "block";
    hoverDiv.append(hoverDivTextTitle);

    hoverDivTextDesc.innerHTML = statIdsData.desc[i];
    hoverDivTextDesc.style.display = "block";
    hoverDiv.append(hoverDivTextDesc);

    label.addEventListener("mouseover", (e) => {
      hoverDiv.style.display = "block";
    });

    label.addEventListener("mousemove", (e) => {
      hoverDiv.style.left = e.clientX + 8 + "px";
      hoverDiv.style.top = e.clientY - 30 + "px";
    });

    label.addEventListener("mouseout", (e) => {
      hoverDiv.style.display = "none";
    });

    label.append(hoverDiv);
    radarChecklistContainer.append(label);
  }

  const yearSelect = document.getElementById("radar_yearSelect2");
  const radarSelect = document.getElementById("radar_eventSelect2");

  const allOptYears = document.createElement("option");
  allOptYears.value = "";
  allOptYears.textContent = "All Time";
  yearSelect.append(allOptYears);

  const allOptEvents = document.createElement("option");
  allOptEvents.value = "";

  allOptEvents.textContent = "All Events";
  radarSelect.append(allOptEvents);

  const dataYear = await getJsons(playerYearsUrl);

  dataYear.forEach((y) => {
    const option = document.createElement("option");
    option.value = y;
    option.innerHTML = y;
    yearSelect.append(option);
  });

  async function drawRadar(year, eventId, valuesIds) {
    let url = year ? playerRadarUrl + "&year=" + year : playerRadarUrl;

    url = eventId ? url + "&event=" + eventId : url;

    if (valuesIds.length > 0) {
      url = url + "&ids=" + valuesIds;
    }

    const data = await getJsons(url);

    const label = data.abbrev;
    const statData = data.z_score;

    createOrUpdateRadar2(label, statData, "radar_chart2");
  }

  async function getEventsFromYear(year) {
    const eventsList = await getJsons(`${playerEventsUrl}${year}`);
    eventsList.forEach((e) => {
      const option = document.createElement("option");
      option.value = e.pdga_event_id;
      option.innerHTML = e.name;
      radarSelect.append(option);
    });
  }

  yearSelect.addEventListener("change", (e) => {
    radarSelect.innerHTML = "";

    radarSelect.append(allOptEvents);

    getEventsFromYear(e.target.value);

    drawRadar(e.target.value, "", values);
  });

  radarSelect.addEventListener("change", (e) => {
    drawRadar(yearSelect.value, e.target.value, values);
  });

  const submitBtn = document.getElementById("radar_checklist_submitBtn2");
  let values = [];
  let checkboxes = document.querySelectorAll("#stats_check2");
  submitBtn.onclick = () => {
    values = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        values.push(parseInt(checkbox.value));
      }
    });
    yearSelect.innerHTML = "";

    yearSelect.append(allOptYears);

    dataYear.forEach((y) => {
      const option = document.createElement("option");
      option.value = y;
      option.innerHTML = y;
      yearSelect.append(option);
    });

    radarSelect.innerHTML = "";

    radarSelect.append(allOptEvents);

    drawRadar("", "", values);
  };

  const selectAllBtn = document.getElementById("radar_checklist_selectAllBtn2");
  selectAllBtn.onclick = () => {
    checkboxes.forEach((checkbox) => {
      if (!checkbox.checked) {
        checkbox.checked = true;
      }
    });
  };

  const unselectAllBtn = document.getElementById(
    "radar_checklist_unselectBtn2"
  );
  unselectAllBtn.onclick = () => {
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.checked = false;
      }
    });
  };

  const radarCuratedOptions2 = document.getElementById(
    "radarModification_curatedOptions2"
  );
  radarCuratedOptions2.addEventListener("change", (e) => {
    values = [];

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.checked = false;
      }
    });

    if (e.target.value == 1) {
      values = [1, 9, 17, 2, 3, 4, 5];

      yearSelect.innerHTML = "";

      yearSelect.append(allOptYears);

      dataYear.forEach((y) => {
        const option = document.createElement("option");
        option.value = y;
        option.innerHTML = y;
        yearSelect.append(option);
      });

      radarSelect.innerHTML = "";

      radarSelect.append(allOptEvents);

      drawRadar("", "", values);
    } else if (e.target.value == 3) {
      values = [6, 7, 8, 16, 18];

      yearSelect.innerHTML = "";

      yearSelect.append(allOptYears);

      dataYear.forEach((y) => {
        const option = document.createElement("option");
        option.value = y;
        option.innerHTML = y;
        yearSelect.append(option);
      });

      radarSelect.innerHTML = "";

      radarSelect.append(allOptEvents);

      drawRadar("", "", values);
    } else if (e.target.value == 4) {
      values = [10, 11, 12, 13, 14, 15];

      yearSelect.innerHTML = "";

      yearSelect.append(allOptYears);

      dataYear.forEach((y) => {
        const option = document.createElement("option");
        option.value = y;
        option.innerHTML = y;
        yearSelect.append(option);
      });

      radarSelect.innerHTML = "";

      radarSelect.append(allOptEvents);

      drawRadar("", "", values);
    } else if (!e.target.value) {
      drawRadar("", "", values);
    }
  });

  drawRadar("", "", values);
}

let radarChart;
async function createOrUpdateRadar(label, data, elementId) {
  let canvas = document.getElementById(`${elementId}`);
  let options = {
    type: "radar",
    data: {
      labels: label, //data.abbrev,
      datasets: [
        {
          label: "Performance",
          data: data, //data.z_score,
          fill: true,
          backgroundColor: "rgba(0, 183, 64, 0.2)",
          borderColor: "rgb(1, 97, 27)",
          borderWidth: 2,
          pointBackgroundColor: "rgb(54, 162, 235)",
        },
      ],
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
            color: "#EA7317",
          },
          pointLabels: {
            font: { size: 12 },
            color: "#252525",
          },
          grid: { circular: true },
        },
      },
      plugins: { legend: { display: false } },
    },
  };

  if (radarChart) {
    radarChart.data.labels = label;
    radarChart.data.datasets[0].data = data;
    radarChart.update();
  } else {
    radarChart = new Chart(canvas, options);
  }
}

playerRadar2();

let radarChart2;
async function createOrUpdateRadar2(label2, data2, elementId2) {
  let canvas2 = document.getElementById(`${elementId2}`);
  let options2 = {
    type: "radar",
    data: {
      labels: label2, //data.abbrev,
      datasets: [
        {
          label: "Performance",
          data: data2, //data.z_score,
          fill: true,
          backgroundColor: "rgba(0, 183, 64, 0.2)",
          borderColor: "rgb(1, 97, 27)",
          borderWidth: 2,
          pointBackgroundColor: "rgb(54, 162, 235)",
        },
      ],
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
            color: "#EA7317",
          },
          pointLabels: {
            font: { size: 12 },
            color: "#252525",
          },
          grid: { circular: true },
        },
      },
      plugins: { legend: { display: false } },
    },
  };

  if (radarChart2) {
    radarChart2.data.labels = label2;
    radarChart2.data.datasets[0].data = data2;
    radarChart2.update();
  } else {
    radarChart2 = new Chart(canvas2, options2);
  }
}

let radar2 = document.getElementById("radarChart_comparisonContainer");

let radarCompareButton = document.getElementById("radarGraphCompareButton");
radarCompareButton.addEventListener("click", () => {
  radarCompareButton.style.display = "none";
  radar2.classList.toggle("toggled");
});

let radarCompareCloseButton = document.getElementById(
  "radarCompareCloseButton"
);
radarCompareCloseButton.addEventListener("click", () => {
  radar2.classList.toggle("toggled");
  radarCompareButton.style.display = "block";
});

async function playerRadial() {
  const yearSelect = document.getElementById("radial_dropdown");

  const allOpt = document.createElement("option");
  allOpt.value = "";
  allOpt.textContent = "All Time";
  yearSelect.append(allOpt);

  const dataYear = await getJsons(playerYearsUrl);

  dataYear.forEach((y) => {
    const option = document.createElement("option");
    option.value = y;
    option.innerHTML = y;
    yearSelect.append(option);
  });

  async function drawRadials(year) {
    const url = year ? `${playerRadialUrl}&year=${year}` : playerRadialUrl;
    const data = await getJsons(url);

    const [fwhLabel, c2rLabel, c1xLabel] = data.stat;
    const [fwhVal, c2rVal, c1xVal] = data.values;

    createOrUpdateRadial("FWH_radial", fwhLabel, fwhVal);
    createOrUpdateRadial("C2R_radial", c2rLabel, c2rVal);
    createOrUpdateRadial("C1X_radial", c1xLabel, c1xVal);
  }

  yearSelect.addEventListener("change", (e) => {
    drawRadials(e.target.value);
  });

  drawRadials("");
}
playerRadial();

const radialCharts = {
  FWH_radial: null,
  C2R_radial: null,
  C1X_radial: null,
};

function createOrUpdateRadial(elementId, label, value) {
  const el = document.querySelector(`#${elementId}`);
  const opts = {
    series: [value],
    labels: [`${label}%`],
    chart: { height: 170, type: "radialBar" },
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
            fontSize: "14px",
            fontWeight: 550,
            color: "#323232", //"#FEFAE0"
          },
          value: {
            show: true,
            offsetY: -6,
            fontSize: "20px",
            fontWeight: 800,
            color: "#323232", //'#FEFAE0',
            formatter: (v) => v,
          },
        },
        hollow: { size: "50%" /*background: "#FFEDD6"*/ },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "diagonal",
        gradientToColors: ["#20E647"],
        stops: [0, 100],
      },
    },
    stroke: { lineCap: "round" },
  };

  if (radialCharts[elementId]) {
    radialCharts[elementId].updateSeries(opts.series);
    radialCharts[elementId].updateOptions({ labels: opts.labels });
  } else {
    radialCharts[elementId] = new ApexCharts(el, opts);
    radialCharts[elementId].render();
  }
}

async function playerHbar() {
  const yearSelect = document.getElementById("hbar_dropdown_years");
  const eventSelect = document.getElementById("hbar_dropdown_events");

  const allOptYears = document.createElement("option");
  allOptYears.value = "";
  allOptYears.textContent = "All Time";
  yearSelect.append(allOptYears);

  const allOptEvents = document.createElement("option");
  allOptEvents.value = "";
  // allOptEvents.class = 'radarEventSelectDefault'
  allOptEvents.textContent = "All Events";
  eventSelect.append(allOptEvents);

  const dataYear = await getJsons(playerYearsUrl);

  dataYear.forEach((y) => {
    const option = document.createElement("option");
    option.value = y;
    option.innerHTML = y;
    yearSelect.append(option);
  });

  async function drawHbar(year, eventId) {
    let url = year ? playerHbarUrl + "&year=" + year : playerHbarUrl;

    url = eventId ? url + "&event=" + eventId : url;

    const data = await getJsons(url);

    const drivingLabel = data.drivingAbbrev;
    const drivingStatData = data.drivingPercentile;

    //const shortGameLabel = data.shortGameAbbrev;
    //const shortGameStatData = data.shortGamePercentile;

    const puttingLabel = data.puttingAbbrev;
    const puttingStatData = data.puttingPercentile;

    const scoringLabel = data.scoringAbbrev;
    const scoringStatData = data.scoringPercentile;

    createOrUpdateDrivingHbar(
      drivingLabel,
      drivingStatData,
      "drivingHbar_percentile_chart"
    );
    //createOrUpdateApproachHbar(shortGameLabel, shortGameStatData, 'shortGameHbar_percentile_chart');
    createOrUpdatePuttingHbar(
      puttingLabel,
      puttingStatData,
      "puttingHbar_percentile_chart"
    );
    createOrUpdateScoringHbar(
      scoringLabel,
      scoringStatData,
      "scoringHbar_percentile_chart"
    );
  }

  async function getEventsFromYear(year) {
    const eventsList = await getJsons(`${playerEventsUrl}${year}`);
    eventsList.forEach((e) => {
      const option = document.createElement("option");
      option.value = e.pdga_event_id;
      option.innerHTML = e.name;
      eventSelect.append(option);
    });
  }

  yearSelect.addEventListener("change", (e) => {
    eventSelect.innerHTML = "";

    eventSelect.append(allOptEvents);

    getEventsFromYear(e.target.value);

    drawHbar(e.target.value, "");
  });

  eventSelect.addEventListener("change", (e) => {
    drawHbar(yearSelect.value, e.target.value);
  });

  drawHbar("", "");
}

playerHbar();

// let hbarChart;
// function createOrUpdateHbar(labels, data, elementId){
//   const canvas = document.getElementById(elementId).getrow('2d');
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
function createOrUpdateDrivingHbar(labels, data, elementId) {
  const canvas = document.getElementById(elementId);
  options = {
    data: {
      labels: labels,
      datasets: [
        // the thin bars
        {
          type: "bar",
          label: "Percentile",
          data: data,
          backgroundColor: "#38A169",
          barThickness: 8,
        },
      ],
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 3.2,
      responsive: true,
      indexAxis: "y",
      scales: {
        x: {
          max: 105,
          grid: { display: false },
          ticks: {
            display: false,
          },
        },
        y: {
          grid: { display: false },
        },
      },
      plugins: {
        // datalabels: {
        //   display: true
        // },
        datalabels: {
          display: true,
          color: "#616161",
          anchor: "end",
          align: "end",
          offset: 4,
          formatter: (value) => value,
        },
        legend: { display: false },
        tooltip: { enabled: true },
      },
    },
    plugins: [ChartDataLabels],
  };

  if (drivingHbar) {
    drivingHbar.data.datasets[0].data = data;
    drivingHbar.data.labels = labels;
    drivingHbar.update();
  } else {
    drivingHbar = new Chart(canvas, options);
  }
}

// let approachHbar;
// function createOrUpdateApproachHbar(labels, data, elementId){
//   const canvas = document.getElementById(elementId);
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
//       maintainAspectRatio: true,
//       aspectRatio: 5,
//       responsive:true,
//       indexAxis: 'y',
//       scales: {
//         x: {
//           max: 100,
//           grid: { display: false },
//           ticks: {
//             display: false
//           }
//         },
//         y: {
//           grid: { display: false }
//         }
//       },
//       plugins: {
//         // datalabels: {
//         //   display: false
//         // },
//         datalabels: {
//           display: true,
//           color: '#616161',
//           anchor: 'end',
//           align: 'end',
//           offset: 4,
//           formatter: value => value
//         },
//         legend: { display: false },
//         tooltip: { enabled: true }
//       }
//     },
//     plugins: [ChartDataLabels]
//   }

//   if (approachHbar){
//     approachHbar.data.datasets[0].data = data;
//     approachHbar.data.labels = labels;
//     approachHbar.update();
//   } else {
//     approachHbar = new Chart(canvas, options);
//   }
// }

let puttingHbar;
function createOrUpdatePuttingHbar(labels, data, elementId) {
  const canvas = document.getElementById(elementId);
  options = {
    data: {
      labels: labels,
      datasets: [
        // the thin bars
        {
          type: "bar",
          label: "Percentile",
          data: data,
          backgroundColor: "#38A169",
          barThickness: 8,
        },
      ],
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 4.4,
      responsive: true,
      indexAxis: "y",
      scales: {
        x: {
          max: 105,
          grid: { display: false },
          ticks: {
            display: false,
          },
        },
        y: {
          grid: { display: false },
        },
      },
      plugins: {
        // datalabels: {
        //   display: false
        // },
        datalabels: {
          display: true,
          color: "#616161",
          anchor: "end",
          align: "end",
          offset: 4,
          formatter: (value) => value,
        },
        legend: { display: false },
        tooltip: { enabled: true },
      },
    },
    plugins: [ChartDataLabels],
  };

  if (puttingHbar) {
    puttingHbar.data.datasets[0].data = data;
    puttingHbar.data.labels = labels;
    puttingHbar.update();
  } else {
    puttingHbar = new Chart(canvas, options);
  }
}

let scoringHbar;
function createOrUpdateScoringHbar(labels, data, elementId) {
  const canvas = document.getElementById(elementId);
  options = {
    data: {
      labels: labels,
      datasets: [
        // the thin bars
        {
          type: "bar",
          label: "Percentile",
          data: data,
          backgroundColor: "#38A169",
          barThickness: 8,
        },
      ],
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 3.6,
      responsive: true,
      indexAxis: "y",
      scales: {
        x: {
          max: 105,
          grid: { display: false },
          ticks: {
            display: false,
          },
        },
        y: {
          grid: { display: false },
        },
      },
      plugins: {
        // datalabels: {
        //   display: false
        // },
        datalabels: {
          display: true,
          color: "#616161",
          anchor: "end",
          align: "end",
          offset: 4,
          formatter: (value) => value,
        },
        legend: { display: false },
        tooltip: { enabled: true },
      },
    },
    plugins: [ChartDataLabels],
  };

  if (scoringHbar) {
    scoringHbar.data.datasets[0].data = data;
    scoringHbar.data.labels = labels;
    scoringHbar.update();
  } else {
    scoringHbar = new Chart(canvas, options);
  }
}

let hBarCompare = document.getElementById("hBarGraphCompareButton");
hBarCompare.addEventListener("click", () => {
  hBarCompare.style.display = "none";
  document.getElementById("totalStats_breakdown2").classList.toggle("active");
});

let hBar2Close = document.getElementById("hBarGraphCompareButton2");
hBar2Close.addEventListener("click", () => {
  hBarCompare.style.display = "block";
  document.getElementById("totalStats_breakdown2").classList.toggle("active");
});

async function playerHbar2() {
  const yearSelect = document.getElementById("hbar_dropdown_years2");
  const eventSelect = document.getElementById("hbar_dropdown_events2");

  const allOptYears = document.createElement("option");
  allOptYears.value = "";
  allOptYears.textContent = "All Time";
  yearSelect.append(allOptYears);

  const allOptEvents = document.createElement("option");
  allOptEvents.value = "";
  // allOptEvents.class = 'radarEventSelectDefault'
  allOptEvents.textContent = "All Events";
  eventSelect.append(allOptEvents);

  const dataYear = await getJsons(playerYearsUrl);

  dataYear.forEach((y) => {
    const option = document.createElement("option");
    option.value = y;
    option.innerHTML = y;
    yearSelect.append(option);
  });

  async function drawHbar(year, eventId) {
    let url = year ? playerHbarUrl + "&year=" + year : playerHbarUrl;

    url = eventId ? url + "&event=" + eventId : url;

    const data = await getJsons(url);

    const drivingLabel = data.drivingAbbrev;
    const drivingStatData = data.drivingPercentile;

    //const shortGameLabel = data.shortGameAbbrev;
    //const shortGameStatData = data.shortGamePercentile;

    const puttingLabel = data.puttingAbbrev;
    const puttingStatData = data.puttingPercentile;

    const scoringLabel = data.scoringAbbrev;
    const scoringStatData = data.scoringPercentile;

    createOrUpdateDrivingHbar2(
      drivingLabel,
      drivingStatData,
      "drivingHbar_percentile_chart2"
    );
    //createOrUpdateApproachHbar(shortGameLabel, shortGameStatData, 'shortGameHbar_percentile_chart');
    createOrUpdatePuttingHbar2(
      puttingLabel,
      puttingStatData,
      "puttingHbar_percentile_chart2"
    );
    createOrUpdateScoringHbar2(
      scoringLabel,
      scoringStatData,
      "scoringHbar_percentile_chart2"
    );
  }

  async function getEventsFromYear(year) {
    const eventsList = await getJsons(`${playerEventsUrl}${year}`);
    eventsList.forEach((e) => {
      const option = document.createElement("option");
      option.value = e.pdga_event_id;
      option.innerHTML = e.name;
      eventSelect.append(option);
    });
  }

  yearSelect.addEventListener("change", (e) => {
    eventSelect.innerHTML = "";

    eventSelect.append(allOptEvents);

    getEventsFromYear(e.target.value);

    drawHbar(e.target.value, "");
  });

  eventSelect.addEventListener("change", (e) => {
    drawHbar(yearSelect.value, e.target.value);
  });

  drawHbar("", "");
}

playerHbar2();

let drivingHbar2;
Chart.register(ChartDataLabels);
function createOrUpdateDrivingHbar2(labels, data, elementId) {
  const canvas = document.getElementById(elementId);
  options = {
    data: {
      labels: labels,
      datasets: [
        // the thin bars
        {
          type: "bar",
          label: "Percentile",
          data: data,
          backgroundColor: "#38A169",
          barThickness: 8,
        },
      ],
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 3.2,
      responsive: true,
      indexAxis: "y",
      scales: {
        x: {
          max: 105,
          grid: { display: false },
          ticks: {
            display: false,
          },
        },
        y: {
          grid: { display: false },
        },
      },
      plugins: {
        // datalabels: {
        //   display: true
        // },
        datalabels: {
          display: true,
          color: "#616161",
          anchor: "end",
          align: "end",
          offset: 4,
          formatter: (value) => value,
        },
        legend: { display: false },
        tooltip: { enabled: true },
      },
    },
    plugins: [ChartDataLabels],
  };

  if (drivingHbar2) {
    drivingHbar2.data.datasets[0].data = data;
    drivingHbar2.data.labels = labels;
    drivingHbar2.update();
  } else {
    drivingHbar2 = new Chart(canvas, options);
  }
}

let puttingHbar2;
function createOrUpdatePuttingHbar2(labels, data, elementId) {
  const canvas = document.getElementById(elementId);
  options = {
    data: {
      labels: labels,
      datasets: [
        // the thin bars
        {
          type: "bar",
          label: "Percentile",
          data: data,
          backgroundColor: "#38A169",
          barThickness: 8,
        },
      ],
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 4.4,
      responsive: true,
      indexAxis: "y",
      scales: {
        x: {
          max: 105,
          grid: { display: false },
          ticks: {
            display: false,
          },
        },
        y: {
          grid: { display: false },
        },
      },
      plugins: {
        // datalabels: {
        //   display: false
        // },
        datalabels: {
          display: true,
          color: "#616161",
          anchor: "end",
          align: "end",
          offset: 4,
          formatter: (value) => value,
        },
        legend: { display: false },
        tooltip: { enabled: true },
      },
    },
    plugins: [ChartDataLabels],
  };

  if (puttingHbar2) {
    puttingHbar2.data.datasets[0].data = data;
    puttingHbar2.data.labels = labels;
    puttingHbar2.update();
  } else {
    puttingHbar2 = new Chart(canvas, options);
  }
}

let scoringHbar2;
function createOrUpdateScoringHbar2(labels, data, elementId) {
  const canvas = document.getElementById(elementId);
  options = {
    data: {
      labels: labels,
      datasets: [
        // the thin bars
        {
          type: "bar",
          label: "Percentile",
          data: data,
          backgroundColor: "#38A169",
          barThickness: 8,
        },
      ],
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 3.6,
      responsive: true,
      indexAxis: "y",
      scales: {
        x: {
          max: 105,
          grid: { display: false },
          ticks: {
            display: false,
          },
        },
        y: {
          grid: { display: false },
        },
      },
      plugins: {
        // datalabels: {
        //   display: false
        // },
        datalabels: {
          display: true,
          color: "#616161",
          anchor: "end",
          align: "end",
          offset: 4,
          formatter: (value) => value,
        },
        legend: { display: false },
        tooltip: { enabled: true },
      },
    },
    plugins: [ChartDataLabels],
  };

  if (scoringHbar2) {
    scoringHbar2.data.datasets[0].data = data;
    scoringHbar2.data.labels = labels;
    scoringHbar2.update();
  } else {
    scoringHbar2 = new Chart(canvas, options);
  }
}

fetch(globeUrl)
  .then((res) => res.json())
  .then((locations) => {
    const tooltip = document.getElementById("globe_tooltip");
    const globeEl = document.getElementById("globe");

    const world = Globe()(globeEl)
      .width(400)
      .height(400)

      .globeImageUrl(
        "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )

      .backgroundColor("rgba(0,0,0,0)")

      .pointsData(locations)
      .pointLat((d) => d.latitude)
      .pointLng((d) => d.longitude)
      .pointColor(() => "#EA7317")
      .pointAltitude(0.02)
      .pointRadius(0.5)

      // 5) Show a tooltip on hover
      .onPointHover((point) => {
        if (!point) {
          tooltip.style.display = "none";
          return;
        }
        // Populate tooltip content
        tooltip.innerHTML = `
        <!-- <strong>${point.name}</strong> --><br>
        ${point.city}, ${point.state}, ${point.country}<br>
        ${point.start_date}
        `;

        tooltip.style.display = "flex";
      })
      .pointOfView({ lat: 40.176404, lng: -95.327418, altitude: 1 }, 0);

    globeEl.addEventListener("mousemove", (e) => {
      tooltip.style.top = /*e.clientY + */ 10 + "px";
      tooltip.style.right = /*e.clientX + */ 10 + "px";
    });
  });

let eventsTable;

async function displayEventsTable() {
  const roundsContainer = document.getElementById("roundsTableParentContainer");
  roundsContainer.style.display = "none";

  const roundTab = document.getElementById("tabsSection_roundsTab");
  roundTab.className = "tabsSection_roundsTab";

  const eventContainer = document.getElementById("eventsTableParentContainer");
  eventContainer.style.display = "flex";

  const eventTab = document.getElementById("tabsSection_eventTab");
  eventTab.className = "tabsSection_eventTab_active";

  const eventsData = await getJsons(playerEventsListUrl);

  let table = document.getElementById("eventsTable");
  let options = {
    data: eventsData.events,
    columns: [
      {
        title: "Name",
        data: "name",
        width: "400px",
        className: "scrollable-cell",
        render: function (data, type, row, meta) {
          return `<div class="scroll-x"><a target="_blank" style="text-decoration: none; color: inherit;" href='https://www.pdga.com/tour/event/${row.pdga_event_id}'>${data}</a></div>`;
        },
      },
      { title: "Month", data: "event_month" },
      {
        title: "Date",
        data: "start_date",
        width: "100px",
      },
      { title: "Year", data: "event_year" },
      { title: "City", data: "city" },
      { title: "State", data: "state" },
      { title: "Country", data: "country" },
      { title: "Place", data: "place" },
      { title: "Strokes", data: "strokes" },
      { title: "Cash", data: "cash" },
      {
        title: "Rating",
        data: "event_rating",
        render: function (data) {
          return `<div><strong>${data}</strong></div>`;
        },
      },
    ],
    createdRow: function (row, data, dataIndex) {
      row.style.fontSize = "12px";
    },
    pageLength: 10,
    paging: true,
    searching: true,
    ordering: true,
  };

  if (eventsTable) {
  } else {
    eventsTable = new DataTable(table, options);
  }
}

displayEventsTable();

let roundsTable;
async function displayRoundsTable() {
  const eventContainer = document.getElementById("eventsTableParentContainer");
  eventContainer.style.display = "none";

  const eventTab = document.getElementById("tabsSection_eventTab");
  eventTab.className = "tabsSection_eventTab";


  const roundsContainer = document.getElementById("roundsTableParentContainer");
  roundsContainer.style.display = "flex";

  const roundTab = document.getElementById("tabsSection_roundsTab");
  roundTab.className = "tabsSection_roundsTab_active";

  const roundsData = await getJsons(playerRoundsListUrl);

  let table = document.getElementById("roundsTable");
  let options = {
    autoWidth: false,
    data: roundsData.rounds,
    columns: [
      {
        title: "Name",
        data: "name",
        width: "550px",
        className: "scrollable-cell",
        render: function (data) {
          return `<div class="scroll-x">${data}</div>`;
        },
      },
      {
        title: "Date",
        data: "start_date",
        width: "100px",
      },
      { title: "Month", data: "event_month" },
      { title: "Year", data: "event_year" },
      { title: "Division", data: "division" },
      { title: "Round", data: "round" },
      { title: "Strokes", data: "score" },
      {
        title: "Rating",
        data: "rating",
        render: function (data) {
          return `<div><strong>${data}</strong></div>`;
        },
      },
    ],
    createdRow: function (row, data, dataIndex) {
      row.style.fontSize = "12px";
    },
    pageLength: 25,
    paging: true,
    searching: true,
    ordering: true,
  };

  if (roundsTable) {
  } else {
    roundsTable = new DataTable(table, options);
  }
}

document
  .getElementById("tabsSection_eventTab")
  .addEventListener("click", () => {
    displayEventsTable();
  });
document
  .getElementById("tabsSection_roundsTab")
  .addEventListener("click", () => {
    displayRoundsTable();
  });

// document
//   .getElementById("compareSelector_optionSelect")
//   .addEventListener("change", () => {});

// document
//   .getElementById("eventRound_pullButton")
//   .addEventListener("click", () => {
//     document
//       .getElementById("hoverTab_eventRound_comparison")
//       .classList.toggle("clicked");
//   });

// async function displayPlayerRankings(id) {
//   let url = pdgaNum
//     ? allPlayerRankingsUrl + "?pdga_number=" + pdgaNum
//     : console.log("displayPlayerRankings(): missing pdga number");
//   url = id ? url + "&id=" + id : url;

//   let rankingData = await getJsons(url);

//   let playerRankingsContainer = document.getElementById(
//     "playerRankings_container"
//   );

//   for (let i = 0; i < rankingData.length; i++) {
//     if (rankingData[i].pdga_number == pdgaNum) {
//       document.getElementById("primaryPlayerRanking_fullName").innerHTML =
//         rankingData[i].full_name;
//       document.getElementById("primaryPlayerRanking_ranking").innerHTML = i + 1;
//       document.getElementById(
//         "primaryPlayerEventNum"
//       ).innerHTML = `E: ${rankingData[i].total_events}`;
//       document.getElementById(
//         "primaryPlayerRoundNum"
//       ).innerHTML = `R: ${rankingData[i].total_rounds}`;
//       document.getElementById(
//         "primaryPlayerRatingNum"
//       ).innerHTML = `${rankingData[i].average_stat_value}`;
//     }

//     if (i < 10) {
//       //create the container for the player
//       let playerBin = document.createElement("div");
//       playerBin.className = "playerRankingBin";

//       if (rankingData[i].pdga_number == pdgaNum) {
//         playerBin.style.border = "2px solid rgb(10, 173, 255)";
//       }

//       //create the container for ranking and name
//       let playerRankingAndNameBin = document.createElement("div");
//       playerRankingAndNameBin.className = "playerRankingAndNameBin";

//       let playerName = document.createElement("h4");
//       playerName.innerHTML = rankingData[i].full_name;
//       playerRankingAndNameBin.append(playerName);

//       let playerRanking = document.createElement("h3");
//       playerRanking.innerHTML = i + 1;
//       playerRankingAndNameBin.append(playerRanking);

//       playerBin.append(playerRankingAndNameBin);

//       //create the container for events, rounds, rating
//       let playerRankingFinerDetail = document.createElement("div");
//       playerRankingFinerDetail.className = "playerRankingFinerDetail";

//       let playerEventsNum = document.createElement("p");
//       playerEventsNum.innerHTML = `E: ${rankingData[i].total_events}`;
//       playerRankingFinerDetail.append(playerEventsNum);

//       let playerRoundsNum = document.createElement("p");
//       playerRoundsNum.innerHTML = `R: ${rankingData[i].total_rounds}`;
//       playerRankingFinerDetail.append(playerRoundsNum);

//       let playerRatingNum = document.createElement("h3");
//       playerRatingNum.innerHTML = rankingData[i].average_stat_value;
//       playerRankingFinerDetail.append(playerRatingNum);

//       playerBin.append(playerRankingFinerDetail);

//       playerRankingsContainer.append(playerBin);
//     }
//   }
// }

// displayPlayerRankings();

// let rankingMetricSelect = document.getElementById("playerRanking_metricSelect");
// rankingMetricSelect.addEventListener("change", (e) => {
//   document.getElementById("primaryPlayerRanking_fullName").innerHTML = "";
//   document.getElementById("primaryPlayerRanking_ranking").innerHTML = "";
//   document.getElementById("primaryPlayerEventNum").innerHTML = "";
//   document.getElementById("primaryPlayerRoundNum").innerHTML = "";
//   document.getElementById("primaryPlayerRatingNum").innerHTML = "";
//   document.getElementById("playerRankings_container").innerHTML = "";

//   displayPlayerRankings(e.target.value);
// });

// async function displayQuickCompareResults() {
//   let resultsDisplayMainContainer = document.getElementById(
//     "hoverTab_mainContent_resultsDisplay"
//   );
//   let containerFirstCompare = document.getElementById(
//     "mainContent_resultsDisplay_firstCompare"
//   );
//   let containerSecondCompare = document.getElementById(
//     "mainContent_resultsDisplay_secondCompare"
//   );

//   let initialSelector = document.getElementById("compareSelector_optionSelect");

//   initialSelector.addEventListener("change", async (e) => {
//     containerFirstCompare.innerHTML = "";
//     containerSecondCompare.innerHTML = "";

//     if (e.target.value == "years") {
//       resultsDisplayMainContainer.style.display = "flex";
//       //now create the year1 and year2 selectors and add them to their containers

//       let year1Selector = document.createElement("select");
//       let year2Selector = document.createElement("select");

//       //append default empty values in year selectors
//       let yearDefaultOption = document.createElement("option");
//       yearDefaultOption.value = "";
//       yearDefaultOption.innerHTML = "Choose a year...";

//       let yearDefaultOption2 = document.createElement("option");
//       yearDefaultOption2.value = "";
//       yearDefaultOption2.innerHTML = "Choose a year...";

//       year1Selector.append(yearDefaultOption);
//       year2Selector.append(yearDefaultOption2);

//       let yearData = await getJsons(playerYearsUrl);

//       //populate both year selectors with the years we have in our database
//       yearData.forEach((year) => {
//         let yearOption = document.createElement("option");
//         yearOption.value = year;
//         yearOption.innerHTML = year;

//         let yearOption2 = document.createElement("option");
//         yearOption2.value = year;
//         yearOption2.innerHTML = year;

//         year1Selector.append(yearOption);
//         year2Selector.append(yearOption2);
//       });

//       //add the year selectors to their respective containers
//       containerFirstCompare.append(year1Selector);
//       containerSecondCompare.append(year2Selector);

//       let year1Rating = document.getElementById("year1_rating");
//       let year1Earnings = document.getElementById("year1_earnings");
//       let year1Wins = document.getElementById("year1_wins");
//       let year1Podiums = document.getElementById("year1_podiums");
//       let year1topTens = document.getElementById("year1_topTens");
//       let year1Events = document.getElementById("year1_events");
//       let year1Strokes = document.getElementById("year1_strokes");
//       let year1Place = document.getElementById("year1_place");
//       let year1Fwh = document.getElementById("year1_fwh");
//       let year1C2r = document.getElementById("year1_c2r");
//       let year1C1x = document.getElementById("year1_c1x");

//       year1Selector.addEventListener("change", async (e) => {
//         year1Rating.innerHTML = "";
//         year1Earnings.innerHTML = "";
//         year1Wins.innerHTML = "";
//         year1Podiums.innerHTML = "";
//         year1topTens.innerHTML = "";
//         year1Events.innerHTML = "";
//         year1Strokes.innerHTML = "";
//         year1Place.innerHTML = "";
//         year1Fwh.innerHTML = "";
//         year1C2r.innerHTML = "";
//         year1C1x.innerHTML = "";

//         let url = e.target.value
//           ? getYearQuickCompare + "&year=" + e.target.value
//           : "";

//         let yearQuickData = await getJsons(url);

//         year1Rating.innerHTML = yearQuickData.player.avg_rating;
//         year1Earnings.innerHTML = yearQuickData.player.earnings;
//         year1Wins.innerHTML = yearQuickData.player.wins;
//         year1Podiums.innerHTML = yearQuickData.player.podiums;
//         year1topTens.innerHTML = yearQuickData.player.top_tens;
//         year1Events.innerHTML = yearQuickData.player.total_events;
//         year1Strokes.innerHTML = yearQuickData.player.avg_strokes_per_event;
//         year1Place.innerHTML = yearQuickData.player.avg_place;
//         year1Fwh.innerHTML = yearQuickData.main3[0].avg_percentage;
//         year1C2r.innerHTML = yearQuickData.main3[1].avg_percentage;
//         year1C1x.innerHTML = yearQuickData.main3[2].avg_percentage;

//         if (year1Rating.textContent && year2Rating.textContent) {
//           if (
//             parseFloat(year1Rating.textContent) >
//             parseFloat(year2Rating.textContent)
//           ) {
//             year1Rating.style.color = "green";
//             year2Rating.style.color = "red";
//           } else if (
//             parseFloat(year1Rating.textContent) <
//             parseFloat(year2Rating.textContent)
//           ) {
//             year1Rating.style.color = "red";
//             year2Rating.style.color = "green";
//           } else {
//             year1Rating.style.color = "black";
//             year2Rating.style.color = "black";
//           }

//           if (
//             parseFloat(year1Earnings.textContent) >
//             parseFloat(year2Earnings.textContent)
//           ) {
//             year1Earnings.style.color = "green";
//             year2Earnings.style.color = "red";
//           } else if (
//             parseFloat(year1Earnings.textContent) <
//             parseFloat(year2Earnings.textContent)
//           ) {
//             year1Earnings.style.color = "red";
//             year2Earnings.style.color = "green";
//           } else {
//             year1Earnings.style.color = "black";
//             year2Earnings.style.color = "black";
//           }

//           if (
//             parseFloat(year1Wins.textContent) >
//             parseFloat(year2Wins.textContent)
//           ) {
//             year1Wins.style.color = "green";
//             year2Wins.style.color = "red";
//           } else if (
//             parseFloat(year1Wins.textContent) <
//             parseFloat(year2Wins.textContent)
//           ) {
//             year1Wins.style.color = "red";
//             year2Wins.style.color = "green";
//           } else {
//             year1Wins.style.color = "black";
//             year2Wins.style.color = "black";
//           }

//           if (
//             parseFloat(year1Podiums.textContent) >
//             parseFloat(year2Podiums.textContent)
//           ) {
//             year1Podiums.style.color = "green";
//             year2Podiums.style.color = "red";
//           } else if (
//             parseFloat(year1Podiums.textContent) <
//             parseFloat(year2Podiums.textContent)
//           ) {
//             year1Podiums.style.color = "red";
//             year2Podiums.style.color = "green";
//           } else {
//             year1Podiums.style.color = "black";
//             year2Podiums.style.color = "black";
//           }

//           if (
//             parseFloat(year1topTens.textContent) >
//             parseFloat(year2topTens.textContent)
//           ) {
//             year1topTens.style.color = "green";
//             year2topTens.style.color = "red";
//           } else if (
//             parseFloat(year1topTens.textContent) <
//             parseFloat(year2topTens.textContent)
//           ) {
//             year1topTens.style.color = "red";
//             year2topTens.style.color = "green";
//           } else {
//             year1topTens.style.color = "black";
//             year2topTens.style.color = "black";
//           }

//           if (
//             parseFloat(year1Events.textContent) >
//             parseFloat(year2Events.textContent)
//           ) {
//             year1Events.style.color = "green";
//             year2Events.style.color = "red";
//           } else if (
//             parseFloat(year1Events.textContent) <
//             parseFloat(year2Events.textContent)
//           ) {
//             year1Events.style.color = "red";
//             year2Events.style.color = "green";
//           } else {
//             year1Events.style.color = "black";
//             year2Events.style.color = "black";
//           }

//           if (
//             parseFloat(year1Strokes.textContent) >
//             parseFloat(year2Strokes.textContent)
//           ) {
//             year1Strokes.style.color = "green";
//             year2Strokes.style.color = "red";
//           } else if (
//             parseFloat(year1Strokes.textContent) <
//             parseFloat(year2Strokes.textContent)
//           ) {
//             year1Strokes.style.color = "red";
//             year2Strokes.style.color = "green";
//           } else {
//             year1Strokes.style.color = "black";
//             year2Strokes.style.color = "black";
//           }

//           if (
//             parseFloat(year1Place.textContent) >
//             parseFloat(year2Place.textContent)
//           ) {
//             year1Place.style.color = "green";
//             year2Place.style.color = "red";
//           } else if (
//             parseFloat(year1Place.textContent) <
//             parseFloat(year2Place.textContent)
//           ) {
//             year1Place.style.color = "red";
//             year2Place.style.color = "green";
//           } else {
//             year1Place.style.color = "black";
//             year2Place.style.color = "black";
//           }

//           if (
//             parseFloat(year1Fwh.textContent) > parseFloat(year2Fwh.textContent)
//           ) {
//             year1Fwh.style.color = "green";
//             year2Fwh.style.color = "red";
//           } else if (
//             parseFloat(year1Fwh.textContent) < parseFloat(year2Fwh.textContent)
//           ) {
//             year1Fwh.style.color = "red";
//             year2Fwh.style.color = "green";
//           } else {
//             year1Fwh.style.color = "black";
//             year2Fwh.style.color = "black";
//           }

//           if (
//             parseFloat(year1C2r.textContent) > parseFloat(year2C2r.textContent)
//           ) {
//             year1C2r.style.color = "green";
//             year2C2r.style.color = "red";
//           } else if (
//             parseFloat(year1C2r.textContent) < parseFloat(year2C2r.textContent)
//           ) {
//             year1C2r.style.color = "red";
//             year2C2r.style.color = "green";
//           } else {
//             year1C2r.style.color = "black";
//             year2C2r.style.color = "black";
//           }

//           if (
//             parseFloat(year1C1x.textContent) > parseFloat(year2C1x.textContent)
//           ) {
//             year1C1x.style.color = "green";
//             year2C1x.style.color = "red";
//           } else if (
//             parseFloat(year1C1x.textContent) < parseFloat(year2C1x.textContent)
//           ) {
//             year1C1x.style.color = "red";
//             year2C1x.style.color = "green";
//           } else {
//             year1C1x.style.color = "black";
//             year2C1x.style.color = "black";
//           }
//         }
//       });

//       let year2Rating = document.getElementById("year2_rating");
//       let year2Earnings = document.getElementById("year2_earnings");
//       let year2Wins = document.getElementById("year2_wins");
//       let year2Podiums = document.getElementById("year2_podiums");
//       let year2topTens = document.getElementById("year2_topTens");
//       let year2Events = document.getElementById("year2_events");
//       let year2Strokes = document.getElementById("year2_strokes");
//       let year2Place = document.getElementById("year2_place");
//       let year2Fwh = document.getElementById("year2_fwh");
//       let year2C2r = document.getElementById("year2_c2r");
//       let year2C1x = document.getElementById("year2_c1x");

//       year2Selector.addEventListener("change", async (e) => {
//         year2Rating.innerHTML = "";
//         year2Earnings.innerHTML = "";
//         year2Wins.innerHTML = "";
//         year2Podiums.innerHTML = "";
//         year2topTens.innerHTML = "";
//         year2Events.innerHTML = "";
//         year2Strokes.innerHTML = "";
//         year2Place.innerHTML = "";
//         year2Fwh.innerHTML = "";
//         year2C2r.innerHTML = "";
//         year2C1x.innerHTML = "";

//         let url2 = e.target.value
//           ? getYearQuickCompare + "&year=" + e.target.value
//           : "";

//         let yearQuickData2 = await getJsons(url2);

//         year2Rating.innerHTML = yearQuickData2.player.avg_rating;
//         year2Earnings.innerHTML = yearQuickData2.player.earnings;
//         year2Wins.innerHTML = yearQuickData2.player.wins;
//         year2Podiums.innerHTML = yearQuickData2.player.podiums;
//         year2topTens.innerHTML = yearQuickData2.player.top_tens;
//         year2Events.innerHTML = yearQuickData2.player.total_events;
//         year2Strokes.innerHTML = yearQuickData2.player.avg_strokes_per_event;
//         year2Place.innerHTML = yearQuickData2.player.avg_place;
//         year2Fwh.innerHTML = yearQuickData2.main3[0].avg_percentage;
//         year2C2r.innerHTML = yearQuickData2.main3[1].avg_percentage;
//         year2C1x.innerHTML = yearQuickData2.main3[2].avg_percentage;

//         //if (year1Selector.value && year2Selector.value){
//         // year2Rating.innerHTML +=
//         //   parseFloat(year2Rating.textContent) - parseFloat(year1Rating.textContent) < 0
//         //   ? `<p style="color: red; font-size: 12px; text-align: right;">${parseFloat(year2Rating.textContent) - parseFloat(year1Rating.textContent)}</p>`
//         //   : parseFloat(year2Rating.textContent) - parseFloat(year1Rating.textContent) > 0
//         //   ? `<p style="color: green;">+${parseFloat(year2Rating.textContent) - parseFloat(year1Rating.textContent)}</p>`
//         //   : ''

//         // year2Earnings.innerHTML +=
//         //   parseFloat(year2Earnings.textContent) - parseFloat(year1Earnings.textContent) < 0
//         //   ? `<p style="color: red; font-size: 12px; text-align: right;">${parseFloat(year2Rating.textContent) - parseFloat(year1Rating.textContent)}</p>`
//         //   : parseFloat(year2Earnings.textContent) - parseFloat(year1Earnings.textContent) > 0
//         //   ? `<p style="color: green;">+${parseFloat(year2Earnings.textContent) - parseFloat(year1Earnings.textContent)}</p>`
//         //   : ''
//         //}

//         if (year1Rating.textContent && year2Rating.textContent) {
//           if (
//             parseFloat(year1Rating.textContent) >
//             parseFloat(year2Rating.textContent)
//           ) {
//             year1Rating.style.color = "green";
//             year2Rating.style.color = "red";
//           } else if (
//             parseFloat(year1Rating.textContent) <
//             parseFloat(year2Rating.textContent)
//           ) {
//             year1Rating.style.color = "red";
//             year2Rating.style.color = "green";
//           } else {
//             year1Rating.style.color = "black";
//             year2Rating.style.color = "black";
//           }

//           if (
//             parseFloat(year1Earnings.textContent) >
//             parseFloat(year2Earnings.textContent)
//           ) {
//             year1Earnings.style.color = "green";
//             year2Earnings.style.color = "red";
//           } else if (
//             parseFloat(year1Earnings.textContent) <
//             parseFloat(year2Earnings.textContent)
//           ) {
//             year1Earnings.style.color = "red";
//             year2Earnings.style.color = "green";
//           } else {
//             year1Earnings.style.color = "black";
//             year2Earnings.style.color = "black";
//           }

//           if (
//             parseFloat(year1Wins.textContent) >
//             parseFloat(year2Wins.textContent)
//           ) {
//             year1Wins.style.color = "green";
//             year2Wins.style.color = "red";
//           } else if (
//             parseFloat(year1Wins.textContent) <
//             parseFloat(year2Wins.textContent)
//           ) {
//             year1Wins.style.color = "red";
//             year2Wins.style.color = "green";
//           } else {
//             year1Wins.style.color = "black";
//             year2Wins.style.color = "black";
//           }

//           if (
//             parseFloat(year1Podiums.textContent) >
//             parseFloat(year2Podiums.textContent)
//           ) {
//             year1Podiums.style.color = "green";
//             year2Podiums.style.color = "red";
//           } else if (
//             parseFloat(year1Podiums.textContent) <
//             parseFloat(year2Podiums.textContent)
//           ) {
//             year1Podiums.style.color = "red";
//             year2Podiums.style.color = "green";
//           } else {
//             year1Podiums.style.color = "black";
//             year2Podiums.style.color = "black";
//           }

//           if (
//             parseFloat(year1topTens.textContent) >
//             parseFloat(year2topTens.textContent)
//           ) {
//             year1topTens.style.color = "green";
//             year2topTens.style.color = "red";
//           } else if (
//             parseFloat(year1topTens.textContent) <
//             parseFloat(year2topTens.textContent)
//           ) {
//             year1topTens.style.color = "red";
//             year2topTens.style.color = "green";
//           } else {
//             year1topTens.style.color = "black";
//             year2topTens.style.color = "black";
//           }

//           if (
//             parseFloat(year1Events.textContent) >
//             parseFloat(year2Events.textContent)
//           ) {
//             year1Events.style.color = "green";
//             year2Events.style.color = "red";
//           } else if (
//             parseFloat(year1Events.textContent) <
//             parseFloat(year2Events.textContent)
//           ) {
//             year1Events.style.color = "red";
//             year2Events.style.color = "green";
//           } else {
//             year1Events.style.color = "black";
//             year2Events.style.color = "black";
//           }

//           if (
//             parseFloat(year1Strokes.textContent) >
//             parseFloat(year2Strokes.textContent)
//           ) {
//             year1Strokes.style.color = "green";
//             year2Strokes.style.color = "red";
//           } else if (
//             parseFloat(year1Strokes.textContent) <
//             parseFloat(year2Strokes.textContent)
//           ) {
//             year1Strokes.style.color = "red";
//             year2Strokes.style.color = "green";
//           } else {
//             year1Strokes.style.color = "black";
//             year2Strokes.style.color = "black";
//           }

//           if (
//             parseFloat(year1Place.textContent) >
//             parseFloat(year2Place.textContent)
//           ) {
//             year1Place.style.color = "green";
//             year2Place.style.color = "red";
//           } else if (
//             parseFloat(year1Place.textContent) <
//             parseFloat(year2Place.textContent)
//           ) {
//             year1Place.style.color = "red";
//             year2Place.style.color = "green";
//           } else {
//             year1Place.style.color = "black";
//             year2Place.style.color = "black";
//           }

//           if (
//             parseFloat(year1Fwh.textContent) > parseFloat(year2Fwh.textContent)
//           ) {
//             year1Fwh.style.color = "green";
//             year2Fwh.style.color = "red";
//           } else if (
//             parseFloat(year1Fwh.textContent) < parseFloat(year2Fwh.textContent)
//           ) {
//             year1Fwh.style.color = "red";
//             year2Fwh.style.color = "green";
//           } else {
//             year1Fwh.style.color = "black";
//             year2Fwh.style.color = "black";
//           }


//           if (
//             parseFloat(year1C2r.textContent) > parseFloat(year2C2r.textContent)
//           ) {
//             year1C2r.style.color = "green";
//             year2C2r.style.color = "red";
//           } else if (
//             parseFloat(year1C2r.textContent) < parseFloat(year2C2r.textContent)
//           ) {
//             year1C2r.style.color = "red";
//             year2C2r.style.color = "green";
//           } else {
//             year1C2r.style.color = "black";
//             year2C2r.style.color = "black";
//           }

//           if (
//             parseFloat(year1C1x.textContent) > parseFloat(year2C1x.textContent)
//           ) {
//             year1C1x.style.color = "green";
//             year2C1x.style.color = "red";
//           } else if (
//             parseFloat(year1C1x.textContent) < parseFloat(year2C1x.textContent)
//           ) {
//             year1C1x.style.color = "red";
//             year2C1x.style.color = "green";
//           } else {
//             year1C1x.style.color = "black";
//             year2C1x.style.color = "black";
//           }
//         }
//       });

//       // if (parseFloat(year1Earnings) > parseFloat(year2Earnings)){
//       //   year1Earnings.style.color = 'green';
//       //   year2Earnings.style.color = 'red';
//       // } else if (parseFloat(year1Earnings) < parseFloat(year2Earnings)){
//       //   year1Earnings.style.color = 'red';
//       //   year2Earnings.style.color = 'green';
//       // }
//     } else {
//       resultsDisplayMainContainer.style.display = "none";
//     }
//   });
// }

// displayQuickCompareResults();


async function loadAISummary(message) {
  const res = await fetch("http://localhost:4000/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: message}),
  });
  const { summary } = await res.json();
  return summary;
}


let ai_context = ''

async function loadAIContext(){
  let ai_getPlayerInfo = await getJsons(playerBioUrl);
  let ai_getRecentEvent = await getJsons(getMostRecentResults);
  let ai_getTopThree = await getJsons(getTopThree);
  let ai_getPerformanceMetrics = await getJsons(playerRadialUrl);
  let ai_getStatInfo = await getJsons(statIdsList);

  ai_playerInfoContext = `
    Current disc golf player the user is examining is ${ai_getPlayerInfo.player.full_name}. The player's PDGA number is ${ai_getPlayerInfo.player.pdga_number}.
    In the 'Career Profile' section of the current webpage, ${ai_getPlayerInfo.player.full_name} is in the ${ai_getPlayerInfo.player.division} division, they live in ${ai_getPlayerInfo.player.hometown}, their nationality is '${ai_getPlayerInfo.player.nationality}'.
    They have been a member of the PDGA since ${ai_getPlayerInfo.player.member_since},
    They have ${ai_getPlayerInfo.player.wins} wins, ${ai_getPlayerInfo.player.top_tens} top tens, 
    ${ai_getPlayerInfo.player.podiums} podiums, have $${ai_getPlayerInfo.player.earnings} in earnings,
    average rating of ${ai_getPlayerInfo.player.avg_rating}, attended ${ai_getPlayerInfo.player.total_events} events,
    have an average place of ${ai_getPlayerInfo.player.avg_place} in all of their events, and have an average of ${ai_getPlayerInfo.player.avg_strokes_per_event} events.

    Located in 'Performance' section of the webpage, contains ${ai_getPlayerInfo.player.full_name}'s metrics for Fairway Hits (FWH), Circle 2 in Regulation (C2R), and C1X Putting (C1X).
      - Their values for Fairway Hits (FWH) is ${ai_getPerformanceMetrics.values[0]}%
      - Their values for Circle 2 in Regulation (C2R) is ${ai_getPerformanceMetrics.values[1]}%
      - Their values for C1X Putting (C1X) is ${ai_getPerformanceMetrics.values[2]}%

    Located in 'Most Recent Event' section of the webpage, ${ai_getPlayerInfo.player.full_name}'s most recent event is the '${ai_getRecentEvent.event.event_name}'. The event is located in ${ai_getRecentEvent.event.event_location} and started on the date of ${ai_getRecentEvent.event.event_start_date}.
    ${ai_getPlayerInfo.player.full_name}'s rating from the event is ${ai_getRecentEvent.event.event_rating}, and their score is ${ai_getRecentEvent.event.event_score}.
    They placed in '${ai_getRecentEvent.event.place}' place in the event. 

    Located in 'Top 3 Metrics (last 12 months)' section of the webpage, ${ai_getPlayerInfo.player.full_name}'s overall top three career metrics are:
      - '${ai_getTopThree.top3[1].stat_name}' (with a value of ${ai_getTopThree.top3[1].player_average_value}% and this stat ranking in '${ai_getTopThree.top3[1].rank_in_division}' place in their division).
      - '${ai_getTopThree.top3[2].stat_name}' (with a value of ${ai_getTopThree.top3[2].player_average_value}% and this stat ranking in '${ai_getTopThree.top3[2].rank_in_division}' place in their division).
      - '${ai_getTopThree.top3[3].stat_name}' (with a value of ${ai_getTopThree.top3[3].player_average_value}% and this stat ranking in '${ai_getTopThree.top3[3].rank_in_division}' place in their division).
    
    Here's some context about what each performance metric abbreviations mean:
      - "${ai_getStatInfo.name[0]}" is "${ai_getStatInfo.fullName[0]}" and it means "${ai_getStatInfo.desc[0]}".
      - "${ai_getStatInfo.name[1]}" is "${ai_getStatInfo.fullName[1]}" and it means "${ai_getStatInfo.desc[1]}".
      - "${ai_getStatInfo.name[2]}" is "${ai_getStatInfo.fullName[2]}" and it means "${ai_getStatInfo.desc[2]}".
      - "${ai_getStatInfo.name[3]}" is "${ai_getStatInfo.fullName[3]}" and it means "${ai_getStatInfo.desc[3]}".
      - "${ai_getStatInfo.name[4]}" is "${ai_getStatInfo.fullName[4]}" and it means "${ai_getStatInfo.desc[4]}".
      - "${ai_getStatInfo.name[5]}" is "${ai_getStatInfo.fullName[5]}" and it means "${ai_getStatInfo.desc[5]}".
      - "${ai_getStatInfo.name[6]}" is "${ai_getStatInfo.fullName[6]}" and it means "${ai_getStatInfo.desc[6]}".
      - "${ai_getStatInfo.name[7]}" is "${ai_getStatInfo.fullName[7]}" and it means "${ai_getStatInfo.desc[7]}".
      - "${ai_getStatInfo.name[8]}" is "${ai_getStatInfo.fullName[8]}" and it means "${ai_getStatInfo.desc[8]}".
      - "${ai_getStatInfo.name[9]}" is "${ai_getStatInfo.fullName[9]}" and it means "${ai_getStatInfo.desc[9]}".
      - "${ai_getStatInfo.name[10]}" is "${ai_getStatInfo.fullName[10]}" and it means "${ai_getStatInfo.desc[10]}".
      - "${ai_getStatInfo.name[11]}" is "${ai_getStatInfo.fullName[11]}" and it means "${ai_getStatInfo.desc[11]}".
      - "${ai_getStatInfo.name[12]}" is "${ai_getStatInfo.fullName[12]}" and it means "${ai_getStatInfo.desc[12]}".
      - "${ai_getStatInfo.name[13]}" is "${ai_getStatInfo.fullName[13]}" and it means "${ai_getStatInfo.desc[13]}".
      - "${ai_getStatInfo.name[14]}" is "${ai_getStatInfo.fullName[14]}" and it means "${ai_getStatInfo.desc[14]}".
      - "${ai_getStatInfo.name[15]}" is "${ai_getStatInfo.fullName[15]}" and it means "${ai_getStatInfo.desc[15]}".
      - "${ai_getStatInfo.name[16]}" is "${ai_getStatInfo.fullName[16]}" and it means "${ai_getStatInfo.desc[16]}".
      - "${ai_getStatInfo.name[17]}" is "${ai_getStatInfo.fullName[17]}" and it means "${ai_getStatInfo.desc[17]}".

  `
  ai_context += ai_playerInfoContext;
  
  console.log(ai_context);


  const res = await fetch("http://localhost:4000/ai-context", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({context: ai_context})
  })
}

loadAIContext();

document.getElementById('send_chat_message').addEventListener('click', async() => {
  let userMessageInput = document.getElementById('chat_user_message');
  let userMessage = userMessageInput.value.trim();

  if (userMessage == ''){
    return;
  }

  let reqBiggerContainer = document.createElement('div');
  reqBiggerContainer.className = 'user_response_biggerBox';
  let reqContainer = document.createElement('div');
  reqContainer.textContent = userMessage;
  reqContainer.className = 'user_response_box';
  reqBiggerContainer.append(reqContainer);
  document.getElementById('ai_summary').appendChild(reqBiggerContainer);
  userMessageInput.value = '';
  document.getElementById('ai_summary').scrollTop = document.getElementById('ai_summary').scrollHeight;
    
    
  let aiResponse = await loadAISummary(userMessage);
  let resBiggerContainer = document.createElement('div');
  resBiggerContainer.className = 'ai_response_biggerBox';
  let resContainer = document.createElement('div');
  resContainer.textContent = aiResponse;
  resContainer.className = 'ai_response_box';
  resBiggerContainer.append(resContainer);
  document.getElementById('ai_summary').appendChild(resBiggerContainer);
  document.getElementById('ai_summary').scrollTop = document.getElementById('ai_summary').scrollHeight;
})

document.getElementById('chat_user_message').addEventListener('keypress', async(e) => {
  if (e.key == 'Enter'){
    let userMessageInput = document.getElementById('chat_user_message');
    let userMessage = userMessageInput.value.trim();

    if (userMessage == ''){
      return;
    }

    let reqBiggerContainer = document.createElement('div');
    reqBiggerContainer.className = 'user_response_biggerBox';
    let reqContainer = document.createElement('div');
    // let reqTextBox = document.createElement('p');
    // reqTextBox.textContent = userMessage;
    reqContainer.textContent = userMessage;
    reqContainer.className = 'user_response_box';
    // reqContainer.append(reqTextBox);
    reqBiggerContainer.append(reqContainer);
    document.getElementById('ai_summary').appendChild(reqBiggerContainer);
    userMessageInput.value = '';
    document.getElementById('ai_summary').scrollTop = document.getElementById('ai_summary').scrollHeight;
    
    
    let aiResponse = await loadAISummary(userMessage);
    let resBiggerContainer = document.createElement('div');
    resBiggerContainer.className = 'ai_response_biggerBox';
    let resContainer = document.createElement('div');
    // let resTextBox = document.createElement('p');
    // resTextBox.textContent = aiResponse;
    // resContainer.append(resTextBox);
    resContainer.textContent = aiResponse;
    resContainer.className = 'ai_response_box';
    resBiggerContainer.append(resContainer);
    document.getElementById('ai_summary').appendChild(resBiggerContainer);
    document.getElementById('ai_summary').scrollTop = document.getElementById('ai_summary').scrollHeight;
  } 
})