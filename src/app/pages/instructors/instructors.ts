
import { Component, OnInit } from '@angular/core';
import { Course } from '../../core/models/course';
import { CoursesService } from '../../services/courses.service';

interface Instructor {
  name: string;
  initials: string;
  specialty: string;
  bio: string;
  courses: Course[];
  students: number;
  averageRating: number;
  color: string;
}

@Component({
  selector: 'app-instructors',
  standalone: false,
  templateUrl: './instructors.html',
  styleUrl: './instructors.css'
})
export class Instructors implements OnInit {

  instructors: Instructor[] = [];
  filteredInstructors: Instructor[] = [];
  searchText = '';

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    const courses = this.coursesService.getCourses();

    const names = [...new Set(courses.map(course => course.instructor))];

    this.instructors = names.map((name, index) => {
      const instructorCourses = courses.filter(
        course => course.instructor === name
      );

      const students = instructorCourses.reduce(
        (total, course) => total + course.studentsCount, 0
      );

      const averageRating = instructorCourses.reduce(
        (total, course) => total + course.rating, 0
      ) / instructorCourses.length;

      return {
        name,
        initials: name.substring(0, 2).toUpperCase(),
        specialty: instructorCourses[0].category + ' Instructor',
        bio: `Explore courses taught by ${name} and develop your skills through practical learning.`,
        courses: instructorCourses,
        students,
        averageRating,
        color: ['blue', 'purple', 'green'][index % 3]
      };
    });

    this.filteredInstructors = [...this.instructors];
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value.toLowerCase().trim();

    this.filteredInstructors = this.instructors.filter(instructor =>
      instructor.name.toLowerCase().includes(this.searchText) ||
      instructor.specialty.toLowerCase().includes(this.searchText)
    );
  }
}
