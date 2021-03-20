import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule.withRoutes([]) ],
      declarations: [ LoginComponent ],
      providers: [ AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user with entered credentials', () => {
    const loginInput = fixture.nativeElement.querySelector('#email');
    const passwordInput = fixture.nativeElement.querySelector('#password');
    const loginBtn = fixture.nativeElement.querySelector('.login-form__login-btn');
    const spy = spyOn(authService, 'login');
    const logSpy = spyOn(console, 'log');

    const userInfo = {
      email: 'doroshartemii@gmail.com',
      password: 'user1',
      token: 'new user'
    };
    loginInput.value = 'doroshartemii@gmail.com';
    passwordInput.value = 'user1';

    loginInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    loginBtn.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledWith(userInfo);
    expect(logSpy).toHaveBeenCalledWith('logged in successfully');
  });
});
