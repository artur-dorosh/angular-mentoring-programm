import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesListComponent } from './courses-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OrderByPipe } from '../../../pipes/order-by.pipe';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        OrderByPipe
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    component.courses = [
      {
        id: 1,
        title: 'mock title',
        creationDate: '2012-12-12',
        duration: 86,
        description: 'mock description',
        topRated: true,
      },
      {
        id: 2,
        title: 'mock title2',
        creationDate: '2012-12-12',
        duration: 86,
        description: 'mock description2',
        topRated: true,
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have right mock data', () => {
    expect(component.courses.length).toBe(2);
  });

  it('should invoke loadMore function after load button clicked', () => {
    const loadBtn = fixture.nativeElement.querySelector('.load-more');
    const spy = spyOn(console, 'log');

    loadBtn.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledWith('Loading more courses...');
  });

  it('should invoke deleteItem function after delete button clicked', () => {
    const spy = spyOn(component.delete, 'emit');

    component.onDelete(3);

    expect(spy).toHaveBeenCalledWith(3);
  });
});
