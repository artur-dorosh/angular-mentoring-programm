import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then((module) => module.CoursesModule)
  }, {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((module) => module.AuthModule)
  }, {
    path: 'error/404',
    loadChildren: () => import('./shared/shared.module').then((module) => module.SharedModule)
  }, {
    path: '**',
    redirectTo: '/error/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
