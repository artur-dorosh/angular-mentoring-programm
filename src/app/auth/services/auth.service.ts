import { Injectable } from '@angular/core';
import { IUserInfo } from '../interfaces/user-info.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(userInfo: IUserInfo): void {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  logout(): void {
    localStorage.removeItem('userInfo');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userInfo');
  }

  getUserInfo(): string {
    return localStorage.getItem('userInfo');
  }
}
