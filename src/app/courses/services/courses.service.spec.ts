import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { ICourse } from '../interfaces/course.interface';

const course: ICourse = {
  id: 4,
  title: 'JS',
  creationDate: '2012-12-12',
  duration: 70,
  description: 'JavaScript',
  topRated: false
};

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => service = TestBed.inject(CoursesService));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add new course', () => {
    service.createCourse(course);

    expect(service.getCoursesList().length).toBe(4);
  });

  it('should find course by id', () => {
    service.createCourse(course);

    expect(service.getCourse(4)).toEqual(course);
  });

  it('should update course by id', () => {
    service.createCourse(course);

    expect(service.updateCourse({...course, title: 'TS'}).length).toBe(4);
    expect(service.getCourse(4).title).toBe('TS');
  });
});
