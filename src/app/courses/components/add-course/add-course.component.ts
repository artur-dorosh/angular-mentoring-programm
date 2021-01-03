import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { CoursesService } from '../../services/courses.service';
import { ICourse } from '../../interfaces/course.interface';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  @Input() courseId: string;

  @Output() changeCourse: EventEmitter<boolean> = new EventEmitter<boolean>();

  title: string;
  description: string;
  date: string;
  duration: number;

  private currentCourse: ICourse;

  constructor(private courseService: CoursesService) { }

  ngOnInit(): void {
    if (this.courseId) {
      this.currentCourse = this.courseService.getCourse(this.courseId);
      this.title = this.currentCourse.title;
      this.description = this.currentCourse.description;
      this.date = this.currentCourse.creationDate;
      this.duration = this.currentCourse.duration;
    }
  }

  onChange(value: boolean): void {
    this.changeCourse.emit(value);
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
    this.onChange(true);
  }
}
