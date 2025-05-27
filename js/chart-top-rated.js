document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('topRatedChart');
    fetch('php/fetch_top_rated.php')
        .then(res => res.json())
        .then(data => {
            const labels = data.map(d => d.player_name);
            const ratings = data.map(d => d.avg_rating);

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Avg Rating (Last 12 Months)',
                        data: ratings,
                        backgroundColor: 'rgba(40, 167, 69, 0.6)',
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Top 10 Highest Rated Players (Last 12 Months)'
                        },
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Average Rating'
                            }
                        }
                    }
                }
            });
        });
});