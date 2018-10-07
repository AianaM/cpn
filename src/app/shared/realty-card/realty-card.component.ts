import {Component, Input, OnInit} from '@angular/core';
import {Address, Realty} from '../../realty/realty';
import {Router} from '@angular/router';
import {MediaObjectService} from '../../media-object/media-object.service';
import {MediaObject} from '../../media-object/media-object';

@Component({
    selector: 'app-realty-card',
    templateUrl: './realty-card.component.html',
    styleUrls: ['./realty-card.component.scss']
})
export class RealtyCardComponent implements OnInit {

    @Input() realty: Realty;
    @Input() full: false;

    constructor(private router: Router, private mediaObjectService: MediaObjectService) {
    }

    ngOnInit() {
    }

    features(address?: boolean) {
        const feature = address ? this.realty.address.description.feature : this.realty.description.feature;
        const featuresGroups = address ? Address.features : Realty.features;
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

    get status() {
        return Realty.statusIcon(this.realty.status);
    }

    show(mediaObject: MediaObject) {
        if (this.full) {
            return this.mediaObjectService.openDialog(mediaObject);
        }
        this.router.navigate([{outlets: {side: ['show', this.realty.id]}}]);
    }
}
