import {Component, Input, OnInit} from '@angular/core';
import {BANKS, HiddenInfo} from '../../realty/realty';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
    selector: 'app-hidden-info-form',
    templateUrl: './hidden-info-form.component.html',
    styleUrls: ['./hidden-info-form.component.scss'],
    viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class HiddenInfoFormComponent implements OnInit {

    @Input() hiddenInfo: HiddenInfo;

    readonly banks = BANKS;

    constructor() {
    }

    ngOnInit() {
    }

}
