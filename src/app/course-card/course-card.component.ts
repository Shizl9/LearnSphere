<<<<<<< HEAD
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../Models/course';
import { EnrollmentService } from '../enrollment.service';
=======
import { Component } from '@angular/core';
>>>>>>> 98d8d6c74a0bfe5816eb749557b682968fada1dd

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {
<<<<<<< HEAD
    @Input() course!: Course;

  @Output() enroll = new EventEmitter<Course>();

  onEnroll() {
    this.enroll.emit(this.course);
  }
=======

>>>>>>> 98d8d6c74a0bfe5816eb749557b682968fada1dd
}
