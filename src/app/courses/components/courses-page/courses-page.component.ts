import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../interfaces/course.interface';
import { CoursesService } from '../../services/courses.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  public courses: ICourse[] = this.coursesService.getCoursesList();

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  search(value: string): void {
    this.courses = value ?
      this.courses.filter(course => course.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())) :
      this.coursesService.getCoursesList();
  }

  deleteCourse(id: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      panelClass: 'confirmation-popup',
      data: {
        header: 'Do you really want to delete this course?',
      }
    }).afterClosed().pipe(
      take(1),
      filter(value => value)
    ).subscribe(() => this.courses = this.coursesService.removeCourse(id));
  }

}
