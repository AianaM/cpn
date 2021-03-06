import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../app.service';
import {environment} from '../../environments/environment';
import {BehaviorSubject, combineLatest, Observable, of, zip} from 'rxjs';
import {Address, Realty, RealtyFilter} from './realty';
import {map, switchMap, tap} from 'rxjs/operators';
import {MediaObject} from '../media-object/media-object';
import * as cloneDeep from 'lodash/cloneDeep';
import {AuthService} from '../user/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RealtyService {
    private readonly api = environment.api;

    myRealty = this.newRealty();
    filter = new BehaviorSubject(new RealtyFilter());

    readonly realty$ = combineLatest(this.auth.currentUser$, this.filter.asObservable()).pipe(
        tap(val => console.log(val)),
        switchMap(([user, filters]) => this.http.get(`${this.api}/realties${this.generateSearchURL(filters)}`))
    );

    constructor(private http: HttpClient, public app: AppService, private auth: AuthService) {
    }

    newRealty() {
        const realty = new Realty();
        this.auth.currentUser$.subscribe(user => realty.manager = user && user.roles.includes('ROLE_MANAGER')
        && user.roles.includes('ROLE_TEAMMATE') && user.teamCard ? user : null);
        return realty;
    }

    getRealty(id: string) {
        return id ? this.http.get(`${this.api}/realties/${id}`) : of(null);
    }

    getAddress(id: string) {
        return id ? this.http.get(`${this.api}/addresses/${id}`) : of(null);
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
        if (filters.manager) {
            url += url ? '&' : '?';
            url += `manager.id=${filters.manager.id}`;
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

        data.mediaObjects = realty.mediaObjects.filter(media => !media.file);

        data.address.mediaObjects = realty.address.mediaObjects.filter(media => !media.file);

        const files = () => {
            const _files = realty.mediaObjects.filter(media => media.file).map(media => {
                media.realties = [{id: data.id} as Realty];
                media.tags = [];
                media.tags.push(`${data.address.street}, ${data.address.number}`);
                if (data.rooms) {
                    media.tags.push(`${data.rooms} комн.`);
                }
                return media;
            });
            const _addressFiles = realty.address.mediaObjects.filter(media => media.file).map(media => {
                media.addresses = [{id: data.address.id} as Address];
                media.tags = [`${data.address.street}, ${data.address.number}`];
                console.log(media);
                return media;
            });
            return _files.concat(_addressFiles);
        };
        return of(true).pipe(
            switchMap(() => data.id ? this.http.put(`${this.api}/realties/${data.id}`, data)
                : this.http.post(`${this.api}/realties`, data)),
            tap((result: Realty) => data = result),
            switchMap(() => this.saveMedia(files())),
            map(() => data)
        ).pipe(tap((result: Realty) => {
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
            for (const address of media.addresses || []) {
                formData.append(`mediaObjects[${i}][addresses][]`, `${address.id}`);
            }
            i++;
        }

        return this.http.post(`${this.api}/media_objects/multi`, formData);
    }

    get newBuildings$() {
        return this.http.get(`${this.api}/addresses?newBuilding=true&itemsPerPage=4`).pipe(
            map(value => [{title: 'Новостройки', addresses: value['hydra:member']}])
        );
    }

    get indexGroups$(): Observable<{ title: string, realty: Realty[] }[]> {
        return zip(
            this.http.get(`${this.api}/realties?category=Квартира&address.newBuilding=true&itemsPerPage=8`),
            this.http.get(`${this.api}/realties?category=Квартира&address.newBuilding=false&itemsPerPage=8`),
        ).pipe(
            map(([first, second]) => {
                return [
                    {title: 'Квартиры в новостройках', realty: first['hydra:member']},
                    {title: 'Готовое жильё', realty: second['hydra:member']}
                ];
            })
        );
    }
}
