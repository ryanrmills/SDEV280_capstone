$(document).ready(function () {
  $("#player_table").DataTable({
    ajax: {
      url: "../api/get_players.php", // Adjust path as needed
      dataSrc: "data"
    },
    columns: [
      { data: "pdga_number" },
      {
        data: "full_name",
        render: function (data, type, row) {
          return `<a target="_blank" href="./../index.php?pdga_number=${row.pdga_number}">${data}</a>`;
        },
      },
      { data: "division" },
      { data: "city" },
      { data: "state" },
      { data: "country" },
      { data: "nationality" },
      { data: "member_since" },
    ],
    pageLength: 25,
  });
});

// Chart 1: Score Chart
const ctx = document.getElementById('scoreChart');
let chart;

function loadScoreChart(division = 'MPO') {
  fetch(`../api/fetch_score.php?division=${division}`)
    .then(response => response.json())
    .then(data => {
      const labels = data.map(item => item.player_name);
      const scores = data.map(item => item.total_score);

      if (chart) chart.destroy();

      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: `Total Score (${division})`,
            data: scores,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderRadius: 10,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Total Score'
              }
            },
            x: {
              ticks: {
                maxRotation: 90,
                minRotation: 45
              }
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `Score: ${context.raw}`;
                }
              }
            }
          }
        }
      });
    })
    .catch(error => console.error('Error loading chart data:', error));
}

document.addEventListener("DOMContentLoaded", () => {
  loadScoreChart();

  const select = document.getElementById('divisionSelect');
  if (select) {
    select.addEventListener('change', function () {
      loadScoreChart(this.value);
    });
  }
});


// Chart 2: Longest Throw Chart
const longestCtx = document.getElementById('longestThrowChart');

fetch('../api/fetch_longest_throws.php')
  .then(res => res.json())
  .then(data => {
    const labels = data.map(d => d.player_name);
    const throws = data.map(d => parseFloat(d.longest_throw));

    new Chart(longestCtx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Longest Throw (feet)',
          data: throws,
          backgroundColor: 'rgba(0, 123, 255, 0.6)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            // text: 'Top 10 Longest Throws by Players',
            font: { size: 18 }
          },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.raw} ft`
            }
          },
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Distance (ft)'
            }
          }
        }
      }
    });
  });