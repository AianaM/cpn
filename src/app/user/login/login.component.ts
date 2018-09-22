import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    user = {
        username: null,
        password: null
    };

    hide = true;

    constructor(private auth: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.auth.currentUser$.subscribe(user => {
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

    login() {
        this.auth.login(this.user);
    }

}
