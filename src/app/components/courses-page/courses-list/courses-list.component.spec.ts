import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesListComponent } from './courses-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have right mock data', () => {
    expect(component.courses.length).toBe(3);
  });

  it('should', () => {
    const loadBtn = fixture.nativeElement.querySelector('.load-more');
    const spy = spyOn(console, 'log');

    loadBtn.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledWith('Loading more courses...');
  });

  it('should', () => {
    const spy = spyOn(console, 'log');

    component.deleteItem(3);

    expect(spy).toHaveBeenCalledWith('You want to delete course with id=3');
  });
});
