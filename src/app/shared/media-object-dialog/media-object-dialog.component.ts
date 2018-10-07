import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MediaObject} from '../../media-object/media-object';

@Component({
    selector: 'app-media-object-dialog',
    templateUrl: './media-object-dialog.component.html',
    styleUrls: ['./media-object-dialog.component.scss']
})
export class MediaObjectDialogComponent implements OnInit {

    mediaObject: MediaObject;
    helper: boolean;

    constructor(
        private dialogRef: MatDialogRef<MediaObjectDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { mediaObject: MediaObject, helper?: boolean }) {
    }

    ngOnInit() {
        this.mediaObject = this.data.mediaObject;
        this.helper = this.data.helper;
    }

}
