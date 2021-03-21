import { Injectable } from '@angular/core';
import { ICourse } from '../interfaces/course.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITEMS_PER_PAGE } from '../constants/pagination-settings';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  currentCourseId: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) { }

  getCoursesList(coursesCount: number = ITEMS_PER_PAGE): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`http://localhost:3000/courses?_limit=${coursesCount}`);
  }

  getFilteredCourses(query: string, coursesCount: number = ITEMS_PER_PAGE): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`http://localhost:3000/courses?title_like=${query}`);
  }

  createCourse(course: ICourse): Observable<ICourse[]> {
    return this.http.post<ICourse[]>(`http://localhost:3000/courses`, course);
  }

  getCourse(id: string): Observable<ICourse> {
    return this.http.get<ICourse>(`http://localhost:3000/courses/${id}`);
  }

  updateCourse(course: ICourse): Observable<ICourse[]> {
    return this.http.put<ICourse[]>(`http://localhost:3000/courses/${course.id}`, course);
  }

  removeCourse(id: string): Observable<ICourse[]> {
    return this.http.delete<ICourse[]>(`http://localhost:3000/courses/${id}`);
  }
}
