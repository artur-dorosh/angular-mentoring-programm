import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      providers: [AuthService],
    });
    guard = TestBed.inject(AuthGuard);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return truthy value if user authenticated', () => {
    const spy = spyOn(service, 'isAuthenticated').and.returnValue(true);

    expect(guard.canActivate()).toBeTruthy();
  });

  it('should return falsy value and redirect to login page if user does not authenticated', () => {
    const spy = spyOn(service, 'isAuthenticated').and.returnValue(false);

    expect(guard.canActivate()).toBeFalsy();
  });
});
