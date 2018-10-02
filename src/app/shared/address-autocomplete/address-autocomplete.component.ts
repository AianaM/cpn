import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {RealtyService} from '../../realty/realty.service';
import {BehaviorSubject, of} from 'rxjs';
import {Address} from '../../realty/realty';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import * as sortBy from 'lodash/sortBy';
import * as groupBy from 'lodash/groupBy';
import * as transform from 'lodash/transform';

@Component({
    selector: 'app-address-autocomplete',
    templateUrl: './address-autocomplete.component.html',
    styleUrls: ['./address-autocomplete.component.scss'],
})
export class AddressAutocompleteComponent implements OnInit, OnChanges {
    @Input('address') _addressObject: Address;
    @Output() addressChange = new EventEmitter();
    private _address = new BehaviorSubject<Address | string>(null);

    streetsGroup$ = this._address.asObservable().pipe(
        debounceTime(750),
        switchMap(val => typeof val === 'string' ? this.realtyService.getStreets(val) : of({'hydra:member': []})),
        map(val => {
            const sort = sortBy(val['hydra:member'], ['street', 'number'], ['asc', 'asc']);
            const streets = groupBy(sort, x => x.street);
            return transform(streets, (result, value, key) => result.push({'street': key, 'addresses': value}), []);
        })
    );

    constructor(private realtyService: RealtyService) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.address = this._addressObject;
    }

    displayFn(address?: Address): string | undefined {
        return address ? `${address.street}, ${address.number}` : undefined;
    }

    get address(): Address | string {
        return this._address.getValue();
    }

    set address(value: Address | string) {
        if (value !== this._address.getValue()) {
            this._address.next(value);
            if (typeof value !== 'string') {
                this.addressChange.emit(value);
            }
        }
    }
}
