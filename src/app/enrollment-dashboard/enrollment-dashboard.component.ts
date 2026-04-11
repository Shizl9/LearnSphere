import { Component, OnInit } from '@angular/core';
import { Course } from '../Models/course';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-enrollment-dashboard',
  templateUrl: './enrollment-dashboard.component.html',
  styleUrls: ['./enrollment-dashboard.component.css']
})
export class EnrollmentDashboardComponent implements OnInit {

  enrolledCourses: Course[] = [];

  constructor(private enrollService: EnrollmentService) {}

  ngOnInit(): void {
    this.enrolledCourses = this.enrollService.getEnrolledCourses();
  }
}