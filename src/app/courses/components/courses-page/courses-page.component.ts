import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ICourse } from '../../interfaces/course.interface';
import { CoursesService } from '../../services/courses.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ITEMS_PER_PAGE } from '../../constants/pagination-settings';
import { Store } from '@ngrx/store';
import { ICoursesState } from '../../state/courses.reducer';
import { selectCourses, selectCoursesLoading } from '../../state/courses.selectors';
import * as CoursesActions from '../../state/courses.actions';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageComponent implements OnInit {
  readonly courses$: Observable<ICourse[]> = this.store.select(selectCourses);
  readonly isLoading$: Observable<boolean> = this.store.select(selectCoursesLoading);

  private coursesCount = ITEMS_PER_PAGE;

  constructor(
    private coursesService: CoursesService,
    private store: Store<ICoursesState>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses({ query: '', coursesCount: ITEMS_PER_PAGE }));
    this.store.dispatch(CoursesActions.resetCurrentCourse());
  }

  search(query: string): void {
    this.store.dispatch(CoursesActions.loadCourses({ query, coursesCount: ITEMS_PER_PAGE }));
  }

  deleteCourse(id: string): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      panelClass: 'confirmation-popup',
      data: {
        header: 'Do you really want to delete this course?',
      }
    }).afterClosed().pipe(
      take(1),
      filter(Boolean),
    ).subscribe(() => {
      this.store.dispatch(CoursesActions.deleteCourse({ id }));
    });
  }

  editCourse(id: string): void {
    this.store.dispatch(CoursesActions.loadCourse({ id }));
  }

  loadMore(): void {
    this.coursesCount += ITEMS_PER_PAGE;

    this.store.dispatch(CoursesActions.loadCourses({ query: '', coursesCount: this.coursesCount }));
  }
}
