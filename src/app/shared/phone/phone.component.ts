import {Component, Input, OnInit} from '@angular/core';
import {Phone} from '../../user/user';

@Component({
    selector: 'app-phone',
    templateUrl: './phone.component.html',
    styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {

    @Input() phone: Phone[];

    constructor() {
    }

    ngOnInit() {
    }

    transform(value: any, args?: any): any {
        if (value.match(/[^0-9]/)) {
            return value;
        }
        const city = value.slice(0, 3);
        const number1 = value.slice(3, 6);
        const number2 = value.slice(6, 8);
        const number3 = value.slice(8);

        return `${city} ${number1} ${number2} ${number3}`;
    }

}
