import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';

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
  exports: [ LoadingPageComponent ]
})
export class SharedModule { }
