import {Component, Input, OnInit} from '@angular/core';
import {Phone} from '../../user/user';
import {ControlContainer, NgModelGroup} from '@angular/forms';

@Component({
    selector: 'app-phone-form',
    templateUrl: './phone-form.component.html',
    styleUrls: ['./phone-form.component.scss'],
    viewProviders: [{provide: ControlContainer, useExisting: NgModelGroup}]
})
export class PhoneFormComponent implements OnInit {
    @Input() phone: Phone[];
    phoneTypes = Phone.phoneTypes;

    constructor() {
    }

    ngOnInit() {
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }

    addPhone() {
        this.phone.push(new Phone());
    }

    removePhone(i: number) {
        this.phone.splice(i, 1);
        if (!this.phone.length) {
            this.addPhone();
        }
    }
}
