const years = [2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035];
const forestCover = [12480,11850,11230,10780,10320,9870,9420,8990,8580,8190,7820,7470,7140,6830,6540];

new Chart(document.getElementById('mainChart'), {
    type: 'line',
    data: {
        labels: years,
        datasets: [{
            label: 'Luas Tutupan Hutan (Hektar)',
            data: forestCover,
            borderColor: '#f87171',
            backgroundColor: 'rgba(248, 113, 113, 0.15)',
            tension: 0.4,
            borderWidth: 4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Tren Deforestasi Yogyakarta 2021 - 2035',
                color: '#e2e8f0',
                font: { size: 18 }
            }
        }
    }
});