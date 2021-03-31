import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { delay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ICourse } from '../../interfaces/course.interface';
import { ICoursesState } from '../../state/courses.reducer';
import { select, Store } from '@ngrx/store';
import { selectCurrentCourse } from '../../state/courses.selectors';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  courseTitle$: Observable<string>;

  constructor(
    public coursesService: CoursesService,
    private store: Store<ICoursesState>,
  ) {
    this.courseTitle$ = this.store.pipe(
      select(selectCurrentCourse),
      delay(0),
      map((course: ICourse) => course ? course.title : null)
    );
  }
}
