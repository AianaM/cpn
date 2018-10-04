import {Component, Input, OnInit} from '@angular/core';
import * as remove from 'lodash/remove';
import {MediaObject} from '../../media-object/media-object';

@Component({
    selector: 'app-media-object-form',
    templateUrl: './media-object-form.component.html',
    styleUrls: ['./media-object-form.component.scss']
})
export class MediaObjectFormComponent implements OnInit {
    @Input() mediaObjects: MediaObject[];
    editMode = false;

    checkedMedia: MediaObject[] = [];

    constructor() {
    }

    ngOnInit() {
    }

    uploadFiles(event) {
        if (!event.target.files.length) {
            return;
        }
        for (const file of event.target.files) {
            this.mediaObjects.push({
                links: {
                    squared_thumbnail_64: window.URL.createObjectURL(file)
                },
                file: file,
            } as MediaObject);
        }
    }

    editModeToggle() {
        this.checkedMedia = [];
        this.editMode = !this.editMode;
    }

    isChecked(media): boolean {
        return this.checkedMedia.includes(media);
    }

    checked(media) {
        if (!this.editMode) {
            return false;
        }
        this.isChecked(media) ? this.checkedMedia.splice(this.checkedMedia.indexOf(media), 1) :
            this.checkedMedia.push(media);
    }

    removeChecked() {
        remove(this.mediaObjects, n => {
            return this.isChecked(n);
        });
        this.editModeToggle();
    }
}
