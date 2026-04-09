let allCourses = [];
let selectedCategory = "All";
let selectedLevel = "All";
let searchValue = "";

async function loadCourses() {
  const res = await fetch("./data.json");
  const data = await res.json();

  allCourses = data.courses;
  renderCourses(allCourses);
}
loadCourses();
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
