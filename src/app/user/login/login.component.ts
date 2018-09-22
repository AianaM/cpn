import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    currentUser;

    constructor(private auth: AuthService) {
        auth.token$.subscribe();
    }

    ngOnInit() {
        this.auth.token$.subscribe();
        this.auth.currentUser$.subscribe(user => {
            this.currentUser = user;
            console.log(user);
        });
    }

}
