import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { CoursesService } from '../../services/courses.service';
import { ICourse } from '../../interfaces/course.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ICoursesState } from '../../state/courses.reducer';
import { select, Store } from '@ngrx/store';
import { selectCoursesLoading, selectCurrentCourse } from '../../state/courses.selectors';
import { takeUntil } from 'rxjs/operators';
import * as CoursesActions from '../../state/courses.actions';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCourseComponent implements OnInit, OnDestroy {
  title: string;
  description: string;
  date: string;
  duration: number;

  readonly isLoading$: Observable<boolean> = this.store.select(selectCoursesLoading);

  private currentCourse$: BehaviorSubject<ICourse> = new BehaviorSubject<ICourse>(null);
  private onDestroy$: Subject<ICourse> = new Subject<ICourse>();

  constructor(
    private coursesService: CoursesService,
    private store: Store<ICoursesState>,
  ) {
    this.store.pipe(
      select(selectCurrentCourse),
      takeUntil(this.onDestroy$),
    ).subscribe((course: ICourse) => this.currentCourse$.next(course));
  }

  ngOnInit(): void {
    this.initCourse(this.currentCourse$.getValue());
  }

  initCourse(course: ICourse): void {
    if (course) {
      this.title = course.title;
      this.description = course.description;
      this.date = course.creationDate;
      this.duration = course.duration;
    }
  }

  save(): void {
    this.currentCourse$.getValue() ? this.updateCourse() : this.addCourse();
  }

  addCourse(): void {
    const course = {
      id: uuid(),
      title: this.title,
      description: this.description,
      creationDate: this.date,
      duration: this.duration,
      topRated: false
    };

    this.store.dispatch(CoursesActions.createCourse({ course }));
  }

  updateCourse(): void {
    const course = {
      ...this.currentCourse$.getValue(),
      title: this.title,
      description: this.description,
      creationDate: this.date,
      duration: this.duration,
    };

    this.store.dispatch(CoursesActions.updateCourse({ course }));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
