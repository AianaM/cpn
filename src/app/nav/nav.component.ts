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

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );
    user: User;
    loadState$ = this.auth.app.loaderState$;

    constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService) {
    }

    ngOnInit() {
        this.auth.currentUser$.subscribe(user => this.user = user);
    }

    logout() {
        this.auth.logout();
    }

}
