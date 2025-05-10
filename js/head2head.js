const urlParams = new URLSearchParams(window.location.search);
const pdgaNumOne = urlParams.get("pdga_number1");
const pdgaNumTwo = urlParams.get("pdga_number2");

const playerBioUrl = `http://localhost/sdev280capstone/api/get_player_info.php`;

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
  avgStrokesPerEventElement
){
  let url = pdgaNum
    ? playerBioUrl + `?pdga_number=${pdgaNum}`
    : playerBioUrl;

  const data = await getJsons(url);

  let earnings = parseFloat(data.player.earnings).toLocaleString('en-US')

  document.getElementById(picElement).src = `./../assets/${data.player.pdga_number}.jpg`;
  document.getElementById(nameElement).innerHTML = data.player.full_name;
  document.getElementById(homeElement).innerHTML = data.player.hometown;
  document.getElementById(pdgaNumElement).innerHTML = `#${data.player.pdga_number}`;
  document.getElementById(divElement).innerHTML = data.player.division;
  document.getElementById(memberElement).innerHTML = data.player.hometown;
  document.getElementById(winsElement).innerHTML = data.player.wins;
  document.getElementById(tensElement).innerHTML = data.player.top_tens;
  document.getElementById(podiumsElement).innerHTML = data.player.podiums;
  document.getElementById(earningsElement).innerHTML = `$${earnings}`
  document.getElementById(avgRateElement).innerHTML = data.player.avg_rating;
  document.getElementById(totalEventsElement).innerHTML = data.player.total_events;
  document.getElementById(avgPlaceElement).innerHTML = data.player.avg_place;
  document.getElementById(avgStrokesPerEventElement).innerHTML = data.player.avg_strokes_per_event;
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
  "playerone_strokes"
)

displayPlayerBio(
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