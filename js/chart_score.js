document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('scoreChart');
    let chart;

    function loadChart(division = 'MPO') {
        fetch(`php/fetch_score.php?division=${division}`)
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
                            legend: {
                                display: false
                            },
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
            .catch(error => console.error('Error loading data:', error));
    }

    loadChart();

    document.getElementById('divisionSelect').addEventListener('change', function () {
        loadChart(this.value);
    });
});