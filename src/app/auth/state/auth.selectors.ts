import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, IAuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<IAuthState>(authFeatureKey);

export const selectUser = createSelector(
  selectAuthState,
  (state: IAuthState) => state.user,
);

export const selectToken = createSelector(
  selectAuthState,
  (state: IAuthState) => state.user.token,
);

export const selectAuthorizationLoading = createSelector(
  selectAuthState,
  (state: IAuthState) => state.isLoading,
);
