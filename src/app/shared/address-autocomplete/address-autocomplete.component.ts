import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {RealtyService} from '../../realty/realty.service';
import {BehaviorSubject, combineLatest, of} from 'rxjs';
import {Address} from '../../realty/realty';
import {debounceTime, map, shareReplay, switchMap} from 'rxjs/operators';
import * as sortBy from 'lodash/sortBy';
import * as groupBy from 'lodash/groupBy';
import * as transform from 'lodash/transform';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
    selector: 'app-address-autocomplete',
    templateUrl: './address-autocomplete.component.html',
    styleUrls: ['./address-autocomplete.component.scss']
})
export class AddressAutocompleteComponent implements OnInit, OnChanges {
    @Input('address') _addressObject: Address;
    @Input() required = false;
    @Output() addressChange = new EventEmitter();
    private _street = new BehaviorSubject<{ street: string, addresses: Address[] } | string>(null);
    private _number = new BehaviorSubject<Address | string>(null);

    streetsGroup$ = this._street.asObservable().pipe(
        debounceTime(750),
        switchMap(val => val ? this.realtyService.getStreets(typeof val === 'string' ? val : val.street)
            : of({'hydra:member': []})),
        map(val => {
            const sort = sortBy(val['hydra:member'], ['street', 'number'], ['asc', 'asc']);
            const streets = groupBy(sort, x => x.street);
            return transform(streets, (result, value, key) => result.push({street: key, addresses: value}), []);
        }),
        shareReplay(1)
    );

    filteredAddresses$ = combineLatest(this.streetsGroup$, this._number.asObservable()).pipe(
        map(([streetsGroup, value]) => {
            const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
            const street: string = this.displayStreetFn(this.street);
            const group = streetsGroup && street ?
                streetsGroup.find(val => val.street.toLowerCase() === street.toLowerCase()) : null;
            const addresses = group ? group.addresses.filter(option => option.number.toLowerCase().indexOf(filterValue) === 0)
                : [];

            const newAddress = typeof value === 'string' ? addresses.find(val => val.number.toLowerCase() === value.toLowerCase())
                : value;

            this.addressChange.emit(cloneDeep(newAddress) || Object.assign(new Address(), {street: street, number: value}));
            return addresses;
        })
    );

    constructor(private realtyService: RealtyService) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.street = this._addressObject.street;
        this.number = this._addressObject.number;
    }

    displayStreetFn(address?: { street: string, addresses: Address[] } | string): string | undefined {
        return typeof address === 'string' ? address : address ? address.street : undefined;
    }

    displayNumberFn(address?: Address | string): string | undefined {
        return typeof address === 'string' ? address : address ? address.number : undefined;
    }

    get street(): { street: string, addresses: Address[] } | string {
        return this._street.getValue();
    }

    set street(value: { street: string, addresses: Address[] } | string) {
        if (value !== this._street.getValue()) {
            this._street.next(value);
        }
    }

    get number(): Address | string {
        return this._number.getValue();
    }

    set number(value: Address | string) {
        if (value !== this._number.getValue()) {
            this._number.next(value);
        }
    }

}
