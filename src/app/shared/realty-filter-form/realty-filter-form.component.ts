import {Component, OnInit} from '@angular/core';
import {RealtyService} from '../../realty/realty.service';
import {Address, BANKS, Realty, RealtyFilter} from '../../realty/realty';

@Component({
    selector: 'app-realty-filter-form',
    templateUrl: './realty-filter-form.component.html',
    styleUrls: ['./realty-filter-form.component.scss']
})
export class RealtyFilterFormComponent implements OnInit {

    filters: RealtyFilter = new RealtyFilter();

    readonly categories = Realty.categories;
    readonly roomsArr = Realty.roomsArr;
    readonly floorsArr = Address.floorsArr;
    readonly features = Realty.features;
    readonly districts = Address.districts;
    readonly buildingTypes = Address.buildingTypes;
    readonly developers = Address.developers;
    readonly quarters = Address.quarters;
    readonly banks = BANKS;

    constructor(private realtyService: RealtyService) {
    }

    ngOnInit() {
        this.realtyService.filter.asObservable().subscribe(val => this.filters = val);
    }

    onSubmit() {
        this.realtyService.filter.next(this.filters);
    }

    resetForm() {
        this.realtyService.filter.next(new RealtyFilter());
    }
}
