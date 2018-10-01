import {Component, Input, OnInit} from '@angular/core';
import {Realty} from '../../realty/realty';
import {RealtyService} from '../../realty/realty.service';

@Component({
    selector: 'app-realty-form',
    templateUrl: './realty-form.component.html',
    styleUrls: ['./realty-form.component.scss']
})
export class RealtyFormComponent implements OnInit {

    @Input() realty: Realty = this.realtyService.myRealty;
    readonly categories = Realty.categories;

    constructor(private realtyService: RealtyService) {
    }

    ngOnInit() {
    }

}
