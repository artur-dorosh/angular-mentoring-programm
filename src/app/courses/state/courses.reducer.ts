import { ICourse } from '../interfaces/course.interface';
import { Action, createReducer, on } from '@ngrx/store';
import * as coursesActions from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface ICoursesState {
  courses: ICourse[];
  currentCourse: ICourse;
  isLoading: boolean;
}

export const initialCoursesState: ICoursesState = {
  courses: [],
  currentCourse: null,
  isLoading: false,
};

export const reducer = createReducer(
  initialCoursesState,

  on(
    coursesActions.loadCourses,
    coursesActions.loadCourse,
    coursesActions.deleteCourse,
    coursesActions.createCourse,
    coursesActions.updateCourse,
    (state: ICoursesState) => ({ ...state, isLoading: true })
  ),

  on(
    coursesActions.loadCoursesFailed,
    coursesActions.loadCourseFailed,
    coursesActions.deleteCourseFailed,
    coursesActions.createCourseFailed,
    coursesActions.updateCourseFailed,
    (state: ICoursesState) => ({ ...state, isLoading: false })
  ),

  on(coursesActions.loadCoursesSuccess, (state: ICoursesState, { courses }) => ({
    ...state,
    courses: [ ...courses ],
    isLoading: false,
  })),

  on(coursesActions.loadCourseSuccess, (state: ICoursesState, { course }) => ({
    ...state,
    currentCourse: course,
    isLoading: false,
  })),

  on(coursesActions.deleteCourseSuccess, (state: ICoursesState, { id }) => ({
    ...state,
    courses: state.courses.filter((course: ICourse) => course.id !== id),
    isLoading: false,
  })),

  on(coursesActions.createCourseSuccess, (state: ICoursesState, { course }) => ({
    ...state,
    courses: [ ...state.courses, course ],
    isLoading: false,
  })),

  on(coursesActions.updateCourseSuccess, (state: ICoursesState, { course }) => ({
    ...state,
    courses: state.courses.map((item: ICourse) => course.id === item.id ? course : item),
    isLoading: false,
  })),

  on(coursesActions.resetCurrentCourse, (state: ICoursesState) => ({
    ...state,
    currentCourse: null,
  })),
);

// tslint:disable-next-line:no-any
export function coursesReducer(state: ICoursesState | undefined, action: Action): any {
  return reducer(state, action);
}
