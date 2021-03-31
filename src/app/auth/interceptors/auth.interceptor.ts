import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IAuthState } from '../state/auth.reducer';
import { selectToken } from '../state/auth.selectors';
import { first, mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<IAuthState>) { }

  // tslint:disable-next-line:no-any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.pipe(
      select(selectToken),
      first(),
      mergeMap((token: string) => {
        const authRequest = token ? request.clone({
          headers: request.headers.set('Authorization', token),
        }) : request;

        return next.handle(authRequest);
      })
    )
  }
}
