import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponent } from './courses-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ICourse } from '../../interfaces/course.interface';

const courses: ICourse[] = [
  {
    id: 1,
    title: 'JavaScript',
    creationDate: '2020-12-01',
    duration: 69,
    description: 'first',
    topRated: true,
  },
  {
    id: 2,
    title: 'Angular',
    creationDate: '2020-12-01',
    duration: 69,
    description: 'second',
    topRated: true,
  },
  {
    id: 3,
    title: 'TypeScript',
    creationDate: '2020-12-01',
    duration: 69,
    description: 'third',
    topRated: true,
  }
];

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesPageComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    component.courses = courses;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter courses according search query', () => {
    const mockSearchQuery = 'script';
    const spy = spyOn(component, 'search').and.callThrough();

    component.search(mockSearchQuery);

    expect(spy).toHaveBeenCalledWith(mockSearchQuery);
    expect(component.courses.length).toBe(2);
  });

  it('should filter courses according empty search query', () => {
    const mockSearchQuery = '';
    const spy = spyOn(component, 'search').and.callThrough();

    component.search(mockSearchQuery);

    expect(spy).toHaveBeenCalledWith(mockSearchQuery);
    expect(component.courses.length).toBe(3);
  });
});
