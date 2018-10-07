import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {MediaObject, MediaObjectFilter} from './media-object';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {MediaObjectDialogComponent} from '../shared/media-object-dialog/media-object-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class MediaObjectService {

    readonly api = environment.api;

    filter = new BehaviorSubject<MediaObjectFilter>(new MediaObjectFilter());

    readonly mediaObjects$ = this.filter.asObservable().pipe(
        switchMap(filter => this.http.get(`${this.api}/media_objects${this.generateSearchURL(filter)}`))
    );

    constructor(private http: HttpClient, private dialog: MatDialog) {
    }

    getMediaUrl(mediaId: string, thumbnail?: string) {
        return thumbnail ? `${this.api}/m/${mediaId}/${thumbnail}` : `${this.api}/m/${mediaId}`;
    }

    private generateSearchURL(filters: MediaObjectFilter): string {
        let url = '';
        if (!filters) {
            return '';
        }

        const _properties = {
            createdAt: 'createdAt',
            tags: 'tags[any]',
            tag: 'tags',
            realtyId: 'realty.id',
            itemsPerPage: 'itemsPerPage'
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
        if (filters.createdUser) {
            url += url ? '&' : '?';
            url += `createdUser=${filters.createdUser.id}`;
        }
        return url;
    }

    openDialog(mediaObject: MediaObject, helper?: boolean) {
        return this.dialog.open(MediaObjectDialogComponent, {
            maxWidth: '599px',
            data: {mediaObject: mediaObject, helper: helper || false}
        });
    }
}
