import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../user/auth.service';
import {User} from '../user/user';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
        .pipe(
            map(result => result.matches)
        );
    user: User;
    loadState$ = this.auth.app.loaderState$;

    navLinks = [];

    constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService) {
    }

    ngOnInit() {
        this.auth.currentUser$.subscribe(user => {
            this.user = user;
            this.navLinks = user ? [
                    {path: '/index', label: 'Главная'},
                    {path: '/stream', label: 'Поток'},
                    {path: '/about', label: 'О нас'},
                    {path: '/realty', label: 'Квартиры'},
                    {path: '/news', label: 'INSTA'}
                ]
                : [
                    {path: '/index', label: 'Главная'},
                    {path: '/about', label: 'О нас'},
                    {path: '/realty', label: 'Квартиры'},
                    {path: '/news', label: 'INSTA'}
                ];
        });
    }

    logout() {
        this.auth.logout();
    }

    onSideOpenedChange(event) {
        this.auth.app.sideOpened = event;
    }
}
