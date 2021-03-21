import { Injectable } from '@angular/core';
import { IUserInfo } from '../interfaces/user-info.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get getToken(): string {
    return this.token;
  }

  currentUser$: BehaviorSubject<IUserInfo> = new BehaviorSubject<IUserInfo>(null);

  private token = 't';

  constructor(private http: HttpClient) { }

  login(userInfo: IUserInfo): Observable<IUserInfo> {
    return this.getUserInfo(userInfo).pipe(
      filter((users: IUserInfo[]) => !!users.length),
      map((users: IUserInfo[]) => users[0]),
      tap((user: IUserInfo) => {
        this.token = user.token;
        this.currentUser$.next(user);
      })
    );
  }

  logout(): void {
    this.token = '';
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getUserInfo(userInfo: IUserInfo): Observable<IUserInfo[]> {
    return this.http.get<IUserInfo[]>(`http://localhost:3000/users?login=${userInfo.email}&password=${userInfo.password}`);
  }
}
