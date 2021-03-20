import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseComponent } from './add-course.component';
import { FormsModule } from '@angular/forms';
import { DurationPipe } from '../../pipes/duration.pipe';
import { CoursesService } from '../../services/courses.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;
  let service: CoursesService;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseComponent, DurationPipe ],
      imports: [ FormsModule, RouterTestingModule.withRoutes([]) ],
      providers: [ CoursesService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CoursesService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return current course id', () => {
    component.setCourseId = '1';

    expect(component.getCourseId).toBe('1');
  });
});
