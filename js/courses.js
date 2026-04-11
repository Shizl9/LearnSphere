// ================= GLOBAL STATE =================
let allCourses = [];
let selectedCategory = "All";
let selectedLevel = "All";
let searchValue = "";

// ================= LOAD DATA =================
async function loadCourses() {
  try {
    const res = await fetch("./data.json");
    const data = await res.json();

    allCourses = data.courses;
    renderCourses(allCourses);
    updateNavbar();

  } catch (err) {
    console.error("Error loading courses:", err);
  }
}

loadCourses();

// ================= CATEGORY CLASS =================
function getCategoryClass(category) {
  switch (category) {
    case "Web Development": return "web";
    case "Design": return "design";
    case "Data Science": return "data";
    case "Cybersecurity": return "cyber";
    case "Mobile Dev": return "mobile";
    case "DevOps": return "devops";
    default: return "default";
  }
}

// ================= RENDER COURSES =================
function renderCourses(courses) {
  const container = document.getElementById("coursesContainer");
  if (!container) return;

  container.innerHTML = "";

  let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];

  courses.forEach(course => {

    let isEnrolled = enrolled.some(c => c.id === course.id);

    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars += i < Math.round(course.rating) ? "★" : "☆";
    }

    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="course-card h-100">

          ${!course.available ? `<div class="coming-soon">Coming Soon</div>` : ""}

          <div class="course-header ${getCategoryClass(course.category)}"></div>

          <div class="p-3">

            <span class="badge bg-info">${course.category}</span>
            <span class="badge bg-secondary">${course.level}</span>

            <h5 class="mt-2">
              <a href="course-details.html?id=${course.id}" style="text-decoration:none; color:inherit;">
                ${course.title}
              </a>
            </h5>

            <p>${course.instructor}</p>

            <p class="stars">${stars}</p>

            <p><i class="fa-regular fa-clock "></i>${course.duration}</p>
            <p><i class="fa-solid fa-user-graduate"></i>${course.studentsCount}</p>

            <p class="price">$${course.price}</p>

            <button class="btn btn-primary w-100"
              onclick="enroll(${course.id})"
              ${isEnrolled || !course.available ? "disabled" : ""}
            >
              ${!course.available ? "Coming Soon" : isEnrolled ? "Enrolled ✓" : "Enroll"}
            </button>

          </div>
        </div>
      </div>
    `;
  });
}

// ================= ENROLL =================
function enroll(id) {
  let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];

  if (!enrolled.some(c => c.id === id)) {
    let course = allCourses.find(c => c.id === id);
    enrolled.push(course);
    localStorage.setItem("enrolled", JSON.stringify(enrolled));
  }

  updateNavbar();
  applyFilters(); // refresh UI
}

// ================= NAVBAR BADGE =================
function updateNavbar() {
  let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
  let badge = document.getElementById("enrolledCount");

  if (badge) {
    badge.textContent = enrolled.length;
  }
}

// ================= FILTERS =================
function applyFilters() {
  let filtered = [...allCourses];

  // category
  if (selectedCategory !== "All") {
    filtered = filtered.filter(c => c.category === selectedCategory);
  }

  // level
  if (selectedLevel !== "All") {
    filtered = filtered.filter(c => c.level === selectedLevel);
  }

  // search
  if (searchValue) {
    filtered = filtered.filter(c =>
      c.title.toLowerCase().includes(searchValue) ||
      c.instructor.toLowerCase().includes(searchValue)
    );
  }

  renderCourses(filtered);
}

// ================= EVENTS =================
document.addEventListener("DOMContentLoaded", () => {

  // SEARCH
  document.getElementById("searchInput").addEventListener("input", e => {
    searchValue = e.target.value.toLowerCase();
    applyFilters();
  });

  // CATEGORY
  document.querySelectorAll("#categoryFilter button").forEach(btn => {
    btn.addEventListener("click", () => {

      document.querySelectorAll("#categoryFilter button")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");

      selectedCategory = btn.dataset.category;
      applyFilters();
    });
  });

  // LEVEL
  document.getElementById("levelFilter").addEventListener("change", e => {
    selectedLevel = e.target.value;
    applyFilters();
  });

  // SORT
  document.getElementById("sortFilter").addEventListener("change", e => {

    let filtered = [...allCourses];

    // apply same filters first
    if (selectedCategory !== "All") {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    if (selectedLevel !== "All") {
      filtered = filtered.filter(c => c.level === selectedLevel);
    }

    if (searchValue) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(searchValue) ||
        c.instructor.toLowerCase().includes(searchValue)
      );
    }

    // sort
    switch (e.target.value) {
      case "ratingDesc":
        filtered.sort((a, b) => b.rating - a.rating);
        break;

      case "priceAsc":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "priceDesc":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "durationAsc":
        filtered.sort((a, b) =>
          parseInt(a.duration) - parseInt(b.duration)
        );
        break;
    }

    renderCourses(filtered);
  });
});