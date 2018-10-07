import {Component, Input, OnInit} from '@angular/core';
import {Address} from '../../realty/realty';

@Component({
    selector: 'app-address-card',
    templateUrl: './address-card.component.html',
    styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent implements OnInit {
    @Input() address: Address;
    @Input() show: 'flat' | 'tiny' | 'full' = 'tiny';
    @Input() hideActions = false;

    constructor() {
    }

    ngOnInit() {
    }

    features() {
        const feature = this.address.description.feature;
        const featuresGroups = Address.features;
        if (!feature || !Object.keys(feature).length) {
            return;
        }
        let text = '';
        for (const _feature of featuresGroups) {
            let list = [];
            for (const value of _feature.value) {
                if (feature.includes(value)) {
                    list.push(value);
                }
            }
            text += list.length && text ? '. ' : '';
            text += list.length ? `${_feature.name}: ${list.join(', ')}` : '';
            list = [];
        }
        return text;
    }

}
