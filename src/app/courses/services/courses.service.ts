import { Injectable } from '@angular/core';
import { ICourse } from '../interfaces/course.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITEMS_PER_PAGE } from '../constants/pagination-settings';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) { }

  getCoursesList(query: string = '', coursesCount: number = ITEMS_PER_PAGE): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`courses?title_like=${query}&_limit=${coursesCount}`);
  }

  createCourse(course: ICourse): Observable<ICourse[]> {
    return this.http.post<ICourse[]>(`courses`, course);
  }

  getCourse(id: string): Observable<ICourse> {
    return this.http.get<ICourse>(`courses/${id}`);
  }

  updateCourse(course: ICourse): Observable<ICourse[]> {
    return this.http.put<ICourse[]>(`courses/${course.id}`, course);
  }

  removeCourse(id: string): Observable<void> {
    return this.http.delete<void>(`courses/${id}`);
  }
}
