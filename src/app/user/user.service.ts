import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';
import {AppService} from '../app.service';
import {HttpClient} from '@angular/common/http';
import {filter, first, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Phone, User} from './user';
import {of} from 'rxjs';

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

    getUser(id?: string) {
        return id ? this.currentUser$.pipe(
            filter(user => user && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_MANAGER'))),
            switchMap(() => this.http.get<User>(`${this.api}/users/${id}`))
        ) : this.currentUser$;
    }

    private saveRoles(data: User) {
        if (!data.roles) {
            return of(null);
        }
        const teamCard = () => {
            if (!data.roles.includes('ROLE_TEAMMATE')) {
                return of(null);
            }
            if (data.teamCard.photo.file) {
                const form = new FormData();
                form.append('file', data.teamCard.photo.file);
                form.append('tags[]', 'teammate');
                return this.http.post(`${this.api}/media_objects`, form).pipe(
                    map(media => {
                        data.teamCard.photo = media;
                        return data.teamCard;
                    })
                );
            }
            return of(data.teamCard);
        };
        return this.currentUser$.pipe(
            first(),
            mergeMap(user => {
                if (user && user.roles.includes('ROLE_ADMIN')) {
                    return teamCard().pipe(
                        switchMap(_teamCard => {
                            const newRoles: any = {roles: data.roles};
                            if (_teamCard) {
                                newRoles.teamCard = _teamCard;
                            }
                            return this.http.put(`${this.api}/saveRoles/${data.id}`, newRoles);
                        })
                    );
                }
                return of(null);
            }),
            tap(user => {
                if (user) {
                    this.app.openSnackBar('Обновил права пользователя');
                }
            })
        );
    }

    saveUser(data: User) {
        return this.saveRoles(data).pipe(
            switchMap(() => this.currentUser$.pipe(first())),
            switchMap(user => {
                if (user['@id'] === data['@id']) {
                    if (data.photo.file) {
                        const formData = new FormData();
                        formData.append(`file`, data.photo.file);
                        formData.append(`tags[]`, 'userPhoto');
                        return this.http.post(`${this.api}/media_objects`, formData);
                    }
                    return of(user.photo);
                }
                return of(null);
            }),
            switchMap(photo => {
                if (photo) {
                    data.photo = photo;
                    data.name.phone = data.name.phone.filter(phone => phone.number);
                    return this.http.put(`${this.api}${data['@id']}`, data);
                }
                return of(null);
            }),
            tap(user => {
                if (user) {
                    this.auth.updateCurrentUser(user['@id']);
                }
            })
        ).subscribe(user => {
            if (user) {
                this.app.openSnackBar('Обновил информацию пользователя');
            }
        });
    }

    get team$() {
        return this.http.get(`${this.api}/team`);
    }

    get teamManagers$() {
        return this.http.get(`${this.api}/users?roles[]=ROLE_MANAGER&roles[]=ROLE_TEAMMATE`);
    }

}
