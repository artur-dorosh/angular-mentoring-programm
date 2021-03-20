import { Component, OnDestroy, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { CoursesService } from '../../services/courses.service';
import { ICourse } from '../../interfaces/course.interface';
import { ActivatedRoute } from '@angular/router';

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

  get getCourseId(): string {
    return this.courseId;
  }

  set setCourseId(id: string) {
    this.courseId = id;
  }

  private currentCourse: ICourse;
  private courseId: string;

  constructor(
    private courseService: CoursesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.id;

    if (this.courseId) {
      this.courseService.currentCourseId.next(this.courseId);
      this.currentCourse = this.courseService.getCourse(this.courseId);
      console.log(this.currentCourse);
      this.initCourse(this.currentCourse);
    }
  }

  initCourse(course: ICourse): void {
    this.title = course.title;
    this.description = course.description;
    this.date = course.creationDate;
    this.duration = course.duration;
  }

  addCourse(): void {
    let course;

    if (this.courseId) {
      course = {
        ...this.currentCourse,
        title: this.title,
        description: this.description,
        creationDate: this.date,
        duration: this.duration,
      };
    } else {
      course = {
        id: uuid(),
        title: this.title,
        description: this.description,
        creationDate: this.date,
        duration: this.duration,
        topRated: false
      };
    }

    this.courseId ? this.courseService.updateCourse(course) : this.courseService.createCourse(course);
  }

  ngOnDestroy(): void {
    this.courseService.currentCourseId.next('');
  }
}
