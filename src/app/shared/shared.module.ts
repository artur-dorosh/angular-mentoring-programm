import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
  {
    path: '',
    component: ErrorComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SharedModule { }
