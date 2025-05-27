document.addEventListener("DOMContentLoaded", () => {
    const playerSelect = document.getElementById('playerSelect');
    const chartCtx = document.getElementById('playerChart');
    let playerChart;

    fetch("php/fetch_players.php")
        .then(res => res.json())
        .then(players => {
            players.forEach(p => {
                const opt = document.createElement("option");
                opt.value = p.pdga_number;
                opt.textContent = p.player_name;
                playerSelect.appendChild(opt);
            });
        });

    playerSelect.addEventListener("change", () => {
        const pdga = playerSelect.value;
        if (!pdga) return;

        fetch(`php/fetch_player_stats.php?pdga=${pdga}`)
            .then(res => res.json())
            .then(stats => {
                const labels = ['FWH', 'C2P', 'BRD-', 'SCR', 'C1X'];
                const data = [
                    parseFloat(stats.FWH),
                    parseFloat(stats.C2P),
                    parseFloat(stats.BRD),
                    parseFloat(stats.SCR),
                    parseFloat(stats.C1X)
                ];

                if (playerChart) playerChart.destroy();

                playerChart = new Chart(chartCtx, {
                    type: 'radar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: "Player Stats",
                            data: data,
                            backgroundColor: "rgba(255,99,132,0.2)",
                            borderColor: "rgba(255,99,132,1)"
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            r: {
                                min: 0,
                                max: 100
                            }
                        }
                    }
                });
            });
    });
});