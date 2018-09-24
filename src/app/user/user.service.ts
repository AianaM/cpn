import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';
import {AppService} from '../app.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly api = environment.api;

    readonly currentUser$ = this.auth.currentUser$;

    constructor(private http: HttpClient, private auth: AuthService, public app: AppService) {
    }

    get redirectUrl() {
        return this.auth.redirectUrl;
    }

    registration(data: any) {
        this.http.post(`${this.api}/users`, data).subscribe(user => {
            this.auth.login({username: data.email, password: data.password});
        });
    }
}
