import {Component, OnInit} from '@angular/core';
import {MediaObjectService} from '../media-object.service';
import {MediaObjectFilter} from '../media-object';

@Component({
    selector: 'app-filter-form',
    templateUrl: './filter-form.component.html',
    styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {

    filter: MediaObjectFilter = new MediaObjectFilter();

    constructor(private mediaObjectService: MediaObjectService) {
    }

    ngOnInit() {
        this.mediaObjectService.filter.asObservable().subscribe(val => this.filter = val);
    }

    resetForm() {
        this.mediaObjectService.filter.next(new MediaObjectFilter());
    }

    onSubmit() {
        this.mediaObjectService.filter.next(this.filter);
    }

}
