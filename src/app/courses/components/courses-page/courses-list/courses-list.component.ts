import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICourse } from '../../../interfaces/course.interface';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  @Input() courses: ICourse[];

  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() edit: EventEmitter<string> = new EventEmitter<string>();
  @Output() addCourse: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  loadMore(): void {
    console.log('Loading more courses...');
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }

  onEdit(id: string): void {
    this.edit.emit(id);
  }

  onAddCourse(): void {
    this.addCourse.emit(true);
  }

}
