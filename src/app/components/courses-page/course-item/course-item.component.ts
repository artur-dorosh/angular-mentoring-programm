import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Course} from '../../../models/course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  @Input() course: Course;

  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    this.delete.emit(this.course.id);
  }

}
