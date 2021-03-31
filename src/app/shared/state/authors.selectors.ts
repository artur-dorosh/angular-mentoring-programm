import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authorsFeatureKey, IAuthorsState } from './authors.reducer';

export const selectAuthorsState = createFeatureSelector<IAuthorsState>(authorsFeatureKey);

export const selectAuthors = createSelector(
  selectAuthorsState,
  (state: IAuthorsState) => state.authors,
);

export const selectAuthorsLoading = createSelector(
  selectAuthorsState,
  (state: IAuthorsState) => state.isLoading,
);
