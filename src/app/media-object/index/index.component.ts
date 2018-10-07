import {Component, OnInit} from '@angular/core';
import {MediaObjectService} from '../media-object.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    mediaObjects: any;

    constructor(private mediaObjectService: MediaObjectService) {
    }

    ngOnInit() {
        this.mediaObjectService.mediaObjects$.subscribe(val => this.mediaObjects = val['hydra:member']);
    }

}
