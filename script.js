// DOM references
const modeBtn = document.getElementById("modeBtn");
const modeText = document.getElementById("modeText");
const body = document.body;

const codeInput = document.getElementById("codein");
const nameInput = document.getElementById("namein");
const dateInput = document.getElementById("idate");
const tinInput = document.getElementById("Tin");
const toutInput = document.getElementById("Tout");

const submitBtn = document.getElementById("submitBtn");
const tableBody = document.getElementById("tableBody");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const pageLabel = document.getElementById("pageLabel");

const newPageBtn = document.getElementById("newPageBtn");
const backBtn = document.getElementById("backBtn");

let currentPage = 1;
const entriesPerPage = 5;
let allData = [];

// Toggle dark mode
modeBtn.addEventListener("click", () => {
    modeBtn.classList.toggle("modem");
    modeBtn.classList.toggle("modem2");

    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        modeText.textContent = "☀️";
    } else {
        body.classList.add("dark");
        modeText.textContent = "🌙";
    }
});

// Validate and submit data
submitBtn.addEventListener("click", () => {
    const code = codeInput.value.trim();
    const name = nameInput.value.trim();
    const date = dateInput.value;
    const tin = tinInput.value;
    const tout = toutInput.value;

    if (!code || !name || !date || !tin || !tout) {
        alert("Please fill out all fields.");
        return;
    }

    const entry = { code, name, date, tin, tout };
    allData.push(entry);
    displayPage(currentPage);

    // Optional: Clear inputs after submit
    codeInput.value = "";
    nameInput.value = "";
    tinInput.value = "";
    toutInput.value = "";
});

// Display specific page
function displayPage(pageNum) {
    const start = (pageNum - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    const currentData = allData.slice(start, end);

    tableBody.innerHTML = "";

    currentData.forEach(entry => {
        const row = document.createElement("div");
        row.className = "table-row";
        row.innerHTML = `
            <p>${entry.code}</p>
            <p>${entry.name}</p>
            <p>${entry.date}</p>
            <p>${entry.tin}</p>
            <p>${entry.tout}</p>
        `;
        tableBody.appendChild(row);
    });

    pageLabel.textContent = `Page ${pageNum}`;
    currentPage = pageNum;
}

// Pagination
nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(allData.length / entriesPerPage);
    if (currentPage < totalPages) {
        displayPage(currentPage + 1);
    }
});

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        displayPage(currentPage - 1);
    }
});

// Load second page
newPageBtn.addEventListener("click", () => {
    window.location.href = "second.html";
});

// Go back to first page (from second.html)
if (backBtn) {
    backBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}
