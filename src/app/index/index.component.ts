import {Component, OnInit} from '@angular/core';
import {RealtyService} from '../realty/realty.service';
import {Realty} from '../realty/realty';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    myRealty: Realty;

    constructor(private realty: RealtyService) {
    }

    ngOnInit() {
        this.myRealty = this.realty.myRealty;
    }

}
