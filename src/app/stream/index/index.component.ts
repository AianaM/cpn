import {Component, OnInit} from '@angular/core';
import {StreamService} from '../stream.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    stream: any;

    constructor(private streamService: StreamService) {
    }

    ngOnInit() {
        this.streamService.stream$.subscribe(val => this.stream = val['hydra:member']);
    }
}
