import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { LogoComponent } from './components/logo/logo.component';
import { SearchComponent } from './components/courses-page/search/search.component';
import { CoursesListComponent } from './components/courses-page/courses-list/courses-list.component';
import { CourseItemComponent } from './components/courses-page/course-item/course-item.component';
import { BorderingDirective } from './directives/bordering.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { coursesFeatureKey, coursesReducer } from './state/courses.reducer';
import { CoursesEffects } from './state/courses.effects';

export const routes: Routes = [
  {
    path: 'courses',
    component: CoursesPageComponent,
    canActivate: [ AuthGuard ],
    pathMatch: 'full',
  }, {
    path: 'courses/new',
    component: AddCourseComponent,
    canActivate: [ AuthGuard ],
  }, {
    path: 'courses/:id',
    component: AddCourseComponent,
    canActivate: [ AuthGuard ],
  },
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CoursesPageComponent,
    BreadcrumbsComponent,
    LogoComponent,
    SearchComponent,
    CoursesListComponent,
    CourseItemComponent,
    BorderingDirective,
    DurationPipe,
    OrderByPipe,
    ConfirmationDialogComponent,
    AddCourseComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature(coursesFeatureKey, coursesReducer),
    EffectsModule.forFeature([CoursesEffects]),
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CoursesPageComponent,
    BreadcrumbsComponent,
    LogoComponent,
  ],
  entryComponents: [ ConfirmationDialogComponent ]
})
export class CoursesModule { }
