import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { CoursesService } from '../../services/courses.service';
import { ICourse } from '../../interfaces/course.interface';

const course: ICourse = {
  id: '4',
  title: 'JS',
  creationDate: '2012-12-12',
  duration: 70,
  description: 'JavaScript',
  topRated: false
};

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let service: CoursesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbsComponent ],
      providers: [CoursesService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    service = TestBed.inject(CoursesService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should', async(() => {
  //   const spy = spyOn(service, 'getCourse');
  //
  //   service.currentCourseId.next('c45546c7-d6cc-4b02-bf75-44144bc8772b');
  //
  //   fixture.whenStable().then(() => {
  //     expect(spy).toHaveBeenCalledWith('c45546c7-d6cc-4b02-bf75-44144bc8772b');
  //   });
  //
  //   expect(component.courseTitle).toBe(course.title);
  // }));
});
