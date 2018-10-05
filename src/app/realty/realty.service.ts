import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../app.service';
import {environment} from '../../environments/environment';
import {BehaviorSubject, of} from 'rxjs';
import {Realty, RealtyFilter} from './realty';
import {map, switchMap, tap} from 'rxjs/operators';
import {MediaObject} from '../media-object/media-object';
import * as cloneDeep from 'lodash/cloneDeep';
import {AuthService} from '../user/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RealtyService {
    private readonly api = environment.api;

    // myRealty = new Realty();
    myRealty = this.newRealty();
    filter = new BehaviorSubject(new RealtyFilter());

    readonly realty$ = this.filter.asObservable().pipe(
        tap(val => console.log(val)),
        switchMap(filters => this.http.get(`${this.api}/realties${this.generateSearchURL(filters)}`))
    );

    constructor(private http: HttpClient, public app: AppService, private auth: AuthService) {
    }

    newRealty() {
        const realty = new Realty();
        this.auth.currentUser$.subscribe(user => realty.manager = user);
        return realty;
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

    getOwners(val: string) {
        return this.http.get(`${this.api}/realties?owner[any]=${encodeURIComponent(val)}`);
    }

    saveRealty(realty: Realty) {
        let data: Realty | any = cloneDeep(realty);

        data.area = parseFloat(data.area || 0).toFixed(2);
        data.price = parseFloat(data.price || 0).toFixed(2);
        data.fee = parseFloat(data.fee || 0).toFixed(2);

        data.owner.phone = realty.owner.phone.map(phone => {
            const number = phone.number.replace(/[^\d]/g, '').replace(/^(7|8)/, '');
            phone.number = number;
            return phone;
        });

        const indexes = [];

        const files = () => {
            const _files = [];
            realty.mediaObjects.forEach((media, i) => {
                if (media.file) {
                    media.realties = [{id: data.id} as Realty];
                    media.tags = [];
                    media.tags.push(`${data.address.street}, ${data.address.number}`);
                    if (data.rooms) {
                        media.tags.push(`${data.rooms} комн.`);
                    }
                    _files.push(media);
                    indexes.push(i);
                }
            });
            return _files;
        };
        let _request;
        if (data.id) {
            _request = this.saveMedia(files()).pipe(switchMap(media => {
                media['hydra:member'].forEach((value, index) => {
                    const _index = indexes[index];
                    data.mediaObjects[_index] = value;
                });
                return this.http.put(`${this.api}/realties/${data.id}`, data);
            }));
        } else {
            data.mediaObjects = [];
            _request = this.http.post(`${this.api}/realties`, data).pipe(
                tap((result: Realty) => data = result),
                switchMap(() => this.saveMedia(files())),
                map(media => {
                    data.mediaObjects = media['hydra:member'];
                    return data;
                })
            );
        }

        return _request.pipe(tap((result: Realty) => {
            this.filter.next(this.filter.getValue());
        }));
    }

    saveMedia(data: MediaObject[]) {
        if (!data.length) {
            return of({['hydra:member']: []});
        }
        const formData = new FormData();
        let i = 0;
        for (const media of data) {
            formData.append(`mediaObjects[${i}][file]`, media.file);
            for (const tag of media.tags || []) {
                formData.append(`mediaObjects[${i}][tags][]`, tag);
            }
            for (const realty of media.realties || []) {
                formData.append(`mediaObjects[${i}][realties][]`, realty.id);
            }
            i++;
        }

        return this.http.post(`${this.api}/media_objects/multi`, formData);
    }
}
