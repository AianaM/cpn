import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

    user = {
        username: null,
        password: null
    };

    hide = true;
    currentUser: Subscription;

    constructor(private auth: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.currentUser = this.auth.currentUser$.subscribe(user => {
            if (user) {
                if (this.auth.redirectUrl && this.auth.redirectUrl.match(/tools:form/gi)) {
                    const path = this.auth.redirectUrl.replace(/(^\/)|(\(.+$)/gi, '');
                    const id = this.auth.redirectUrl.replace(/(^.+form\/)|\)$/gi, '');

                    this.router.navigate([`/${path || 'realty'}`]).then(() => {
                        this.router.navigate([{outlets: {tools: ['form', id]}}]);
                    });
                    return;
                }
                this.router.navigate([this.auth.redirectUrl || '/user']);
            }
        });
    }

    ngOnDestroy() {
        this.currentUser.unsubscribe();
    }

    login() {
        this.auth.login(this.user);
    }
}
