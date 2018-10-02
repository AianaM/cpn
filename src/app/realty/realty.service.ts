import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../app.service';
import {environment} from '../../environments/environment';
import {BehaviorSubject, of} from 'rxjs';
import {Realty, RealtyFilter} from './realty';
import {switchMap, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RealtyService {
    private readonly api = environment.api;

    myRealty = new Realty();
    filter = new BehaviorSubject(new RealtyFilter());

    readonly realty$ = this.filter.asObservable().pipe(
        tap(val => console.log(val)),
        switchMap(filters => this.http.get(`${this.api}/realties${this.generateSearchURL(filters)}`))
    );

    constructor(private http: HttpClient, public app: AppService) {
    }

    getRealty(id: string) {
        return id ? this.http.get(`${this.api}/realties/${id}`) : of(null);
    }

    private generateSearchURL(filters: RealtyFilter): string {
        let url = '';
        if (!filters) {
            return '';
        }

        const _properties = {
            district: 'address.district[]',
            street: 'address.street',
            number: 'address.number',
            rooms: 'rooms[]',
            floor: 'floor[]',
            floors: 'address.floors[]',
            buildingType: 'address.type[]',
            developer: 'address.developer[]',
            newBuilding: 'address.newBuilding',
            // quarter: 'address.description[quarter]',
            // mortgage: 'address.description[mortgage][]',
            feature: 'description[feature][]',
            owner: 'owner[any]',
            yearMin: 'address.year[gte]',
            yearMax: 'address.year[lte]',
            priceMin: 'price[gte]',
            priceMax: 'price[lte]',
            areaMin: 'area[gte]',
            areaMax: 'area[lte]',
        };

        for (const [key, value] of Object.entries(filters)) {
            if (_properties[key]) {
                if (value && (typeof value === 'number' || typeof value === 'string')) {
                    url += url ? '&' : '?';
                    url += `${_properties[key]}=${value}`;
                    continue;
                }
                if (value && (value as string[]).length) {
                    const _url = (value as string[]).map(val => `${_properties[key]}=${encodeURIComponent(val)}`);
                    url += url ? '&' : '?';
                    url += `${_url.join('&')}`;
                    continue;
                }
            }
        }
        return url;
    }

    getStreets(val: string) {
        return this.http.get(`${this.api}/addresses?street=${encodeURIComponent(val)}`);
    }
}
