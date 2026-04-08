// Theme Switch
let switchBtn = document.getElementById('toggle-btn');

// Load theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  if (switchBtn) switchBtn.checked = true;
}

if (switchBtn) {
  switchBtn.addEventListener('change', () => {
    if (switchBtn.checked) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });
}

// Navbar Badge
function updateNavbar() {
  let enrolled = JSON.parse(localStorage.getItem('enrolled')) || [];
  document.getElementById('enrolledCount').textContent = enrolled.length;
}

updateNavbar();

// Async fetch for JSON
async function loadData() {
  try {
    const res = await fetch('./data.json');
    const data = await res.json();

    displayStats(data.stats);
    displayFeaturedCourses(data.courses);
    displayCategories(data.categories);
  } catch (err) {
    console.error("Failed to load data:", err);
  }
}

loadData();

// Display Stats
function displayStats(stats) {
  document.getElementById("students-count").textContent = stats.studentsEnrolled;
  document.getElementById("courses-count").textContent = stats.totalCourses;
  document.getElementById("instructors-count").textContent = stats.instructors;
}

// Display Featured Courses
function displayFeaturedCourses(courses) {
  const container = document.getElementById('featuredCourses');
  container.innerHTML = '';
  courses.slice(0,3).forEach(course => {
    let levelColor;
    if(course.level==='Beginner') levelColor='success';
    else if(course.level==='Intermediate') levelColor='warning';
    else if(course.level==='Advanced') levelColor='danger';
    else levelColor='secondary';

    // النجوم باللون الأصفر
    let stars = '';
    for(let i=0;i<5;i++){
      stars += i < Math.round(course.rating) ? `<span class="star">★</span>` : `<span class="star">☆</span>`;
    }

    container.innerHTML += `
      <div class="col-md-4 ">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${course.title}</h5>
            <hr>
            <span class="badge bg-info ">${course.category}</span>
            <p class="card-text">Instructor: ${course.instructor}</p>
            <p>${stars}</p>
            <p class="card-text">Duration: ${course.duration}</p>
            <span class="badge bg-${levelColor} ">${course.level}</span>
            <hr>
            <button class="btn btn-primary mb-4" style="display:block; margin:10px auto 0 auto;" " onclick="enrollCourse(${course.id})">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

// Display Categories
let categoryImages = {
  "Web Development": "assets/web-development.jpg",
  "Data Science": "assets/Data-Science.jpg",
  "Design": "assets/Design.jpg",
  "Cybersecurity": "assets/Cybersecurity.jpg",
  "Mobile Dev": "assets/Mobile-Dev.jpg",
  "DevOps": "assets/DevOps.jpg"
};
let categoriesContainer = document.getElementById("categories");

let categories = [
  { name: "Web Development", count: 12 },
  { name: "Data Science", count: 8 },
  { name: "Design", count: 10 },
  { name: "Cybersecurity", count: 6 },
  { name: "Mobile Dev", count: 9 },
  { name: "DevOps", count: 5 }
];

categories.forEach(cat => {
  let col = document.createElement("div");
  col.className = "col-md-4 mb-4";

  let card = document.createElement("div");
  card.className = "category-card";

 
  card.style.backgroundImage = `url(${categoryImages[cat.name]})`;

  card.innerHTML = `
    <h5>${cat.name}</h5>
    <p>${cat.count} Courses</p>
  `;

  col.appendChild(card);
  categoriesContainer.appendChild(col);
});