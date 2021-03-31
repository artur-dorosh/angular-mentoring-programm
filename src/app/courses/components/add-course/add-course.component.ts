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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCourseComponent implements OnInit, OnDestroy {
  form: FormGroup;

  readonly isLoading$: Observable<boolean> = this.store.select(selectCoursesLoading);

  private currentCourse$: BehaviorSubject<ICourse> = new BehaviorSubject<ICourse>(null);
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private coursesService: CoursesService,
    private store: Store<ICoursesState>,
    private fb: FormBuilder,
  ) {
    this.store.pipe(
      select(selectCurrentCourse),
      takeUntil(this.onDestroy$),
    ).subscribe((course: ICourse) => this.currentCourse$.next(course));
  }

  ngOnInit(): void {
    this.initForm();
    this.initCourse(this.currentCourse$.getValue());
  }

  save(): void {
    this.currentCourse$.getValue() ? this.updateCourse() : this.addCourse();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      creationDate: ['', Validators.required],
      duration: ['', Validators.required],
      authors: [[], Validators.required],
    });
  }

  private initCourse(course: ICourse): void {
    if (course) {
      const { id, topRated, ...formValue } = course;
      this.form.setValue(formValue);
    }
  }

  private addCourse(): void {
    const course = {
      id: uuid(),
      ...this.form.value,
      topRated: false,
    };

    this.store.dispatch(CoursesActions.createCourse({ course }));
  }

  private updateCourse(): void {
    const course = {
      ...this.currentCourse$.getValue(),
      ...this.form.value,
    };

    this.store.dispatch(CoursesActions.updateCourse({ course }));
  }
}
