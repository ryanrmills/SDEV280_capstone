document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('topEarnerChart');

    fetch('php/fetch_top_earners.php')
        .then(res => res.json())
        .then(data => {
            const labels = data.map(d => d.player_name);
            const cash = data.map(d => parseFloat(d.total_cash));

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total Career Earnings ($)',
                        data: cash,
                        backgroundColor: 'rgba(255, 193, 7, 0.7)',
                        borderColor: 'rgba(255, 193, 7, 1)',
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
                            text: 'Top 10 Highest-Earning Players',
                            font: { size: 18 }
                        },
                        tooltip: {
                            callbacks: {
                                label: ctx => `$${ctx.raw.toLocaleString()}`
                            }
                        },
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Earnings ($)'
                            },
                            ticks: {
                                callback: value => `$${value.toLocaleString()}`
                            }
                        }
                    }
                }
            });
        });
});