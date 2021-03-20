import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BorderingDirective } from './bordering.directive';
import { Component } from '@angular/core';

@Component({
  template: `<div [appBordering]="course"></div>`
})
class TestBorderingComponent {
  course = {
    id: '1',
    title: 'mock title',
    creationDate: '2012-12-12',
    duration: 86,
    description: 'mock description',
    topRated: true,
  };
}

describe('Directive: BorderingDirective', () => {
  let component: TestBorderingComponent;
  let fixture: ComponentFixture<TestBorderingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BorderingDirective,
        TestBorderingComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBorderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not add border to block', () => {
    const block = fixture.nativeElement.querySelector('div');

    expect(block.style.border).toBe('');
  });

  it('should add to block green border', () => {
    const block = fixture.nativeElement.querySelector('div');
    const date = new Date();

    component.course = {
      ...component.course,
      creationDate: new Date(date.setDate(date.getDate() - 1)).toString()
    };
    fixture.detectChanges();

    expect(block.style.border).toBe('3px solid rgb(71, 201, 14)');
  });

  it('should add to block blue border', () => {
    const block = fixture.nativeElement.querySelector('div');
    const date = new Date();

    component.course = {
      ...component.course,
      creationDate: new Date(date.setDate(date.getDate() + 1)).toString()
    };
    fixture.detectChanges();

    expect(block.style.border).toBe('3px solid rgb(0, 200, 255)');
  });
});
