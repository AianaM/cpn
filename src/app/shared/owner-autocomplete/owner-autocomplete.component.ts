import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Owner} from '../../realty/realty';
import {RealtyService} from '../../realty/realty.service';
import {BehaviorSubject, of} from 'rxjs';
import {debounceTime, map, startWith, switchMap, tap} from 'rxjs/operators';
import * as cloneDeep from 'lodash/cloneDeep';
import * as isEqual from 'lodash/isEqual';
import * as groupBy from 'lodash/groupBy';
import * as transform from 'lodash/transform';

@Component({
    selector: 'app-owner-autocomplete',
    templateUrl: './owner-autocomplete.component.html',
    styleUrls: ['./owner-autocomplete.component.scss']
})
export class OwnerAutocompleteComponent implements OnInit, OnChanges {

    @Input('owner') _ownerObject: Owner;
    @Output() ownerChange = new EventEmitter();
    private _owner = new BehaviorSubject<Owner | string>(null);
    filteredRealty$ = this._owner.asObservable().pipe(
        startWith(''),
        debounceTime(750),
        switchMap(value => value ? this.realtyService.getOwners(this.displayFn(value)) : of({'hydra:member': []})),
        map(result => result['hydra:member']),
        tap(value => {
            let newOwner;
            if (this.owner && typeof this.owner !== 'string') {
                const _newOwner = value.find(val => isEqual(val.owner, this.owner));
                newOwner = _newOwner ? cloneDeep(_newOwner.owner) : this.createNewOwner(this.owner.phone[0].number);
            }
            this.ownerChange.emit(newOwner);
        }),
        map(value => {
            const groups = groupBy(value, x => JSON.stringify(x.owner));
            return transform(groups, (result, val, key) => result.push({owner: JSON.parse(key), realty: val}), []);
        })
    );

    constructor(private realtyService: RealtyService) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.owner = this._ownerObject;
    }

    displayFn(owner?: any): string | undefined {
        return typeof owner === 'string' ? owner : owner ? owner.phone[0].number : undefined;
    }

    get owner(): Owner | string {
        return this._owner.getValue();
    }

    set owner(value: Owner | string) {
        if (typeof value === 'string') {
            value = this.createNewOwner(value);
        }
        if (!isEqual(value, this._owner.getValue())) {
            this._owner.next(value);
        }
    }

    createNewOwner(phone: string) {
        const newOwner = new Owner();
        newOwner.phone[0].number = phone;
        return newOwner;
    }
}
