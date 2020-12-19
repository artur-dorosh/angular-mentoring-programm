import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../interfaces/course.interface';

const courses: ICourse[] = [
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

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  public courses = courses;

  constructor() { }

  ngOnInit(): void {
  }

  search(value: string): void {
    this.courses = value ? courses.filter(course => course.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())) : courses;
  }

}
