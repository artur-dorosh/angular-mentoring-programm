import { createAction, props } from '@ngrx/store';
import { ICourse } from '../interfaces/course.interface';

// Courses Loading
export const loadCourses = createAction('[Courses Page] Load Courses', props<{ query: string, coursesCount: number }>());
export const loadCoursesSuccess = createAction('[Courses Page] Loading Courses Success', props<{ courses: ICourse[] }>());
export const loadCoursesFailed = createAction('[Courses Page] Loading Courses Failed');

// Course Loading
export const loadCourse = createAction('[Courses Page] Load Course', props<{ id: string }>());
export const loadCourseSuccess = createAction('[Courses Page] Loading Course Success', props<{ course: ICourse }>());
export const loadCourseFailed = createAction('[Courses Page] Loading Course Failed');

// Course Deleting
export const deleteCourse = createAction('[Courses Page] Delete Course', props<{ id: string }>());
export const deleteCourseSuccess = createAction('[Courses Page] Deleting Course Success', props<{ id: string }>());
export const deleteCourseFailed = createAction('[Courses Page] Deleting Course Failed');

// Course Creating
export const createCourse = createAction('[Add Course Page] Create Course', props<{ course: ICourse }>());
export const createCourseSuccess = createAction('[Add Course Page] Creating Course Success', props<{ course: ICourse }>());
export const createCourseFailed = createAction('[Add Course Page] Creating Course Failed');

// Course Updating
export const updateCourse = createAction('[Add Course Page] Update Course', props<{ course: ICourse }>());
export const updateCourseSuccess = createAction('[Add Course Page] Updating Course Success', props<{ course: ICourse }>());
export const updateCourseFailed = createAction('[Add Course Page] Updating Course Failed');

// Current Course Reseting
export const resetCurrentCourse = createAction('[Courses Page] Reset Current Course');
