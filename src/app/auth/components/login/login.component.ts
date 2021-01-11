import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    const userInfo = {
      email: this.email,
      password: this.password,
      token: 'new user'
    };

    this.authService.login(userInfo);
    this.router.navigate(['../courses']);
    console.log('logged in successfully');
  }
}
