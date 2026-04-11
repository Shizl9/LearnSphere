import { Injectable } from '@angular/core';
import { Course } from './Models/course';

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
    }
  ];

  getCourses(): Course[] {
    return this.courses;
  }
 getCoursesByCategory(cat: string): Course[] {
    if (cat === 'All' || !cat) return this.courses;
    return this.courses.filter(c => c.category === cat);
  }

  getTopRated(n: number): Course[] {
    return [...this.courses]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, n);
  }
 
}
