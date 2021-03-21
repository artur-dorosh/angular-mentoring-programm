import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../interfaces/course.interface';
import { CoursesService } from '../../services/courses.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { filter, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const itemsPerPage = 2;

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  courses$: Observable<ICourse[]>;
  currentlyChangeCourse = false;

  currentCourseId: string;

  private coursesCount = itemsPerPage;

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.courses$ = this.coursesService.getCoursesList();
  }

  search(value: string): void {
    this.courses$ = value ? this.coursesService.getFilteredCourses(value) : this.coursesService.getCoursesList();
  }

  deleteCourse(id: string): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      panelClass: 'confirmation-popup',
      data: {
        header: 'Do you really want to delete this course?',
      }
    }).afterClosed().pipe(
      take(1),
      filter(Boolean),
      switchMap(() => this.coursesService.removeCourse(id))
    ).subscribe(() => this.courses$ = this.coursesService.getCoursesList());
  }

  editCourse(id: string): void {
    this.currentlyChangeCourse = true;
    this.currentCourseId = id;
  }

  updateCoursesList(value: boolean): void {
    if (value) {
      this.courses$ = this.coursesService.getCoursesList();
    }
    this.currentlyChangeCourse = false;
  }

  loadMore(): void {
    this.coursesCount += itemsPerPage;

    this.courses$ = this.coursesService.getCoursesList(this.coursesCount);
  }
}
