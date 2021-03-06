import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {MediaObjectService} from '../../media-object/media-object.service';
import {MediaObjectFilter} from '../../media-object/media-object';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-media-object-helper',
    templateUrl: './media-object-helper.component.html',
    styleUrls: ['./media-object-helper.component.scss']
})
export class MediaObjectHelperComponent implements OnInit, OnChanges, OnDestroy {
    @Input() tags: string;
    @Output() mediaObject = new EventEmitter();

    tagFilter: string = null;

    filteredMedia$ = this.mediaObjectService.mediaObjects$.pipe(
        map(value => value['hydra:member'])
    );

    media$: Subscription;

    showHelper = false;

    constructor(private mediaObjectService: MediaObjectService) {
    }

    ngOnInit() {
        this.media$ = this.mediaObjectService.filter.asObservable().subscribe(value => this.tagFilter = value.tag);
    }

    ngOnChanges() {
        setTimeout(() => {
            this.tagFilter = this.tags;
            this.filter();
        });
    }

    ngOnDestroy() {
        this.media$.unsubscribe();
    }

    filter() {
        const filter = new MediaObjectFilter();
        filter.tag = this.tagFilter;
        this.mediaObjectService.filter.next(filter);
    }

    show(media) {
        const dialogRef = this.mediaObjectService.openDialog(media, true);
        dialogRef.afterClosed().subscribe(result => this.mediaObject.emit(result));
    }
}
