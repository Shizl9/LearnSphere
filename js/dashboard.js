document.addEventListener('DOMContentLoaded', () => {
  renderCoursesDashboard();
});


function getEnrolledCourses() {
  return JSON.parse(localStorage.getItem('enrolledCourses')) || [];
}

function saveEnrolledCourses(courses) {
  localStorage.setItem('enrolledCourses', JSON.stringify(courses));
}

function getProgressPercent(score) {
  return score * 20;
}

function getProgressColor(percent) {
  if (percent < 40) return 'red';
  if (percent < 80) return 'yellow';
  return 'green';
}
