import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeamCard, User} from '../user';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
    selector: 'app-roles-form',
    templateUrl: './roles-form.component.html',
    styleUrls: ['./roles-form.component.scss'],
    viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class RolesFormComponent implements OnInit {

    @Input() userRoles: string[];
    @Input() teamCard: any;
    @Output() userRolesChange = new EventEmitter();

    readonly roles = User.roles;
    readonly teams = TeamCard.teams;

    constructor() {
    }

    ngOnInit() {
    }

    onUserRolesChange(value: string[]) {
        this.userRolesChange.emit(value);
    }

}
