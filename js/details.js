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


