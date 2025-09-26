/* ================== assets/js/script.js ================== */

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-solid');
        } else {
            navbar.classList.remove('navbar-solid');
        }
    });
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
function revealOnScroll() {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Burger menu
const burger = document.getElementById("burger");
const navMenu = document.getElementById("nav-menu");
if (burger && navMenu) {
    burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// Dropdown di mobile
const dropdownToggle = document.querySelector(".dropdown > a");
if (dropdownToggle) {
    dropdownToggle.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdownToggle.parentElement.classList.toggle("active");
        }
    });
}

// Mission slider
const slides = document.querySelectorAll(".mission-slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
function showSlide(newIndex, direction) {
    if (!slides.length) return;
    const currentSlide = slides[currentIndex];
    const nextSlide = slides[newIndex];

    slides.forEach(slide => slide.classList.remove("active", "exit-left", "exit-right"));

    if (direction === "next") currentSlide.classList.add("exit-left");
    if (direction === "prev") currentSlide.classList.add("exit-right");

    nextSlide.classList.add("active");
    currentIndex = newIndex;
}
if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
        let nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex, "next");
    });
    prevBtn.addEventListener("click", () => {
        let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex, "prev");
    });
}

// ================== MAP ==================
const mapContainer = document.getElementById("map");
if (mapContainer) {
    const map = L.map('map').setView([0.7893, 113.9213], 5); // Indonesia center

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Data Projects
    const projects = [
        { type: 'oil', coords: [3.5, 108.0], name: 'Deepwater Natuna', desc: 'Deepwater oil field in Natuna Basin' },
        { type: 'oil', coords: [1.0, 118.0], name: 'Deepwater Makassar', desc: 'Exploration in Makassar Strait' },
        { type: 'oil', coords: [-3.5, 129.0], name: 'Seram Deepwater', desc: 'Offshore Seram drilling project' },
        { type: 'oil', coords: [2.0, 125.0], name: 'Deepwater Maluku', desc: 'Frontier offshore oil development' },
        { type: 'oil', coords: [5.5, 95.0], name: 'Andaman Deepwater', desc: 'High-potential offshore block' },

        { type: 'gas', coords: [0.1, 117.5], name: 'Bontang LNG', desc: 'One of the largest LNG plants in Indonesia' },
        { type: 'gas', coords: [-0.8, 122.0], name: 'Donggi-Senoro LNG', desc: 'Sulawesi gas processing terminal' },
        { type: 'gas', coords: [-3.4, 133.0], name: 'Tangguh LNG', desc: 'West Papua LNG project' },
        { type: 'gas', coords: [-7.1, 112.7], name: 'East Java Gas Refinery', desc: 'Processing natural gas in East Java' },
        { type: 'gas', coords: [3.9, 98.7], name: 'Arun LNG', desc: 'Aceh LNG terminal & refinery' },

        { type: 'geothermal', coords: [-7.2, 107.6], name: 'Wayang Windu', desc: 'West Java geothermal field' },
        { type: 'geothermal', coords: [-7.8, 112.0], name: 'Dieng Geothermal', desc: 'Central Java geothermal site' },
        { type: 'geothermal', coords: [-2.6, 115.4], name: 'Muara Laboh', desc: 'Sumatra geothermal project' },
        { type: 'geothermal', coords: [0.8, 120.9], name: 'Lahendong', desc: 'North Sulawesi geothermal power plant' },
        { type: 'geothermal', coords: [-8.3, 115.3], name: 'Bedugul', desc: 'Bali geothermal project' },
        { type: 'geothermal', coords: [-8.6, 120.9], name: 'Ulumbu', desc: 'Flores geothermal site' },
        { type: 'geothermal', coords: [-1.2, 100.5], name: 'Sumani', desc: 'West Sumatra geothermal development' }
    ];

    let markers = [];
    projects.forEach(p => {
        const marker = L.marker(p.coords).bindPopup(`<h3>${p.name}</h3><p>${p.desc}</p>`);
        marker.type = p.type;
        marker.addTo(map);
        markers.push(marker);
    });

    function filterProjects(type) {
        markers.forEach(m => {
            if (type === 'all' || m.type === type) {
                map.addLayer(m);
            } else {
                map.removeLayer(m);
            }
        });
    }

    const filterButtons = document.querySelectorAll(".filter-controls button");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Hapus active dari semua tombol
            filterButtons.forEach(b => b.classList.remove("active"));
            // Tambahkan active ke tombol yang diklik
            btn.classList.add("active");

            // Ambil tipe dari onclick (misal: filterProjects('oil'))
            const type = btn.getAttribute("onclick").match(/'(\w+)'/)[1];
            // Jalankan filterProjects
            filterProjects(type);
        });
    });
}

