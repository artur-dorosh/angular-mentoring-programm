import { Injectable } from '@angular/core';
import { ICourse } from '../interfaces/course.interface';
import { BehaviorSubject } from 'rxjs';

const courses: ICourse[] = [
  {
    id: 'eb8c25d1-9361-4199-9561-3a2f826888d5',
    title: 'JavaScript. Basic knowledge',
    creationDate: '2020-12-09',
    duration: 80,
    description: 'Learn about where you can find course descriptions, what information they include, how they work, ' +
      'and detail about various components of a course description. Learn about where you can find course descriptions, what information' +
      'they include, how they work, and detail about various components of a course description.',
    topRated: false,
  }, {
    id: '18dee72d-6a83-4aa7-b7d4-27f7815d864b',
    title: 'Angular 2+. Advanced course',
    creationDate: '2020-12-01',
    duration: 69,
    description: 'Learn about where you can find course descriptions, what information they include, how they work, ' +
      'and detail about various components of a course description. Learn about where you can find course descriptions, what information' +
      'they include, how they work, and detail about various components of a course description.',
    topRated: true,
  }, {
    id: 'c45546c7-d6cc-4b02-bf75-44144bc8772b',
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
  currentCourseId: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private courses = courses;

  constructor() { }

  getCoursesList(): ICourse[] {
    return this.courses;
  }

  createCourse(course: ICourse): ICourse[] {
    this.courses.push(course);
    return this.courses;
  }

  getCourse(id: string): ICourse {
    return this.courses.find(course => course.id === id);
  }

  updateCourse(course: ICourse): ICourse[] {
    this.courses = this.courses.map(item => item.id === course.id ? course : item);
    return this.courses;
  }

  removeCourse(id: string): ICourse[] {
    this.courses = this.courses.filter(course => course.id !== id);
    return this.courses;
  }
}
