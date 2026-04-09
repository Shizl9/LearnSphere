let enrolledCourses = [];

// تحميل البيانات
function loadDashboard() {
  enrolledCourses = JSON.parse(localStorage.getItem("enrolled")) || [];

  renderSummary();
  renderCourses();
}

loadDashboard();