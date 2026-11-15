
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../core/models/course';
import { CoursesService } from '../../services/courses.service';

interface PathStep {
  title: string;
  description: string;
  course?: Course;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: string;
  color: string;
  steps: PathStep[];
}

@Component({
  selector: 'app-learning-paths',
  standalone: false,
  templateUrl: './learning-paths.html',
  styleUrl: './learning-paths.css'
})
export class LearningPaths implements OnInit {

  paths: LearningPath[] = [];
  selectedPath: LearningPath | null = null;

  constructor(
    private coursesService: CoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const courses = this.coursesService.getCourses();

    const findCourse = (title: string): Course | undefined =>
      courses.find(course => course.title === title);

    this.paths = [
      {
        id: 'frontend',
        title: 'Frontend Developer',
        description: 'Build beautiful, responsive web applications.',
        icon: '💻',
        level: 'Beginner to Advanced',
        color: 'blue',
        steps: [
          {
            title: 'HTML & CSS Fundamentals',
            description: 'Learn the structure and styling of websites.'
          },
          {
            title: 'JavaScript Essentials',
            description: 'Build interactive web experiences.'
          },
          {
            title: 'Angular Basics',
            description: 'Start building applications with Angular.',
            course: findCourse('Angular Basics')
          },
          {
            title: 'Advanced Angular',
            description: 'Explore advanced Angular concepts.',
            course: findCourse('Advanced Angular')
          }
        ]
      },
      {
        id: 'backend',
        title: 'Backend Developer',
        description: 'Learn how to build APIs and server-side applications.',
        icon: '⚙️',
        level: 'Beginner to Advanced',
        color: 'purple',
        steps: [
          {
            title: 'C# Programming',
            description: 'Understand programming fundamentals with C#.'
          },
          {
            title: 'ASP.NET Core Web API',
            description: 'Build RESTful APIs.'
          },
          {
            title: 'SQL Databases',
            description: 'Learn database design and SQL queries.'
          },
          {
            title: 'Authentication & Security',
            description: 'Understand secure backend development.'
          }
        ]
      },
      {
        id: 'fullstack',
        title: 'Full Stack Developer',
        description: 'Connect frontend and backend to create complete applications.',
        icon: '🚀',
        level: 'Beginner to Advanced',
        color: 'green',
        steps: [
          {
            title: 'Web Development',
            description: 'Understand the foundations of web development.',
            course: findCourse('Web Development')
          },
          {
            title: 'Angular Basics',
            description: 'Build dynamic frontend applications.',
            course: findCourse('Angular Basics')
          },
          {
            title: 'Backend API Development',
            description: 'Create APIs using backend technologies.'
          },
          {
            title: 'Database Integration',
            description: 'Connect applications to databases.'
          }
        ]
      }
    ];
  }

  getAvailableCount(path: LearningPath): number {
    return path.steps.filter(step => step.course?.available).length;
  }

  getListedCount(path: LearningPath): number {
    return path.steps.filter(step => !!step.course).length;
  }

  selectPath(path: LearningPath): void {
    this.selectedPath = this.selectedPath?.id === path.id ? null : path;
  }

  browseCourses(): void {
    this.router.navigate(['/courses']);
  }
}
