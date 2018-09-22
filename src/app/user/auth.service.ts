import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly api = environment.api;

    private refreshTokenInProgress = false;
    private _token = new BehaviorSubject(undefined);
    readonly token$ = this._token.asObservable().pipe(
        map(token => {
            if (!token && localStorage.getItem('_auth')) {
                this.refreshToken();
                token = undefined;
            }
            return token;
        })
    );

    readonly currentUser$ = this.token$.pipe(
        switchMap(token => token ? this.http.get<any>(`${this.api}/authState`) : of(token))
    );

    private refreshCount = 0;

    constructor(private http: HttpClient) {
    }

    private refreshToken() {
        if (this.refreshCount > 3) {
            console.log('refresh MAX!!');
            return;
        }
        if (localStorage.getItem('_auth') && !this.refreshTokenInProgress) {
            this.refreshCount++;
            console.log('refreshTokenInProgress');
            this.refreshTokenInProgress = true;
            this.http.post(`${this.api}/token/refresh`, {refresh_token: localStorage.getItem('_auth')})
                .subscribe((data: any) => {
                    this.saveTokens(data);
                    this.refreshTokenInProgress = false;
                });
        }
    }

    private saveTokens(data) {
        localStorage.setItem('_auth', data.refresh_token);
        this._token.next(data.token);
    }

}
