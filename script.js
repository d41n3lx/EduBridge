// REAL SCHOLARSHIP DATABASE
const scholarshipsData = [
  {
    id: 1,
    title: "Google Africa Developer Scholarship",
    category: "Technology",
    level: "Bootcamp",
    funding: "Full Scholarship",
    description: "Fully funded technical training pathways in Android, Cloud, and Data Science for African tech enthusiasts.",
    deadline: "October 30, 2026",
    applyUrl: "https://buildyourfuture.withgoogle.com/"
  },
  {
    id: 2,
    title: "Mastercard Foundation Scholars Program",
    category: "Engineering",
    level: "Undergraduate",
    funding: "Full Scholarship",
    description: "Offers full tuition, living expenses, books, housing, and leadership mentoring for young African leaders.",
    deadline: "December 15, 2026",
    applyUrl: "https://mastercardfdn.org/all/scholars/"
  },
  {
    id: 3,
    title: "Women In STEM Leadership Award",
    category: "Research",
    level: "Master's",
    funding: "Grant",
    description: "Financial award aimed at supporting female innovators pursuing advanced master's and research studies in STEM.",
    deadline: "November 10, 2026",
    applyUrl: "https://www.britishcouncil.org/"
  },
  {
    id: 4,
    title: "Chevening UK Government Scholarship",
    category: "Business",
    level: "Master's",
    funding: "Full Scholarship",
    description: "UK government's global scholarship program offering full financial support for outstanding emerging leaders.",
    deadline: "November 05, 2026",
    applyUrl: "https://www.chevening.org/"
  },
  {
    id: 5,
    title: "DAAD In-Country / In-Region Scholarship",
    category: "Medicine",
    level: "PhD",
    funding: "Partial Scholarship",
    description: "Targeted support for postgraduate training for university staff and future researchers in African institutions.",
    deadline: "January 20, 2027",
    applyUrl: "https://www.daad.de/en/"
  }
];

// RENDER SCHOLARSHIPS TO GRID
function renderScholarships(items) {
  const grid = document.getElementById("scholarshipGrid");
  grid.innerHTML = "";

  if (items.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #94a3b8; padding: 40px;">No opportunities found matching your search criteria.</p>`;
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "scholarship-card";
    card.innerHTML = `
      <div>
        <div class="meta-tags">
          <span class="tag">${item.category}</span>
          <span class="tag tag-sub">${item.funding}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
      <div class="card-buttons">
        <button class="btn-primary" onclick="openModal(${item.id})">Details</button>
        <button class="btn-secondary" onclick="saveScholarship('${item.title}')"><i class="far fa-bookmark"></i></button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// MULTI-FILTER FUNCTION
function filterScholarships() {
  const searchVal = document.getElementById("searchInput").value.toLowerCase();
  const levelVal = document.getElementById("levelFilter").value;
  const fundingVal = document.getElementById("fundingFilter").value;

  const filtered = scholarshipsData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchVal) || 
                          item.description.toLowerCase().includes(searchVal) ||
                          item.category.toLowerCase().includes(searchVal);
    
    const matchesLevel = levelVal === "all" || item.level === levelVal;
    const matchesFunding = fundingVal === "all" || item.funding === fundingVal;

    return matchesSearch && matchesLevel && matchesFunding;
  });

  renderScholarships(filtered);
}

// CATEGORY PILL CLICK
function selectCategory(catName) {
  document.getElementById("searchInput").value = catName;
  filterScholarships();
  document.getElementById("scholarships").scrollIntoView({ behavior: 'smooth' });
}

// MODAL CONTROLS
function openModal(id) {
  const item = scholarshipsData.find(s => s.id === id);
  if (!item) return;

  document.getElementById("modalTitle").innerText = item.title;
  document.getElementById("modalTag").innerText = item.category;
  document.getElementById("modalDescription").innerText = item.description;
  document.getElementById("modalLevel").innerText = item.level;
  document.getElementById("modalFunding").innerText = item.funding;
  document.getElementById("modalDeadline").innerText = item.deadline;
  document.getElementById("modalApplyBtn").href = item.applyUrl;

  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

window.onclick = function(e) {
  if (e.target === document.getElementById("modal")) closeModal();
};

// SAVED LIST MANAGED IN LOCAL STORAGE
function saveScholarship(title) {
  let saved = JSON.parse(localStorage.getItem("savedScholarships")) || [];
  if (!saved.includes(title)) {
    saved.push(title);
    localStorage.setItem("savedScholarships", JSON.stringify(saved));
    displaySaved();
  }
}

function removeSaved(title) {
  let saved = JSON.parse(localStorage.getItem("savedScholarships")) || [];
  saved = saved.filter(item => item !== title);
  localStorage.setItem("savedScholarships", JSON.stringify(saved));
  displaySaved();
}

function displaySaved() {
  let saved = JSON.parse(localStorage.getItem("savedScholarships")) || [];
  const container = document.getElementById("savedList");
  document.getElementById("savedBadge").innerText = saved.length;

  if (saved.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #94a3b8;">No saved opportunities yet.</p>`;
    return;
  }

  container.innerHTML = "";
  saved.forEach(title => {
    const div = document.createElement("div");
    div.className = "saved-item";
    div.innerHTML = `
      <h4>${title}</h4>
      <button class="remove-btn" onclick="removeSaved('${title}')"><i class="fas fa-trash"></i></button>
    `;
    container.appendChild(div);
  });
}

// INITIALIZATION
renderScholarships(scholarshipsData);
displaySaved();
