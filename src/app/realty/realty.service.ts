import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../app.service';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RealtyService {
    private readonly api = environment.api;

    constructor(private http: HttpClient, public app: AppService) {
    }

    getRealty() {
        return this.http.get(`${this.api}/realties`);
    }
}
