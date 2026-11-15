
import { Component, OnInit } from '@angular/core';
import { Course } from '../../../core/models/course';
import { EnrollmentService } from '../../../services/enrollment.service';

@Component({
  selector: 'app-enrollment-dashboard',
  standalone: false,
  templateUrl: './enrollment-dashboard.component.html',
  styleUrls: ['./enrollment-dashboard.component.css']
})
export class EnrollmentDashboardComponent implements OnInit {

  get availableCount(): number {
  return this.enrolledCourses.filter(course => course.available).length;
}

  enrolledCourses: Course[] = [];

  constructor(
    private enrollService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.enrolledCourses = this.enrollService.getEnrolledCourses();
  }

}
