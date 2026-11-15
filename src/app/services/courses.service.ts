
import { Injectable } from '@angular/core';
import { Course } from '../core/models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses: Course[] = [
    {
      id: 1,
      title: 'Angular Basics',
      category: 'Frontend',
      instructor: 'Ahmed',
      rating: 4.5,
      price: 50,
      duration: '6h',
      level: 'Beginner',
      studentsCount: 1000,
      available: true,
      topics: ['Components', 'Modules']
    },
    {
      id: 2,
      title: 'Advanced Angular',
      category: 'Frontend',
      instructor: 'Sara',
      rating: 4.9,
      price: 120,
      duration: '10h',
      level: 'Advanced',
      studentsCount: 500,
      available: false,
      topics: ['RxJS', 'NgRx']
    },
    {
      id: 3,
      title: 'Web Development',
      category: 'Web',
      instructor: 'Ali',
      rating: 4.5,
      price: 50,
      duration: '10h',
      level: 'Beginner',
      studentsCount: 100,
      available: true,
      topics: ['HTML', 'CSS', 'JS']
    }
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCoursesByCategory(category: string): Course[] {
    if (category === 'All' || !category) {
      return this.courses;
    }

    return this.courses.filter(
      course => course.category === category
    );
  }

  getTopRated(n: number): Course[] {
    return [...this.courses]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, n);
  }
}
