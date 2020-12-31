import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponent } from './courses-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ICourse } from '../../interfaces/course.interface';
import { MatDialog, MatDialogModule } from '@angular/material';
import { of } from 'rxjs';

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
];

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let dialog: MatDialog;
  let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of(true), close: null });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesPageComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ MatDialogModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    component.courses = courses;
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
    expect(component.courses.length).toBe(1);
  });

  it('should filter courses according empty search query', () => {
    const mockSearchQuery = '';
    const spy = spyOn(component, 'search').and.callThrough();

    component.search(mockSearchQuery);

    expect(spy).toHaveBeenCalledWith(mockSearchQuery);
    expect(component.courses.length).toBeGreaterThanOrEqual(3);
  });

  it('should delete course if confirmation dialog send true value', () => {
    component.deleteCourse(1);

    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(component.courses.length).toBeGreaterThanOrEqual(2);

    component.deleteCourse(0);

    expect(component.courses.length).toBeGreaterThanOrEqual(2);
  });
});
