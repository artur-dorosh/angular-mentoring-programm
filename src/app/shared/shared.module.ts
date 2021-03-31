import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';

export const routes: Routes = [
  {
    path: '',
    component: ErrorComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  declarations: [ ErrorComponent, LoadingPageComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ LoadingPageComponent ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
