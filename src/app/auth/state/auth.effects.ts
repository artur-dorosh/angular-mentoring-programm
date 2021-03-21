import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { catchError, exhaustMap, filter, map, tap } from 'rxjs/operators';
import { IUserInfo } from '../interfaces/user-info.interface';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    exhaustMap(({ userInfo }) => this.authService.login(userInfo).pipe(
      filter((users: IUserInfo[]) => !!users.length),
      map((users: IUserInfo[]) => AuthActions.loginSuccess({ user: users[0] })),
      tap(({ user }) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['courses']);
      }),
      catchError(() => AuthActions.loginFailed)
    )),
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      localStorage.removeItem('user');
      this.router.navigate(['authorization/login']);
    }),
    map(() => AuthActions.logoutSuccess()),
  ));
}
