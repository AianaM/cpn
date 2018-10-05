import {Component, OnInit} from '@angular/core';
import {StreamService} from '../stream.service';
import {Stream, StreamFilter} from '../stream';

@Component({
    selector: 'app-stream-filter-form',
    templateUrl: './filter-form.component.html',
    styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {

    filter: StreamFilter = new StreamFilter();

    readonly items = Stream.items;

    readonly actions = [
        {name: 'Создан', value: 'insert'},
        {name: 'Обновлен', value: 'update'},
    ];

    constructor(private streamService: StreamService) {
    }

    ngOnInit() {
        this.streamService.filter.asObservable().subscribe(val => this.filter = val);
    }


    resetForm() {
        this.streamService.filter.next(new StreamFilter());
    }

    onSubmit() {
        this.streamService.filter.next(this.filter);
    }
}
