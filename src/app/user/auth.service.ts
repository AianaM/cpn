import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import {AppService} from '../app.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly api = environment.api;

    private refreshTokenInProgress = false;
    private _token = new BehaviorSubject(null);
    readonly token$ = this._token.asObservable().pipe(
        map(token => {
            if (this.isExpired(token) && !!localStorage.getItem('_auth')) {
                this.refreshToken();
                token = undefined;
            }
            return token;
        })
    );

    private _currentUser = new BehaviorSubject(undefined);

    redirectUrl: string;

    constructor(private http: HttpClient, public app: AppService) {}

    get currentUser$() {
        if (this._currentUser.value === undefined) {
            console.log('CURRENT USER CREATED');
            this.token$.pipe(
                switchMap(token => token ? this.http.get<any>(`${this.api}/authState`) : of(token)),
            ).subscribe(user => this._currentUser.next(user || null));
        }
        return this._currentUser.asObservable();
    }

    private refreshToken() {
        if (localStorage.getItem('_auth') && !this.refreshTokenInProgress) {
            this.refreshTokenInProgress = true;
            this.http.post(`${this.api}/token/refresh`, {refresh_token: localStorage.getItem('_auth')})
                .subscribe((data: any) => {
                        this.saveTokens(data);
                        this.refreshTokenInProgress = false;
                    },
                    error => {
                        console.error('token_refresh ERROR', error);
                        this.removeTokens();
                    });
        }
    }

    private saveTokens(data) {
        localStorage.setItem('_auth', data.refresh_token);
        this._token.next(data.token);
    }

    private removeTokens() {
        console.log('TOKENS REMOVED');
        localStorage.removeItem('_auth');
        this._token.next(null);
    }

    private isExpired(token: string) {
        if (!token) {
            return true;
        }
        const decoded = jwt_decode(token);
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date.valueOf() < new Date().valueOf();
    }

    login(data: any) {
        this.http.post(`${this.api}/login_check`, data).subscribe((val: any) => this.saveTokens(val));
    }

    logout() {
        this.http.get(`${this.api}/logout`).subscribe(() => this.removeTokens());
    }

}
