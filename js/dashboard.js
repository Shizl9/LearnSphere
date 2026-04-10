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

function renderCoursesDashboard() {
  const container = document.getElementById('coursesDashboard');
  const emptyState = document.getElementById('emptyState');
  const courses = getEnrolledCourses();

  container.innerHTML = '';

  if (courses.length === 0) {
    emptyState.classList.remove('d-none');
    return;
  }

  emptyState.classList.add('d-none');

  courses.forEach(course => {
    const percent = getProgressPercent(course.quizScore || 0);
    const color = getProgressColor(percent);

    const card = document.createElement('div');
    card.className = 'col-md-4';

    card.innerHTML = `
      <div class="course-card">
        <h5>${course.title}</h5>
        <p>${course.category}</p>
        <p>${course.instructor}</p>
        <p>${course.level}</p>

        <div class="progress">
  <div class="progress-bar ${color}" style="width:${percent}%">
    ${percent}%
  </div>
</div>

        <button class="btn-unenroll" onclick="unenroll(${course.id})">
          Unenroll
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  updateStats(courses);
}
