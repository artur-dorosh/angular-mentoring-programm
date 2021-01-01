import { AfterViewInit, Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { ICourse } from '../interfaces/course.interface';

@Directive({
  selector: '[appBordering]'
})
export class BorderingDirective implements OnChanges {
  @Input('appBordering') private course: ICourse;

  constructor(private element: ElementRef) { }

  ngOnChanges(): void {
    // 1000 * 60 * 60 * 24 * 14 = 12096e5 in milliseconds
    if (new Date(this.course.creationDate) < new Date() && new Date(this.course.creationDate) >= new Date(Date.now() - 12096e5)) {
      this.element.nativeElement.style.border = '3px solid #47c90e';
    } else if (new Date(this.course.creationDate) > new Date()) {
      this.element.nativeElement.style.border = '3px solid #00c8ff';
    }
  }
}
