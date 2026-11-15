
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../../core/models/course';

@Component({
  selector: 'app-course-card',
  standalone: false,
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {

  @Input() course!: Course;

  @Output() enroll = new EventEmitter<Course>();

  onEnroll(): void {
    this.enroll.emit(this.course);
  }

}
