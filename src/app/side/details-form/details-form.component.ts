import {Component, Input, OnInit} from '@angular/core';
import {Address, Realty} from '../../realty/realty';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
    selector: 'app-details-form',
    templateUrl: './details-form.component.html',
    styleUrls: ['./details-form.component.scss'],
    viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class DetailsFormComponent implements OnInit {

    @Input() realty: Realty;

    readonly statuses = Realty.statuses;
    readonly roomsArr = Realty.roomsArr;
    readonly floorsArr = Address.floorsArr;
    readonly features = Realty.features;

    constructor() {
    }

    ngOnInit() {
    }

}
