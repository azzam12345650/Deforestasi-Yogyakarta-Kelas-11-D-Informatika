// ==================== SPLASH SCREEN ====================
window.onload = function() {
    const splash = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    const enterBtn = document.getElementById('enterBtn');

    enterBtn.addEventListener('click', function() {
        splash.style.opacity = "0";
        
        setTimeout(() => {
            splash.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            // Tunggu sedikit agar map container ter-render sempurna
            setTimeout(() => {
                initMap();
                renderKabupaten();
            }, 300);
        }, 800);
    });
};

// ==================== INIT MAP (SUDAH DIPERBAIKI) ====================
let mapInstance = null;

function initMap() {
    if (mapInstance) return; // cegah double init

    mapInstance = L.map('map', {
        zoomControl: true,
        scrollWheelZoom: true
    }).setView([-7.85, 110.35], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstance);

    // Data Kabupaten
    const kabupatenData = [
        { name: "Kab. Sleman", lat: -7.7162, lng: 110.3289, loss: 630, color: "#ef4444" },
        { name: "Kab. Gunungkidul", lat: -8.0000, lng: 110.6333, loss: 730, color: "#f87171" },
        { name: "Kab. Bantul", lat: -7.8833, lng: 110.3667, loss: 470, color: "#fb923c" },
        { name: "Kab. Kulon Progo", lat: -7.7833, lng: 110.0167, loss: 260, color: "#fbbf24" },
        { name: "Kota Yogyakarta", lat: -7.8014, lng: 110.3644, loss: 120, color: "#facc15" }
    ];

    kabupatenData.forEach(kab => {
        const radius = 7000 + (kab.loss * 18);

        L.circle([kab.lat, kab.lng], {
            color: kab.color,
            fillColor: kab.color,
            fillOpacity: 0.35,
            radius: radius,
            weight: 2
        }).addTo(mapInstance)
        .bindPopup(`<b>${kab.name}</b><br>Hilang: <b>${kab.loss} Ha</b>`);
    });

    // Fix map yang tidak full
    setTimeout(() => {
        if (mapInstance) mapInstance.invalidateSize();
    }, 500);
}

// ==================== RENDER KABUPATEN CARDS ====================
function renderKabupaten() {
    const container = document.getElementById('kabupatenGrid');
    // ... (kode render kabupaten tetap sama seperti sebelumnya)
    // (bisa copy dari respons sebelumnya)
}

// Main Chart (tetap sama)
const years = [2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035];
const forestData = [12480,11850,11230,10780,10320,9870,9420,8990,8580,8190,7820,7470,7140,6830,6540];

new Chart(document.getElementById('mainChart'), {
    type: 'line',
    data: { labels: years, datasets: [{ label: 'Luas Hutan (Ha)', data: forestData, borderColor: '#f87171', tension: 0.4, borderWidth: 5 }] },
    options: { responsive: true }
});
