import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Realty} from '../../realty/realty';
import {RealtyService} from '../../realty/realty.service';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
    selector: 'app-realty-form',
    templateUrl: './realty-form.component.html',
    styleUrls: ['./realty-form.component.scss']
})
export class RealtyFormComponent implements OnInit, OnChanges {

    @Input('realty') _realty: Realty;
    realty: Realty = this.realtyService.myRealty;

    readonly categories = Realty.categories;


    constructor(private realtyService: RealtyService) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.realty = cloneDeep(this._realty);
    }

    filter() {

    }

    onSubmit() {
        this.realtyService.app.openSnackBar('Подождите сохраняю...', '', 3000);
        this.realtyService.saveRealty(this.realty).subscribe((val: Realty) => {
            this.realtyService.app.openSnackBar('Cохранил!');
        });
    }

    resetForm() {
        if (!this.realty['@id']) {
            this.realtyService.myRealty = new Realty();
        }
    }

}
