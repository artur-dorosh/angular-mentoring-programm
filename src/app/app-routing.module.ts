import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from './courses/components/courses-page/courses-page.component';
import { LoginComponent } from './auth/components/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: CoursesPageComponent,
  }, {
    path: 'login',
    component: LoginComponent,
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
