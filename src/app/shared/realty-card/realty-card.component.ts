import {Component, Input, OnInit} from '@angular/core';
import {Realty} from '../../realty/realty';
import {Router} from '@angular/router';

@Component({
    selector: 'app-realty-card',
    templateUrl: './realty-card.component.html',
    styleUrls: ['./realty-card.component.scss']
})
export class RealtyCardComponent implements OnInit {

    @Input() realty: Realty;
    @Input() full: false;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    getFeatures() {
        if (!this.realty.description.feature || !Object.keys(this.realty.description.feature).length) {
            return;
        }
        let text = '';
        for (const feature of Realty.features) {
            let list = [];
            for (const value of feature.value) {
                if (this.realty.description.feature.includes(value)) {
                    list.push(value);
                }
            }
            text += list.length && text ? '. ' : '';
            text += list.length ? `${feature.name}: ${list.join(', ')}` : '';
            list = [];
        }
        return text;
    }

    show() {
        this.router.navigate([{outlets: {side: ['show', this.realty.id]}}]);
    }
}
