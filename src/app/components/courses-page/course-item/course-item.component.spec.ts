import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = {
      id: 1,
      title: '',
      creationDate: '',
      duration: '',
      description: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display right data', () => {
    component.course = {
      id: 1,
      title: 'JavaScript. Basic knowledge',
      creationDate: '9 Nov, 2018',
      duration: '1h 20min',
      description: 'Learn about where you can find course descriptions, what information they include, how they work, ' +
        'and detail about various components of a course description. Learn about where you can find course descriptions, what ' +
        'information they include, how they work, and detail about various components of a course description.'
    };
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.course-details__title').innerText).toBe('JavaScript. Basic knowledge');
    expect(fixture.nativeElement.querySelector('.course-details__duration').innerText).toBe('schedule\n1h 20min');
    expect(fixture.nativeElement.querySelector('.course-details__created').innerText).toBe('today\n9 Nov, 2018');
    expect(fixture.nativeElement.querySelector('.course-details__description').innerText).toBe('Learn about where you can find ' +
      'course descriptions, what information they include, how they work, and detail about various components of a course description. ' +
      'Learn about where you can find course descriptions, what information they include, how they work, and detail about various ' +
      'components of a course description.');
  });

  it('should delete', () => {
    const spy = spyOn(component.delete, 'emit');
    const deleteBtn = fixture.nativeElement.querySelector('.course-actions__delete');
    component.course = {
      id: 1,
      title: 'JavaScript. Basic knowledge',
      creationDate: '9 Nov, 2018',
      duration: '1h 20min',
      description: 'Learn about where you can find course descriptions, what information they include, how they work, ' +
        'and detail about various components of a course description. Learn about where you can find course descriptions, what ' +
        'information they include, how they work, and detail about various components of a course description.'
    };
    fixture.detectChanges();

    deleteBtn.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledWith(1);
  });
});
