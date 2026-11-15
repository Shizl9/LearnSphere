import { Component, OnInit } from '@angular/core';
import { Course } from '../../core/models/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  featuredCourses: Course[] = [];

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.featuredCourses = this.coursesService.getTopRated(3);
  }
}