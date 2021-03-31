import { createAction, props } from '@ngrx/store';
import { IUserInfo } from '../interfaces/user-info.interface';

// Login
export const login = createAction('[App] Login', props<{ userInfo: IUserInfo }>());
export const loginSuccess = createAction('[App] Login Success', props<{ user: IUserInfo }>());
export const loginFailed = createAction('[App] Login Failed');

// Logout
export const logout = createAction('[App] Logout');
export const logoutSuccess = createAction('[App] Logout Success');
export const logoutFailed = createAction('[App] Logout Failed');
