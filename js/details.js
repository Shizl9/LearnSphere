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


