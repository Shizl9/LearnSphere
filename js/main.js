// ================= DARK MODE =================
const themeToggle = document.getElementById("theme-switch");

// تحميل الحالة المحفوظة
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.checked = true;
}

// التبديل
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
// ================= NAVBAR =================
function updateNavbar() {
  let enrolled = JSON.parse(localStorage.getItem('enrolled')) || [];
  document.getElementById('enrolledCount').textContent = enrolled.length;
}

updateNavbar();

// ================= FETCH DATA =================
let allCourses = [];

async function loadData() {
  try {
    const res = await fetch('./data.json');
    const data = await res.json();

    allCourses = data.courses;

    displayStats(data.stats);
    displayFeaturedCourses(data.courses);
    displayCategories(data.categories);

  } catch (err) {
    console.error("Failed to load data:", err);
  }
}

loadData();

// ================= STATS =================
function displayStats(stats) {
  document.getElementById("students-count").textContent = stats.studentsEnrolled;
  document.getElementById("courses-count").textContent = stats.totalCourses;
  document.getElementById("instructors-count").textContent = stats.instructors;
}

// ================= FEATURED COURSES =================
function displayFeaturedCourses(courses) {
  const container = document.getElementById('featuredCourses');
  container.innerHTML = '';

  courses.slice(0, 3).forEach(course => {

    let levelColor =
      course.level === 'Beginner' ? 'success' :
      course.level === 'Intermediate' ? 'warning' :
      course.level === 'Advanced' ? 'danger' : 'secondary';

    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < Math.round(course.rating) ? '★' : '☆';
    }

    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100 p-3">
          <h5>${course.title}</h5>
          <span class="badge bg-info mb-2">${course.category}</span>
          <p>Instructor: ${course.instructor}</p>
          <p class="text-warning">${stars}</p>
          <p>Duration: ${course.duration}</p>
          <span class="badge bg-${levelColor}">${course.level}</span>

          <button class="btn btn-primary mt-3"
            onclick="enrollCourse(${course.id})">
            Enroll Now
          </button>
        </div>
      </div>
    `;
  });
}

// ================= CATEGORIES =================
function displayCategories(categoriesData) {
  const container = document.getElementById("categories");
  container.innerHTML = '';

  let categoryImages = {
    "Web Development": "assets/web-development.jpg",
    "Data Science": "assets/Data-Science.jpg",
    "Design": "assets/Design.jpg",
    "Cybersecurity": "assets/Cybersecurity.jpg",
    "Mobile Dev": "assets/Mobile-Dev.jpg",
    "DevOps": "assets/DevOps.jpg"
  };

  categoriesData.forEach(cat => {
    let col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    let card = document.createElement("div");
    card.className = "category-card";

    // 👇 نحافظ على الخلفية حقك
    card.style.backgroundImage = `url(${categoryImages[cat.name]})`;

    card.innerHTML = `
      <h5>${cat.name}</h5>
      <p>${cat.courseCount} Courses</p>
    `;

    col.appendChild(card);
    container.appendChild(col);
  });
}

// ================= ENROLL =================
function enrollCourse(courseId) {
  let enrolled = JSON.parse(localStorage.getItem('enrolled')) || [];

  if (enrolled.find(c => c.id === courseId)) {
    alert("Already enrolled!");
    return;
  }

  const course = allCourses.find(c => c.id === courseId);
  if (!course) return;

  course.quizScore = 0;

  enrolled.push(course);

  localStorage.setItem('enrolled', JSON.stringify(enrolled));

  updateNavbar();
}