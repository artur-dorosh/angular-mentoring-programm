import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseComponent } from './add-course.component';
import { FormsModule } from '@angular/forms';
import { DurationPipe } from '../../pipes/duration.pipe';
import { ICourse } from '../../interfaces/course.interface';
import { CoursesService } from '../../services/courses.service';

const courses: ICourse = {
    id: '1',
    title: 'JavaScript',
    creationDate: '2020-12-01',
    duration: 69,
    description: 'first',
    topRated: true,
};

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;
  let service: CoursesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseComponent, DurationPipe ],
      imports: [ FormsModule ],
      providers: [ CoursesService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CoursesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply course data to inputs by id', () => {
    const spy = spyOn(service, 'getCourse').and.returnValue(courses);

    component.courseId = '1';
    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith('1');
    expect(component.title).toBe('JavaScript');
    expect(component.duration).toBe(69);
  });

  it('should emit false value if cancel button clicked', () => {
    const spy = spyOn(component.changeCourse, 'emit');
    const cancelBtn = fixture.nativeElement.querySelector('.course__cancel');

    cancelBtn.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should update course data after user edited course', () => {
    const spy = spyOn(service, 'updateCourse');
    const spyChange = spyOn(component.changeCourse, 'emit');
    const saveBtn = fixture.nativeElement.querySelector('.course__save');

    component.courseId = '1';
    saveBtn.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalled();
    expect(spyChange).toHaveBeenCalledWith(true);
  });

  it('should create course after user add course', () => {
    const spy = spyOn(service, 'createCourse');
    const spyChange = spyOn(component.changeCourse, 'emit');
    const saveBtn = fixture.nativeElement.querySelector('.course__save');

    saveBtn.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalled();
    expect(spyChange).toHaveBeenCalledWith(true);
  });
});
