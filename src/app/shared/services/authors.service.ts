import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthor } from '../interfaces/author.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private http: HttpClient) {}

  getAuthors(query: string): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>('authors').pipe(
      map((authors: IAuthor[]) => authors.filter(
        (author: IAuthor) =>
          author.firstName.toLocaleLowerCase().includes(query)
          || author.lastName.toLocaleLowerCase().includes(query)
      )),
    );
  }
}
