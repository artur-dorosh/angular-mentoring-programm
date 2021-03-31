import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAuthState } from '../../../auth/state/auth.reducer';
import { logout } from '../../../auth/state/auth.actions';
import { Observable } from 'rxjs';
import { selectToken, selectUser } from '../../../auth/state/auth.selectors';
import { map } from 'rxjs/operators';
import { IUserInfo } from '../../../auth/interfaces/user-info.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  currentUser$: Observable<IUserInfo>;
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<IAuthState>) {
    this.currentUser$ = this.store.pipe(select(selectUser));
    this.isLoggedIn$ = this.store.pipe(
      select(selectToken),
      map(Boolean),
    );
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
