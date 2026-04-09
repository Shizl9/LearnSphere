let allCourses = [];
let selectedCategory = "All";
let selectedLevel = "All";
let searchValue = "";

async function loadCourses() {
  const res = await fetch("./data.json");
  const data = await res.json();

  allCourses = data.courses;
  renderCourses(allCourses);
}
