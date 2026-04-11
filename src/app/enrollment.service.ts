import { Injectable } from '@angular/core';
import { Course } from './Models/course';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourses: Course[] = [];

  enroll(course: Course) {
    const exists = this.enrolledCourses.find(c => c.id === course.id);
    if (!exists) {
      this.enrolledCourses.push(course);
    }
  }

  getEnrolledCourses(): Course[] {
    return this.enrolledCourses;
  }

  getCount(): number {
    return this.enrolledCourses.length;
  }
}
