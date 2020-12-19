import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICourse } from '../../../interfaces/course.interface';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  @Input() course: ICourse;

  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(): void {
    this.delete.emit(this.course.id);
  }

}
