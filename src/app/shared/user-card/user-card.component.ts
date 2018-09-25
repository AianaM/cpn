import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../user/user';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

    @Input() user: User | any;

    constructor() {
    }

    ngOnInit() {
    }

    get name() {
        if (this.user && typeof this.user.name === 'string') {
            return this.user.name;
        }
        return `${this.user.name.firstName} ${this.user.name.lastName}`;
    }

    get phone() {
        if (this.user && this.user.phone) {
            return this.user.phone;
        }
        return this.user.name.phone;
    }
}
