import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourse } from '../../../interfaces/course.interface';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses: ICourse[];

  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() edit: EventEmitter<string> = new EventEmitter<string>();
  @Output() loadMore: EventEmitter<void> = new EventEmitter<void>();

  onLoadMore(): void {
    this.loadMore.emit();
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }

  onEdit(id: string): void {
    this.edit.emit(id);
  }

}
