import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponent } from './courses-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ICourse } from '../../interfaces/course.interface';
import { MatDialog, MatDialogModule } from '@angular/material';
import { of } from 'rxjs';
import { CoursesService } from '../../services/courses.service';

const courses: ICourse[] = [
  {
    id: '1',
    title: 'JavaScript',
    creationDate: '2020-12-01',
    duration: 69,
    description: 'first',
    topRated: true,
  },
  {
    id: '2',
    title: 'Angular',
    creationDate: '2020-12-01',
    duration: 69,
    description: 'second',
    topRated: true,
  },
];

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let service: CoursesService;
  let dialog: MatDialog;
  let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of(true), close: null });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesPageComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ MatDialogModule ],
      providers: [ CoursesService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    component.courses = courses;
    service = TestBed.inject(CoursesService);
    dialog = TestBed.inject(MatDialog);
    dialogSpy = spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);
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
    expect(component.courses.length).toBeGreaterThanOrEqual(3);
  });

  it('should delete course if confirmation dialog send true value', () => {
    component.deleteCourse('1');

    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(component.courses.length).toBeGreaterThanOrEqual(2);

    component.deleteCourse('0');

    expect(component.courses.length).toBeGreaterThanOrEqual(2);
  });

  it('should navigate to add course page', () => {
    component.editCourse('1');

    expect(component.currentlyChangeCourse).toBe(true);
    expect(component.currentCourseId).toBe('1');
  });

  it('should save course data changes and return to courses page', () => {
    const spy = spyOn(service, 'getCoursesList').and.returnValue([]);

    component.updateCoursesList(true);

    expect(spy).toHaveBeenCalled();
    expect(component.courses).toEqual([]);
    expect(component.currentlyChangeCourse).toBe(false);
  });

  it('should not save course data changes and return to courses page', () => {
    const spy = spyOn(service, 'getCoursesList');

    component.updateCoursesList(false);

    expect(spy).not.toHaveBeenCalled();
    expect(component.currentlyChangeCourse).toBe(false);
  });
});
