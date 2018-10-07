import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RealtyService} from '../realty.service';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

    address$;

    constructor(private route: ActivatedRoute, private realtyService: RealtyService) {
    }

    ngOnInit() {
        this.address$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.realtyService.getAddress(params.get('id'))));
    }

}
