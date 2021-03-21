import { Injectable } from '@angular/core';
import { IUserInfo } from '../interfaces/user-info.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  login(userInfo: IUserInfo): Observable<IUserInfo[]> {
    return this.getUserInfo(userInfo);
  }

  private getUserInfo(userInfo: IUserInfo): Observable<IUserInfo[]> {
    return this.http.get<IUserInfo[]>(`users?email=${userInfo.email}&password=${userInfo.password}`);
  }
}
