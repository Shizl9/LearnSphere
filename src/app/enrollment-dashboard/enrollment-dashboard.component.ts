<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Course } from '../Models/course';
import { EnrollmentService } from '../enrollment.service';
=======
import { Component } from '@angular/core';
>>>>>>> 98d8d6c74a0bfe5816eb749557b682968fada1dd

@Component({
  selector: 'app-enrollment-dashboard',
  templateUrl: './enrollment-dashboard.component.html',
  styleUrls: ['./enrollment-dashboard.component.css']
})
<<<<<<< HEAD
export class EnrollmentDashboardComponent implements OnInit {

  enrolledCourses: Course[] = [];

  constructor(private enrollService: EnrollmentService) {}

  ngOnInit(): void {
    this.enrolledCourses = this.enrollService.getEnrolledCourses();
  }
}
=======
export class EnrollmentDashboardComponent {

}
>>>>>>> 98d8d6c74a0bfe5816eb749557b682968fada1dd
