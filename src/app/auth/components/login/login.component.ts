import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAuthState } from '../../state/auth.reducer';
import { login } from '../../state/auth.actions';
import { selectAuthorizationLoading } from '../../state/auth.selectors';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  isLoading$: Observable<boolean> = this.store.select(selectAuthorizationLoading);

  private onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private store: Store<IAuthState>,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  login(): void {
    const userInfo = {
      ...this.loginForm.value,
      token: 'newUser'
    };

    this.store.dispatch(login({ userInfo }));
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
}
