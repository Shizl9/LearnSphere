document.addEventListener('DOMContentLoaded', () => {
  renderCoursesDashboard();
});


function getEnrolledCourses() {
  return JSON.parse(localStorage.getItem('enrolledCourses')) || [];
}
