document.addEventListener("DOMContentLoaded", () => {
    const playerSelect = document.getElementById('playerSelect');
    const ctx = document.getElementById('trendChart');
    let trendChart;

    playerSelect.addEventListener("change", () => {
        const pdga = playerSelect.value;
        if (!pdga) return;

        fetch(`php/fetch_player_trend.php?pdga=${pdga}`)
            .then(res => res.json())
            .then(data => {
                if (!data || data.length === 0) {
                    console.warn("No trend data found.");
                    return;
                }

                const labels = data.map(d => `${d.event_name} (${d.start_date}) - R${d.round}`);

                const fwh = data.map(d => parseFloat(d.FWH));
                const c2p = data.map(d => parseFloat(d.C2P));
                const scr = data.map(d => parseFloat(d.SCR));

                if (trendChart) trendChart.destroy();

                trendChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'FWH',
                                data: fwh,
                                borderColor: '#668a65',
                                tension: 0.4,
                                fill: false,
                                pointRadius: 4
                            },
                            {
                                label: 'C2P',
                                data: c2p,
                                borderColor: '#dc3545',
                                tension: 0.4,
                                fill: false,
                                pointRadius: 4
                            },
                            {
                                label: 'SCR',
                                data: scr,
                                borderColor: '#007bff',
                                tension: 0.4,
                                fill: false,
                                pointRadius: 4
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Player Performance Trend Over Time',
                                font: { size: 18 }
                            },
                            tooltip: {
                                callbacks: {
                                    title: (ctx) => {
                                        const d = data[ctx[0].dataIndex];
                                        return `${d.event_name} - Round ${d.round} (${d.start_date})`;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    display: false,
                                },
                                title: {
                                    display: true,
                                    text: 'Events and Rounds'
                                }
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Stat Value (%)'
                                }
                            }
                        }
                    }
                });
            });
    });
});