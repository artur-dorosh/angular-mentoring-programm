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
import { MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



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
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CoursesPageComponent,
    BreadcrumbsComponent,
    LogoComponent,
  ],
  entryComponents: [ConfirmationDialogComponent]
})
export class CoursesModule { }
