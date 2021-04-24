import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, authReducer } from './state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),
    TranslateModule,
  ],
  exports: [ LoginComponent ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthModule { }
