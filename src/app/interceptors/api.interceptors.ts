import {
    HttpEvent,
    HttpHandlerFn,
    HttpRequest
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { catchError, finalize } from 'rxjs/operators';
  
  export function apiInterceptor(
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<unknown>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      }
    });
  
    return next(modifiedRequest).pipe(
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => error);
      }),
      finalize(() => {
        // Clean up or logging logic here
      })
    );
  }
  
  function getToken(): string {
    return localStorage.getItem('auth_token') || '';
  }