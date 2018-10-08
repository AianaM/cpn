import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-instagram-feed',
    templateUrl: './instagram-feed.component.html',
    styleUrls: ['./instagram-feed.component.scss']
})
export class InstagramFeedComponent implements OnInit {

    token = environment.instagram.ACCESS_TOKEN;

    feed$: Observable<any>;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.feed$ = this.http.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${this.token}`).pipe(
            map((value: any) => value.data)
        );
    }

    getDate(unixDate: string) {
        return new Date(Number(unixDate) * 1000);
    }

}
