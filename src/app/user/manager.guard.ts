import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {first, map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        let navigate: string;

        return this.auth.currentUser$.pipe(
            first(),
            tap(user => navigate = user ? '/' : '/login'),
            map(user => user && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_MANAGER'))),
            tap(user => {
                if (!user) {
                    this.auth.app.openSnackBar('Доступ ограничен');
                    this.auth.redirectUrl = state.url;
                    this.router.navigate([navigate]);
                }
            })
        );
    }
}
