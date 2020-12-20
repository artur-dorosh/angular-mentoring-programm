import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICourse } from '../../../interfaces/course.interface';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  @Input() courses: ICourse[];

  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  loadMore(): void {
    console.log('Loading more courses...');
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }

}
