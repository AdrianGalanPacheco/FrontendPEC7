import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ArticleAppInterceptor implements HttpInterceptor {
  // Receives the HTTP request and next
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Gets the token from the localStorage
    const token = localStorage.getItem('token');

    // If the token exists, clones the request, adds Authorization to the header and sends the request
    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(clonedReq);
    }
    // If the token does not exist, sends the original request
    return next.handle(req);
  }
}
