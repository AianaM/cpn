import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {StreamFilter} from './stream';
import {switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StreamService {

    readonly api = environment.api;
    filter = new BehaviorSubject(new StreamFilter());

    readonly stream$ = this.filter.asObservable().pipe(
        switchMap(filter => this.http.get(`${this.api}/streams${this.generateSearchURL(filter)}`))
    );

    constructor(private http: HttpClient) {
    }

    private generateSearchURL(filters: StreamFilter): string {
        let url = '';
        if (!filters) {
            return '';
        }

        const _properties = {
            item: 'item',
            action: 'action',
            itemId: 'itemId',
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
}
