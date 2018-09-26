import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../app.service';
import {environment} from '../../environments/environment';
import {of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RealtyService {
    private readonly api = environment.api;

    constructor(private http: HttpClient, public app: AppService) {
    }

    get realty$() {
        return this.http.get(`${this.api}/realties`);
    }

    getRealty(id: string) {
        return id ? this.http.get(`${this.api}/realties/${id}`) : of(null);
    }
}
