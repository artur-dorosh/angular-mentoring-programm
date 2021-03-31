import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error-page/error.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { DateControlComponent } from './components/date-control/date-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { DurationControlComponent } from './components/duration-control/duration-control.component';
import { AuthorsControlComponent } from './components/authors-control/authors-control.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authorsFeatureKey, authorsReducer } from './state/authors.reducer';
import { AuthorsEffects } from './state/authors.effects';

export const routes: Routes = [
  {
    path: '',
    component: ErrorComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  declarations: [
    ErrorComponent,
    LoadingPageComponent,
    DateControlComponent,
    DurationControlComponent,
    AuthorsControlComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    StoreModule.forFeature(authorsFeatureKey, authorsReducer),
    EffectsModule.forFeature([AuthorsEffects]),
  ],
  exports: [
    LoadingPageComponent,
    DateControlComponent,
    DurationControlComponent,
    AuthorsControlComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
