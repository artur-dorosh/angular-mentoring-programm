import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesFeatureKey, ICoursesState } from './courses.reducer';

export const selectCoursesState = createFeatureSelector<ICoursesState>(coursesFeatureKey);

export const selectCourses = createSelector(
  selectCoursesState,
  (state: ICoursesState) => state.courses,
);

export const selectCurrentCourse = createSelector(
  selectCoursesState,
  (state: ICoursesState) => state.currentCourse,
);

export const selectCoursesLoading = createSelector(
  selectCoursesState,
  (state: ICoursesState) => state.isLoading,
);
