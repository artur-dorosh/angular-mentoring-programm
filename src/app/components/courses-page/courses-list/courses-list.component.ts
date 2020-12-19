import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from '../../../interfaces/course.interface';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  @Input() courses: ICourse[];

  constructor() { }

  ngOnInit(): void {
  }

  loadMore(): void {
    console.log('Loading more courses...');
  }

  deleteItem(id: number): void {
    console.log(`You want to delete course with id=${id}`);
  }

}
