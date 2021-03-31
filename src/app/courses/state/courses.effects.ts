import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createCourse, createCourseSuccess,
  deleteCourse,
  deleteCourseSuccess,
  loadCourse,
  loadCourses,
  loadCoursesSuccess,
  loadCourseSuccess, updateCourse, updateCourseSuccess
} from './courses.actions';
import { map, switchMap, tap } from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';
import { ICourse } from '../interfaces/course.interface';
import { Router } from '@angular/router';

@Injectable()
export class CoursesEffects {

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private router: Router,
  ) {}

  loadCourses$ = createEffect(() => this.actions$.pipe(
    ofType(loadCourses),
    switchMap(({ query, coursesCount }) => this.coursesService.getCoursesList(query, coursesCount).pipe(
      map((courses: ICourse[]) => loadCoursesSuccess({ courses })),
    )),
  ));

  loadCourse$ = createEffect(() => this.actions$.pipe(
    ofType(loadCourse),
    switchMap(({ id }) => this.coursesService.getCourse(id).pipe(
      tap(() => this.router.navigate([`courses/${id}`])),
      map((course: ICourse) => loadCourseSuccess({ course })),
    )),
  ));

  deleteCourse$ = createEffect(() => this.actions$.pipe(
    ofType(deleteCourse),
    switchMap(({ id }) => this.coursesService.removeCourse(id).pipe(
      map(() => deleteCourseSuccess({ id })),
    )),
  ));

  createCourse$ = createEffect(() => this.actions$.pipe(
    ofType(createCourse),
    switchMap(({ course }) => this.coursesService.createCourse(course).pipe(
      map(() => createCourseSuccess({ course })),
      tap(() => this.router.navigate(['courses'])),
    )),
  ));

  updateCourse$ = createEffect(() => this.actions$.pipe(
    ofType(updateCourse),
    switchMap(({ course }) => this.coursesService.updateCourse(course).pipe(
      map(() => updateCourseSuccess({ course })),
      tap(() => this.router.navigate(['courses'])),
    )),
  ));
}
