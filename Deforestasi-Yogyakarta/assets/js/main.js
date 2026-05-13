// SPLASH SCREEN + MANUAL BUTTON
window.onload = function() {
    const splash = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    const enterBtn = document.getElementById('enterBtn');

    enterBtn.addEventListener('click', function() {
        splash.style.opacity = "0";
        
        setTimeout(() => {
            splash.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            // Inisialisasi Map dan Chart
            initMap();
            renderKabupaten();
        }, 800);
    });
};

// ... (sisanya kode kabupaten, map, dan chart tetap sama seperti sebelumnya)
// // ==================== DATA KABUPATEN ====================
const kabupatenData = [
    { 
        name: "Kab. Sleman", 
        y2021: 4280, y2026: 3650, loss: 630, 
        lat: -7.7162, lng: 110.3289, 
        color: "#f87171", popup: "Kehilangan terbesar kedua" 
    },
    { 
        name: "Kab. Gunungkidul", 
        y2021: 3850, y2026: 3120, loss: 730, 
        lat: -8.0000, lng: 110.6333, 
        color: "#ef4444", popup: "Kehilangan tertinggi" 
    },
    { 
        name: "Kab. Bantul", 
        y2021: 2150, y2026: 1680, loss: 470, 
        lat: -7.8833, lng: 110.3667, 
        color: "#fb923c", popup: "" 
    },
    { 
        name: "Kab. Kulon Progo", 
        y2021: 1680, y2026: 1420, loss: 260, 
        lat: -7.7833, lng: 110.0167, 
        color: "#fbbf24", popup: "" 
    },
    { 
        name: "Kota Yogyakarta", 
        y2021: 520, y2026: 400, loss: 120, 
        lat: -7.8014, lng: 110.3644, 
        color: "#facc15", popup: "Wilayah Urban" 
    }
];

// ==================== INIT MAP ====================
function initMap() {
    const map = L.map('map').setView([-7.85, 110.35], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    kabupatenData.forEach(kab => {
        const radius = 8000 + (kab.loss * 15); // ukuran lingkaran berdasarkan loss

        L.circle([kab.lat, kab.lng], {
            color: kab.color,
            fillColor: kab.color,
            fillOpacity: 0.4,
            radius: radius
        }).addTo(map)
        .bindPopup(`
            <b>${kab.name}</b><br>
            2021: ${kab.y2021.toLocaleString()} Ha<br>
            2026: ${kab.y2026.toLocaleString()} Ha<br>
            <span style="color:red">Hilang: ${kab.loss} Ha (${((kab.loss/kab.y2021)*100).toFixed(1)}%)</span>
        `);
    });
}

// ==================== RENDER KABUPATEN CARDS ====================
function renderKabupaten() {
    const container = document.getElementById('kabupatenGrid');
    container.innerHTML = '';

    kabupatenData.forEach(kab => {
        const percent = ((kab.loss / kab.y2021) * 100).toFixed(1);
        const card = document.createElement('div');
        card.className = 'kab-card';
        card.innerHTML = `
            <div class="kab-name">${kab.name}</div>
            <p>2021: <strong>${kab.y2021.toLocaleString()} Ha</strong></p>
            <p>2026: <strong>${kab.y2026.toLocaleString()} Ha</strong></p>
            <p class="loss-text">Hilang: ${kab.loss} Ha (${percent}%)</p>
        `;
        container.appendChild(card);
    });
}

// ==================== MAIN CHART ====================
const years = [2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035];
const forestData = [12480,11850,11230,10780,10320,9870,9420,8990,8580,8190,7820,7470,7140,6830,6540];

new Chart(document.getElementById('mainChart'), {
    type: 'line',
    data: {
        labels: years,
        datasets: [{
            label: 'Luas Tutupan Hutan (Hektar)',
            data: forestData,
            borderColor: '#f87171',
            backgroundColor: 'rgba(248, 113, 113, 0.2)',
            tension: 0.4,
            borderWidth: 5
        }]
    },
    options: { responsive: true }
});

// ==================== INIT ALL ====================
initMap();
renderKabupaten();