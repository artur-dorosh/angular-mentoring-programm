import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAuthState } from './auth/state/auth.reducer';
import { Observable } from 'rxjs';
import { selectToken } from './auth/state/auth.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<IAuthState>) {
    this.isLoggedIn$ = this.store.pipe(
      select(selectToken),
      map((token: string) => !!token),
    );
  }
}
