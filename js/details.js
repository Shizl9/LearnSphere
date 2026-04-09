let courseId;
let currentCourse;

// 📌 قراءة ID من الرابط
const params = new URLSearchParams(window.location.search);
courseId = parseInt(params.get("id"));

// 📌 تحميل البيانات
async function loadCourse() {
  const res = await fetch("./data.json");
  const data = await res.json();

  currentCourse = data.courses.find(c => c.id === courseId);

  renderCourse();
  renderTopics();
  renderInstructor();
  renderEnroll();
  renderQuiz();
}

loadCourse();

// 📌 عرض الهيدر
function renderCourse() {
  document.getElementById("courseHeader").innerHTML = `
    <h2>${currentCourse.title}</h2>
    <p>${currentCourse.instructor}</p>
    <span class="badge bg-info">${currentCourse.category}</span>
    <span class="badge bg-secondary">${currentCourse.level}</span>
    <p>⭐ ${currentCourse.rating}</p>
    <p>⏱ ${currentCourse.duration}</p>
    <p>👨 ${currentCourse.studentsCount}</p>
  `;
}

// 📌 topics
function renderTopics() {
  let list = document.getElementById("topicsList");

  currentCourse.topics.forEach(topic => {
    list.innerHTML += `<li>${topic}</li>`;
  });
}

// 📌 instructor
function renderInstructor() {
  document.getElementById("instructorCard").innerHTML = `
    <h5>${currentCourse.instructor}</h5>
    <p>Expert Instructor</p>
    <p>⭐ ${currentCourse.rating}</p>
  `;
}

// 📌 enroll
function renderEnroll() {
  let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
  let isEnrolled = enrolled.some(c => c.id === currentCourse.id);

  if (isEnrolled) {
    document.getElementById("enrollSection").innerHTML =
      `<p class="text-success">You are enrolled ✓</p>`;
  } else {
    document.getElementById("enrollSection").innerHTML =
      `<button class="btn btn-primary" onclick="enroll()">Enroll in This Course</button>`;
  }
}

// 📌 enroll function
function enroll() {
  let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];

  enrolled.push(currentCourse);
  localStorage.setItem("enrolled", JSON.stringify(enrolled));

  renderEnroll();
  updateNavbar();
}

// 📌 quiz
function renderQuiz() {
  let container = document.getElementById("quizContainer");

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
      <div class="question">
        <h6>${q.question}</h6>
        ${optionsHTML}
      </div>
    `;
  });
}

// 📌 submit quiz
function submitQuiz() {
  let score = 0;

  currentCourse.quiz.forEach((q, index) => {
    let selected = document.querySelector(`input[name="q${index}"]:checked`);

    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  document.getElementById("scoreResult").innerText =
    `Your Score: ${score} / 5`;

  // حفظ النتيجة
  localStorage.setItem(`score_${currentCourse.id}`, score);
}

// 📌 navbar
function updateNavbar() {
  let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
  document.getElementById("enrolledCount").innerText = enrolled.length;
}

updateNavbar();