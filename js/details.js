let courseId;
let currentCourse;

// 📌 get ID
const params = new URLSearchParams(window.location.search);
courseId = parseInt(params.get("id"));

// 📌 load data
async function loadCourse() {
  const res = await fetch("./data.json");
  const data = await res.json();

  currentCourse = data.courses.find(c => c.id === courseId);

  if (!currentCourse) {
    document.getElementById("courseHeader").innerHTML =
      "<h2>Course not found</h2>";
    return;
  }

  renderCourse();
  renderTopics();
  renderInstructor();
  renderEnroll();
  renderQuiz();
  updateNavbar();
}

loadCourse();

// ================= HEADER =================
function renderCourse() {
  document.getElementById("courseHeader").innerHTML = `
    <h2>${currentCourse.title}</h2>
    <p>${currentCourse.instructor}</p>

    <span class="badge bg-info">${currentCourse.category}</span>
    <span class="badge bg-secondary">${currentCourse.level}</span>

    <p>⭐ ${currentCourse.rating}</p>
    <p>⏱ ${currentCourse.duration}</p>
    <p>👨‍🎓 ${currentCourse.studentsCount}</p>
  `;
}

// ================= TOPICS =================
function renderTopics() {
  let list = document.getElementById("topicsList");
  list.innerHTML = ""; // FIX

  currentCourse.topics.forEach(topic => {
    list.innerHTML += `<li>${topic}</li>`;
  });
}

// ================= INSTRUCTOR =================
function renderInstructor() {
  document.getElementById("instructorCard").innerHTML = `
    <h5>${currentCourse.instructor}</h5>
    <p>Expert Instructor</p>
    <p>⭐ ${currentCourse.rating}</p>
  `;
}

// ================= ENROLL =================
function renderEnroll() {
  let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
  let isEnrolled = enrolled.some(c => c.id === currentCourse.id);

  document.getElementById("enrollSection").innerHTML = isEnrolled
    ? `<p class="text-success fw-bold">You are enrolled ✓</p>`
    : `<button class="btn btn-primary" onclick="enroll()">Enroll in This Course</button>`;
}

function enroll() {
  let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];

  // FIX: prevent duplicates
  if (!enrolled.some(c => c.id === currentCourse.id)) {
    enrolled.push(currentCourse);
    localStorage.setItem("enrolled", JSON.stringify(enrolled));
  }

  renderEnroll();
  updateNavbar();
}

// ================= QUIZ =================
function renderQuiz() {
  let container = document.getElementById("quizContainer");
  container.innerHTML = ""; // FIX

  currentCourse.quiz.forEach((q, index) => {
    let optionsHTML = "";

    q.options.forEach(opt => {
      optionsHTML += `
        <div>
          <input type="radio" name="q${index}" value="${opt}">
          ${opt}
        </div>
      `;
    });

    container.innerHTML += `
      <div class="question mb-3">
        <h6>${q.question}</h6>
        ${optionsHTML}
      </div>
    `;
  });
}

// ================= SUBMIT QUIZ =================
function submitQuiz() {
  let score = 0;

  currentCourse.quiz.forEach((q, index) => {
    let selected = document.querySelector(`input[name="q${index}"]:checked`);

    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  document.getElementById("scoreResult").innerText =
    `Your Score: ${score} / ${currentCourse.quiz.length}`;

  localStorage.setItem(`score_${currentCourse.id}`, score);
}

// ================= NAVBAR =================
function updateNavbar() {
  let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
  document.getElementById("enrolledCount").innerText = enrolled.length;
}