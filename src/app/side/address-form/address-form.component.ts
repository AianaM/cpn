import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RealtyService} from '../../realty/realty.service';
import {Address, BANKS, RealtyFilter} from '../../realty/realty';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
    selector: 'app-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss'],
    viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class AddressFormComponent implements OnInit {
    @Input() address: Address;
    @Output() addressChange = new EventEmitter();

    readonly districts = Address.districts;
    readonly buildingTypes = Address.buildingTypes;
    readonly developers = Address.developers;
    readonly quarters = Address.quarters;
    readonly banks = BANKS;
    readonly floorsArr = Address.floorsArr;
    readonly features = Address.features;

    constructor(private realtyService: RealtyService) {
    }

    ngOnInit() {
    }

    get mediaTags() {
        return this.address.street && this.address.number ? `${this.address.street}, ${this.address.number}` : null;
    }

    setAddress(event) {
        this.addressChange.emit(event || new Address());
    }

    filter() {
        const filter = new RealtyFilter();
        filter.street = this.address.street;
        filter.number = this.address.number;
        this.realtyService.filter.next(filter);
    }

}
