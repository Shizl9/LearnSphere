let courseId;
let currentCourse;

// قراءة id من الرابط
const params = new URLSearchParams(window.location.search);
courseId = parseInt(params.get("id"));

// تحميل البيانات
async function loadCourse() {
  const res = await fetch("./data.json");
  const data = await res.json();

  // نجيب الكورس باستخدام for
  for (let i = 0; i < data.courses.length; i++) {
    if (data.courses[i].id === courseId) {
      currentCourse = data.courses[i];
      break;
    }
  }

  renderCourse();
  renderTopics();
  renderInstructor();
  renderEnroll();
  renderQuiz();
}

loadCourse();

// عرض بيانات الكورس
function renderCourse() {
  document.getElementById("courseHeader").innerHTML = `
    <h2>${currentCourse.title}</h2>
    <p>${currentCourse.instructor}</p>
    <span class="badge bg-infor">${currentCourse.category}</span>
    <span class="badge bg-secondary">${currentCourse.level}</span>
    <p>⭐ ${currentCourse.rating}</p>
    <p>⏱ ${currentCourse.duration}</p>
    <p>👨 ${currentCourse.studentsCount}</p>
  `;
}

// topics
function renderTopics() {
  let list = document.getElementById("topicsList");
  list.innerHTML = "";

  for (let i = 0; i < currentCourse.topics.length; i++) {
    list.innerHTML += `<li>${currentCourse.topics[i]}</li>`;
  }
}


// instructor
function renderInstructor() {
  document.getElementById("instructorCard").innerHTML = `
    <h5>${currentCourse.instructor}</h5>
    <p>Expert Instructor</p>
    <p>⭐ ${currentCourse.rating}</p>
  `;
}


// enroll
function renderEnroll() {
  let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
  let isEnrolled = false;

  for (let i = 0; i < enrolled.length; i++) {
    if (enrolled[i].id === currentCourse.id) {
      isEnrolled = true;
      break;
    }
  }

  if (isEnrolled) {
    document.getElementById("enrollSection").innerHTML =
      `<p class="text-success">You are enrolled ✓</p>`;
  } else {
    document.getElementById("enrollSection").innerHTML =
      `<button class="btn btn-primary" onclick="enroll()">Enroll</button>`;
  }
}

// enroll function
function enroll() {
  let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];

  enrolled.push(currentCourse);
  localStorage.setItem("enrolled", JSON.stringify(enrolled));

  renderEnroll();
  updateNavbar();
}

// quiz
function renderQuiz() {
  let container = document.getElementById("quizContainer");
  container.innerHTML = "";

  for (let i = 0; i < currentCourse.quiz.length; i++) {
    let q = currentCourse.quiz[i];
    let optionsHTML = "";

    for (let j = 0; j < q.options.length; j++) {
      optionsHTML += `
        <div>
          <input type="radio" name="q${i}" value="${q.options[j]}">
          ${q.options[j]}
        </div>
      `;
    }

    container.innerHTML += `
      <div class="question">
        <h6>${q.question}</h6>
        ${optionsHTML}
      </div>
    `;
  }
}


// submit quiz
function submitQuiz() {
  let score = 0;

  for (let i = 0; i < currentCourse.quiz.length; i++) {
    let selected = document.querySelector(`input[name="q${i}"]:checked`);

    if (selected && selected.value === currentCourse.quiz[i].answer) {
      score++;
    }
  }

  document.getElementById("scoreResult").innerText =
    `Your Score: ${score} / 5`;

  localStorage.setItem(`score_${currentCourse.id}`, score);
}
