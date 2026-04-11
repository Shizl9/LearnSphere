import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
 courses = [
    {
      id: 1,
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

  getCourses() {
    return this.courses;
  }

  getCoursesByCategory(category: string) {
    if (category === 'All') return this.courses;
    return this.courses.filter(c => c.category === category);
  }

  getTopRated(n: number) {
    return [...this.courses]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, n);
  }

}
