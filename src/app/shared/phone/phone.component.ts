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

}
