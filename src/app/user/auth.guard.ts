import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {first, map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        const url: string = state.url;

        return this.checkLogin(url);
    }

    canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
        // const url = `/${route.path}`;
        const url = window.location.pathname;

        return this.checkLogin(url);
    }

    checkLogin(url: string): Observable<boolean> {
        return this.auth.currentUser$.pipe(
            first(),
            map(user => !!user),
            tap(user => {
                if (!user) {
                    this.auth.app.openSnackBar('Доступ ограничен');
                    this.auth.redirectUrl = url;
                    this.router.navigate(['/login']);
                }
            })
        );
    }
}
