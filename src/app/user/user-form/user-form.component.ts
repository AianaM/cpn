import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class UserFormComponent implements OnInit {

    @Input() name: any;

    constructor() {
    }

    ngOnInit() {
    }

}
