// Global Data
let allCourses = [];
let selectedCategory = "All";
let selectedLevel = "All";
let searchValue = "";

// Load JSON
async function loadCourses() {
  const res = await fetch("./data.json");
  const data = await res.json();

  allCourses = data.courses;
  renderCourses(allCourses);
}

loadCourses();

// Render Courses
function renderCourses(courses) {
  const container = document.getElementById("coursesContainer");
  if (!container) return;

  container.innerHTML = "";

  courses.forEach(course => {
    let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
    let isEnrolled = enrolled.some(c => c.id === course.id);

    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars += i < Math.round(course.rating) ? "★" : "☆";
    }

    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">

            <span class="badge bg-info">${course.category}</span>
            <span class="badge bg-secondary">${course.level}</span>

            <h5 class="mt-2">${course.title}</h5>
            <p>${course.instructor}</p>

            <p class="text-warning">${stars}</p>

            <p>⏱ ${course.duration}</p>
            <p>👨‍🎓 ${course.studentsCount}</p>
            <p><strong>$${course.price}</strong></p>

            <button class="btn btn-primary w-100"
              onclick="enroll(${course.id})"
              ${isEnrolled ? "disabled" : ""}
            >
              ${isEnrolled ? "Enrolled ✓" : "Enroll"}
            </button>

          </div>
        </div>
      </div>
    `;
  });
}

// Enroll
function enroll(id) {
  let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];

  if (!enrolled.some(c => c.id === id)) {
    let course = allCourses.find(c => c.id === id);
    enrolled.push(course);
    localStorage.setItem("enrolled", JSON.stringify(enrolled));
  }

  updateNavbar();
  renderCourses(allCourses);
}

// Navbar Badge
function updateNavbar() {
  let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
  document.getElementById("enrolledCount").innerText = enrolled.length;
}

// Filters
function applyFilters() {
  let filtered = [...allCourses];

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

  renderCourses(filtered);
}

// Search
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("searchInput").addEventListener("keyup", e => {
    searchValue = e.target.value.toLowerCase();
    applyFilters();
  });

  // Category
  document.querySelectorAll("#categoryFilter button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#categoryFilter button")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");

      selectedCategory = btn.dataset.category;
      applyFilters();
    });
  });

  // Level
  document.getElementById("levelFilter").addEventListener("change", e => {
    selectedLevel = e.target.value;
    applyFilters();
  });

  // Sort
  document.getElementById("sortFilter").addEventListener("change", e => {
    let sorted = [...allCourses];

    switch (e.target.value) {
      case "ratingDesc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "priceAsc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "durationAsc":
        sorted.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
    }

    renderCourses(sorted);
  });

  updateNavbar();
});