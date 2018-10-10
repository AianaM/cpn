import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError, filter, finalize, first, switchMap} from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.auth.app.setLoad(true);
        return this.auth.token$.pipe(
            filter(token => token !== undefined || req.url.includes('login_check') || req.url.includes('token/refresh')),
            first(),
            switchMap(token => {
                if (token && !req.url.includes('login_check') && !req.url.includes('token/refresh')
                && !req.url.match(/api.instagram.com/gi)) {
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }
                if (!req.url.match(/api.instagram.com/gi) && !(req.url.match(/media_objects/gi) && req.method === 'POST')) {
                    req = req.clone({
                        setHeaders: {
                            'Content-Type': 'application/ld+json'
                        }
                    });
                }
                return next.handle(req);
            }),
            catchError(error => {
                if (error.error instanceof ErrorEvent) {
                    throwError('An error occurred:', error.error.message);
                } else {
                    if ((<HttpErrorResponse>error).status === 401) {
                        this.auth.app.openSnackBar('Доступ запрещен');
                    }
                }
                this.auth.app.openSnackBar(error.error['hydra:description'] || 'Произошла ошибка, обратитесь к администратору');

                return throwError('Something bad happened; please try again later.');
            }),
            finalize(() => {
                this.auth.app.setLoad(false);
            })
        );
    }
}
