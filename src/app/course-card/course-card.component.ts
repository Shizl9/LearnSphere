import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../Models/course';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {
    @Input() course!: Course;

  @Output() enroll = new EventEmitter<Course>();

  onEnroll() {
    this.enroll.emit(this.course);
  }
}
