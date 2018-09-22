import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {filter, first, switchMap} from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.auth.token$.pipe(
            filter(token => token !== undefined || req.url.includes('login_check') || req.url.includes('token/refresh')),
            first(),
            switchMap(token => {
                if (token && !req.url.includes('login_check') && !req.url.includes('token/refresh')) {
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }
                return next.handle(req);
            })
        );
    }
}
