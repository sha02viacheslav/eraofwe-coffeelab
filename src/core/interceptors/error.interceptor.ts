import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const router = this.injector.get(Router);
        return next.handle(request).pipe(
            mergeMap((event: any) => {
                if (event instanceof HttpResponse) {
                    switch (event.body.response_code) {
                        case 410: {
                            router.navigate(['/error/post-not-found']);
                            break;
                        }
                    }
                }
                return of(event);
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent || error.message === 'URL_NOT_FOUND') {
                    router.navigate(['/error/internal-server-error']);
                } else {
                    router.navigate(['/error/network-connection-error']);
                }
                return throwError(error);
            }),
        );
    }
}
