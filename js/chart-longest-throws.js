document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('longestThrowChart');

    fetch('php/fetch_longest_throws.php')
        .then(res => res.json())
        .then(data => {
            const labels = data.map(d => d.player_name);
            const throws = data.map(d => parseFloat(d.longest_throw));

            new Chart(ctx, {
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
                            text: 'Top 10 Longest Throws by Players',
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
});