import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { IAuthState } from '../state/auth.reducer';
import { selectToken } from '../state/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<IAuthState>,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    return this.store.pipe(
      select(selectToken),
      map(Boolean),
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['authorization/login']);
        }
      })
    );
  }
}
