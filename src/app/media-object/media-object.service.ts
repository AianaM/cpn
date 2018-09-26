import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MediaObjectService {

    readonly api = environment.api;

    constructor() {
    }

    getMediaUrl(mediaId: string, thumbnail?: string) {
        return thumbnail ? `${this.api}/m/${mediaId}/${thumbnail}` : `${this.api}/m/${mediaId}`;
    }
}
