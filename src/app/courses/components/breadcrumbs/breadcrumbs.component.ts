import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { delay, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ICourse } from '../../interfaces/course.interface';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  courseTitle: string;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(public courseService: CoursesService) { }

  ngOnInit(): void {
    this.courseService.currentCourseId.pipe(
      delay(0),
      takeUntil(this.onDestroy$)
    ).subscribe(id => {
      if (id) {
        this.courseService.getCourse(id).subscribe((course: ICourse) => this.courseTitle = course.title);
      } else {
        this.courseTitle = '';
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
