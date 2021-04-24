import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAuthState } from './auth/state/auth.reducer';
import { Observable } from 'rxjs';
import { selectToken } from './auth/state/auth.selectors';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private store: Store<IAuthState>,
    private translateService: TranslateService,
  ) {
    this.isLoggedIn$ = this.store.pipe(
      select(selectToken),
      map((token: string) => !!token),
    );
  }

  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
  }
}
