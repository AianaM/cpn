import {Component, OnInit} from '@angular/core';
import {RealtyService} from '../realty/realty.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    constructor(private realty: RealtyService) {
    }

    ngOnInit() {
        this.realty.getRealty().subscribe();
    }

}
