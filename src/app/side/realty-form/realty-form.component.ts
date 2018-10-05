import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Realty, RealtyFilter} from '../../realty/realty';
import {RealtyService} from '../../realty/realty.service';
import * as cloneDeep from 'lodash/cloneDeep';
import {Router} from '@angular/router';

@Component({
    selector: 'app-realty-form',
    templateUrl: './realty-form.component.html',
    styleUrls: ['./realty-form.component.scss']
})
export class RealtyFormComponent implements OnInit, OnChanges {

    @Input('realty') _realty: Realty;
    realty: Realty = this.realtyService.myRealty;
    private _ownerFilter: string;

    readonly categories = Realty.categories;


    constructor(private realtyService: RealtyService, private router: Router) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.realty = cloneDeep(this._realty);
    }

    filterByOwner() {
        const filter = new RealtyFilter();
        filter.owner = this._ownerFilter;
        this.realtyService.filter.next(filter);
    }

    ownerFilterValue($event) {
        this._ownerFilter = $event;
    }

    onSubmit(form) {
        if (form.valid) {
            this.realtyService.app.openSnackBar('Подождите сохраняю...', '', 3000);
            this.realtyService.saveRealty(this.realty).subscribe((val: Realty) => {
                this.realtyService.app.openSnackBar('Cохранил!');
                this.router.navigate([{outlets: {side: ['show']}}]).then(() =>
                    this.router.navigate([{outlets: {side: ['show', val.id]}}]));
            });
        }
    }

    resetForm() {
        if (!this.realty['@id']) {
            this.realtyService.myRealty = this.realtyService.newRealty();
            this.realty = this.realtyService.myRealty;
        }
    }

}
