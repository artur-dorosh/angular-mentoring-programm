import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../../models/course.interface';

const courses: ICourse[] = [
  {
    id: 1,
    title: 'JavaScript. Basic knowledge',
    creationDate: '9 Nov, 2018',
    duration: '1h 20min',
    description: 'Learn about where you can find course descriptions, what information they include, how they work, ' +
      'and detail about various components of a course description. Learn about where you can find course descriptions, what information' +
      'they include, how they work, and detail about various components of a course description.'
  }, {
    id: 2,
    title: 'Angular 2+. Advanced course',
    creationDate: '15 May, 2019',
    duration: '1h 09min',
    description: 'Learn about where you can find course descriptions, what information they include, how they work, ' +
      'and detail about various components of a course description. Learn about where you can find course descriptions, what information' +
      'they include, how they work, and detail about various components of a course description.'
  }, {
    id: 3,
    title: 'TypeScript. From junior to lead',
    creationDate: '3 Sep, 2020',
    duration: '1h 37min',
    description: 'Learn about where you can find course descriptions, what information they include, how they work, ' +
      'and detail about various components of a course description. Learn about where you can find course descriptions, what information' +
      'they include, how they work, and detail about various components of a course description.'
  }
];

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  public courses = courses;

  constructor() { }

  ngOnInit() {
  }

  loadMore(): void {
    console.log('Loading more courses...');
  }

  deleteItem(id: number): void {
    console.log(`You want to delete course with id=${id}`);
  }

}
