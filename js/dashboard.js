document.addEventListener('DOMContentLoaded', () => {
  renderCoursesDashboard();
});


function getEnrolledCourses() {
  return JSON.parse(localStorage.getItem('enrolledCourses')) || [];
}

function saveEnrolledCourses(courses) {
  localStorage.setItem('enrolledCourses', JSON.stringify(courses));
}
