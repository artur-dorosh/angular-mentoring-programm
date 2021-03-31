import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAuthState } from '../../state/auth.reducer';
import { login } from '../../state/auth.actions';
import { selectAuthorizationLoading } from '../../state/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  email: string;
  password: string;

  isLoading$: Observable<boolean> = this.store.select(selectAuthorizationLoading);

  private onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private store: Store<IAuthState>
  ) { }

  login(): void {
    const userInfo = {
      email: this.email,
      password: this.password,
      token: 'newUser'
    };

    this.store.dispatch(login({ userInfo }));
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
