import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const BASE_API_URL = 'http://localhost:3000/';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  // tslint:disable-next-line:no-any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiRequest = request.clone({
      url: `${BASE_API_URL}${request.url}`
    });

    return next.handle(apiRequest);
  }
}
