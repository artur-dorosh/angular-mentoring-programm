import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

const userInfo = {
  email: 'doroshartemii@gmail.com',
  password: 'user1',
  token: 'new user'
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => service = TestBed.get(AuthService));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user to local storage', () => {
    const spy = spyOn(localStorage, 'setItem');

    service.login(userInfo);

    expect(spy).toHaveBeenCalledWith('userInfo', JSON.stringify(userInfo));
  });

  it('should remove user from local storage', () => {
    const spy = spyOn(localStorage, 'removeItem');

    service.logout();

    expect(spy).toHaveBeenCalledWith('userInfo');
  });

  it('should check does user logged in', () => {
    const spy = spyOn(localStorage, 'getItem');

    service.isAuthenticated();

    expect(spy).toHaveBeenCalledWith('userInfo');
  });

  it('should get user info from local storage', () => {
    const spy = spyOn(localStorage, 'getItem');

    service.getUserInfo();

    expect(spy).toHaveBeenCalledWith('userInfo');
  });
});
