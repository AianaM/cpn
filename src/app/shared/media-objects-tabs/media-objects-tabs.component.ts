import {Component, Input, OnInit} from '@angular/core';
import {MediaObject} from '../../media-object/media-object';
import {MediaObjectService} from '../../media-object/media-object.service';

@Component({
    selector: 'app-media-objects-tabs',
    templateUrl: './media-objects-tabs.component.html',
    styleUrls: ['./media-objects-tabs.component.scss']
})
export class MediaObjectsTabsComponent implements OnInit {
    @Input() mediaObjects: MediaObject[];

    constructor(private mediaObjectService: MediaObjectService) {
    }

    ngOnInit() {
    }

    show(mediaObject: MediaObject) {
        return this.mediaObjectService.openDialog(mediaObject);
    }

}
