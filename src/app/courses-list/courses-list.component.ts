
import { Component, OnInit } from '@angular/core';
import { Course } from '../Models/course';
import { CoursesService } from '../courses.service';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-courses-list',
  standalone: false,
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

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
    this.applyFilters();
  }

  // Search Courses
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value.toLowerCase().trim();
    this.applyFilters();
  }

  // Filter by Category
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  // Apply Search and Category Filters
  applyFilters(): void {
    this.filteredCourses = this.courses.filter(course => {

      const matchCategory =
        this.selectedCategory === 'All' ||
        course.category === this.selectedCategory;

      const matchSearch =
        course.title.toLowerCase().includes(this.searchText);

      return matchCategory && matchSearch;
    });
  }

  // Enroll in Course
  onEnroll(course: Course): void {
    this.enrollService.enroll(course);
    console.log('Enrolled:', course.title);
  }

}
