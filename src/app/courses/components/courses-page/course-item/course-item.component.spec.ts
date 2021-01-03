import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { BorderingDirective } from '../../../directives/bordering.directive';
import { DurationPipe } from '../../../pipes/duration.pipe';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseItemComponent,
        BorderingDirective,
        DurationPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = {
      id: '1',
      title: 'mock title',
      creationDate: '2012-12-12',
      duration: 86,
      description: 'mock description',
      topRated: true,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display right data', () => {
    expect(fixture.nativeElement.querySelector('.course-details__title').innerText.includes('mock title')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.course-details__duration').innerText.includes('1h 26min')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.course-details__created').innerText.includes('12 Dec, 2012')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.course-details__description').innerText).toBe('mock description');
  });

  it('should emit delete event after click delete button', () => {
    const spy = spyOn(component.delete, 'emit');
    const deleteBtn = fixture.nativeElement.querySelector('.course-actions__delete');

    deleteBtn.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledWith('1');
  });

  it('should emit delete event after click edit button', () => {
    const spy = spyOn(component.edit, 'emit');
    const editBtn = fixture.nativeElement.querySelector('.course-actions__edit');

    editBtn.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledWith('1');
  });
});
