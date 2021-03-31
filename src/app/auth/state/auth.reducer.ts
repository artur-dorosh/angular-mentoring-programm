import { Action, createReducer, on } from '@ngrx/store';
import { IUserInfo } from '../interfaces/user-info.interface';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'user';

export interface IAuthState {
  user: IUserInfo;
  isLoading: boolean;
}

export const initialState: IAuthState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {
    email: '',
    password: '',
    token: '',
  },
  isLoading: false,
};

export const reducer = createReducer(
  initialState,

  on(
    AuthActions.login,
    AuthActions.logout,
    (state: IAuthState) => ({ ...state, isLoading: true })
  ),

  on(
    AuthActions.loginFailed,
    AuthActions.logoutFailed,
    (state: IAuthState) => ({ ...state, isLoading: false })
  ),

  on(AuthActions.loginSuccess, (state: IAuthState, { user }) => ({ ...state, user, isLoading: false })),

  on(AuthActions.logoutSuccess, (state: IAuthState) => ({ ...state, user: {}, isLoading: false }))
);

// tslint:disable-next-line:no-any
export function authReducer(state: IAuthState | undefined, action: Action): any {
  return reducer(state, action);
}
