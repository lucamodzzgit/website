document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("menu-grid");
    const filters = document.querySelectorAll(".filter-btn");
    let allMenus = [];

    // Daten laden
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allMenus = data;
            renderMenus(allMenus);
        })
        .catch(err => console.error("Fehler beim Laden der Daten:", err));

    // Menüs anzeigen
    function renderMenus(menus) {
        grid.innerHTML = "";
        menus.forEach(menu => {
            const statusClass = `status-${menu.status}`; // safe, unsafe, updating
            const html = `
                <div class="card">
                    <img src="${menu.image}" alt="${menu.name}" class="card-img">
                    <div class="card-content">
                        <div class="card-header">
                            <span class="card-title">${menu.name}</span>
                            <span class="badge ${statusClass}">${menu.status}</span>
                        </div>
                        <p class="card-desc">${menu.description}</p>
                        <a href="${menu.link}" target="_blank" class="download-btn">
                            <i class="fas fa-download"></i> Download
                        </a>
                    </div>
                </div>
            `;
            grid.innerHTML += html;
        });
    }

    // Filter Logik
    filters.forEach(btn => {
        btn.addEventListener("click", () => {
            // Buttons aktiv schalten
            filters.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");
            if (filter === "all") {
                renderMenus(allMenus);
            } else {
                const filtered = allMenus.filter(m => m.status === filter);
                renderMenus(filtered);
            }
        });
    });
});