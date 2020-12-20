import { Injectable } from '@angular/core';
import { ICourse } from '../interfaces/course.interface';

let courses: ICourse[] = [
  {
    id: 1,
    title: 'JavaScript. Basic knowledge',
    creationDate: '2020-12-09',
    duration: 80,
    description: 'Learn about where you can find course descriptions, what information they include, how they work, ' +
      'and detail about various components of a course description. Learn about where you can find course descriptions, what information' +
      'they include, how they work, and detail about various components of a course description.',
    topRated: false,
  }, {
    id: 2,
    title: 'Angular 2+. Advanced course',
    creationDate: '2020-12-01',
    duration: 69,
    description: 'Learn about where you can find course descriptions, what information they include, how they work, ' +
      'and detail about various components of a course description. Learn about where you can find course descriptions, what information' +
      'they include, how they work, and detail about various components of a course description.',
    topRated: true,
  }, {
    id: 3,
    title: 'TypeScript. From junior to lead',
    creationDate: '2020-12-27',
    duration: 97,
    description: 'Learn about where you can find course descriptions, what information they include, how they work, ' +
      'and detail about various components of a course description. Learn about where you can find course descriptions, what information' +
      'they include, how they work, and detail about various components of a course description.',
    topRated: true,
  }
];

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses = courses;

  constructor() { }

  getCoursesList(): ICourse[] {
    return this.courses;
  }

  createCourse(course: ICourse): ICourse[] {
    this.courses.push(course);
    return this.courses;
  }

  getCourse(id: number): ICourse {
    return this.courses.find(course => course.id === id);
  }

  updateCourse(course: ICourse): ICourse[] {
    this.courses = this.courses.map(item => item.id === course.id ? course : item);
    return this.courses;
  }

  removeCourse(id: number): ICourse[] {
    this.courses = this.courses.filter(course => course.id !== id);
    return this.courses;
  }
}
