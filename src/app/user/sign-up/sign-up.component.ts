import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

    user = {
        email: null,
        name: {
            firstName: null,
            lastName: null
        },
        password: null
    };

    hide = true;

    currentUser: Subscription;

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.currentUser = this.userService.currentUser$.subscribe(user => {
            if (user) {
                if (this.userService.redirectUrl && this.userService.redirectUrl.match(/tools:form/gi)) {
                    const path = this.userService.redirectUrl.replace(/(^\/)|(\(.+$)/gi, '');
                    const id = this.userService.redirectUrl.replace(/(^.+form\/)|\)$/gi, '');

                    this.router.navigate([`/${path || 'realty'}`]).then(() => {
                        this.router.navigate([{outlets: {tools: ['form', id]}}]);
                    });
                    return;
                }
                this.router.navigate([this.userService.redirectUrl || '/user']);
            }
        });
    }

    ngOnDestroy() {
        this.currentUser.unsubscribe();
    }

    onSubmit() {
        this.userService.registration(this.user);
    }

}
