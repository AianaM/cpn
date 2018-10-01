import {Component, OnInit} from '@angular/core';
import {RealtyService} from '../../realty/realty.service';

@Component({
    selector: 'app-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

    filteredStreets$;

    constructor(private realty: RealtyService) {
    }

    ngOnInit() {
    }

}
