import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    const userInfo = {
      email: this.email,
      password: this.password,
      token: 'new user'
    };

    this.authService.login(userInfo);
    console.log('logged in successfully');
  }
}
