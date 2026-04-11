<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Course } from '../Models/course';
import { CoursesService } from '../courses.service';
import { EnrollmentService } from '../enrollment.service';
=======
import { Component } from '@angular/core';
>>>>>>> 98d8d6c74a0bfe5816eb749557b682968fada1dd

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
<<<<<<< HEAD
export class CoursesListComponent implements OnInit{
     courses: Course[] = [];
  filteredCourses: Course[] = [];

  selectedCategory: string = 'All';
  searchText: string = '';

  constructor(
    private courseService: CoursesService,
    private enrollService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
    this.filteredCourses = this.courses;
  }

  // 🔍 search
  onSearch(event: any) {
    this.searchText = event.target.value.toLowerCase();
    this.applyFilters();
  }

  // 📂 category filter
  filterByCategory(cat: string) {
    this.selectedCategory = cat;
    this.applyFilters();
  }

  // 🔥 apply both filters
  applyFilters() {
    this.filteredCourses = this.courses.filter(course => {

      const matchCategory =
        this.selectedCategory === 'All' ||
        course.category === this.selectedCategory;

      const matchSearch =
        course.title.toLowerCase().includes(this.searchText);

      return matchCategory && matchSearch;
    });
  }

  
  onEnroll(course: Course) {
    this.enrollService.enroll(course);
    console.log('Enrolled:', course.title);
  }
}
=======
export class CoursesListComponent {

}
>>>>>>> 98d8d6c74a0bfe5816eb749557b682968fada1dd
