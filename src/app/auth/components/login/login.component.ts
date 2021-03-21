import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  email = '';
  password = '';

  private onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(): void {
    const userInfo = {
      email: this.email,
      password: this.password,
      token: 'newUser'
    };

    this.authService.login(userInfo).pipe(
      takeUntil(this.onDestroy),
    ).subscribe(() => {
      this.router.navigate(['../courses']);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
