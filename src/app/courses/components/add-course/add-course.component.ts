import { Component, OnDestroy, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { CoursesService } from '../../services/courses.service';
import { ICourse } from '../../interfaces/course.interface';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit, OnDestroy {
  title: string;
  description: string;
  date: string;
  duration: number;

  courseId: string;

  private currentCourse$: BehaviorSubject<ICourse> = new BehaviorSubject<ICourse>(null);

  constructor(
    private courseService: CoursesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.id;

    if (this.courseId) {
      this.courseService.currentCourseId.next(this.courseId);
      this.courseService.getCourse(this.courseId).subscribe((course: ICourse) => {
        this.currentCourse$.next(course);
        this.initCourse(course);
      });
    }
  }

  initCourse(course: ICourse): void {
    this.title = course.title;
    this.description = course.description;
    this.date = course.creationDate;
    this.duration = course.duration;
  }

  addCourse(): void {
    const course = {
      id: uuid(),
      title: this.title,
      description: this.description,
      creationDate: this.date,
      duration: this.duration,
      topRated: false
    };

    this.courseService.createCourse(course).subscribe();
  }

  updateCourse(): void {
    const course = {
      ...this.currentCourse$.getValue(),
      title: this.title,
      description: this.description,
      creationDate: this.date,
      duration: this.duration,
    };

    this.courseService.updateCourse(course).subscribe();
  }

  ngOnDestroy(): void {
    this.courseService.currentCourseId.next('');
  }
}
