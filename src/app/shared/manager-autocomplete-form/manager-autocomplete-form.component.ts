import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';
import {UserService} from '../../user/user.service';

@Component({
    selector: 'app-manager-autocomplete-form',
    templateUrl: './manager-autocomplete-form.component.html',
    styleUrls: ['./manager-autocomplete-form.component.scss'],
    viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class ManagerAutocompleteFormComponent implements OnInit {

    @Input() manager;
    @Output() managerChange = new EventEmitter();

    teamManagers;

    filteredOptions;

    constructor(private teamService: UserService) { }

    ngOnInit() {
        this.teamService.teamManagers$.subscribe(val => this.teamManagers = val['hydra:member'] || []);
    }

    _filter() {
        let value = this.manager;
        if (value && typeof value !== 'string') {
            this.managerChange.emit(value);
            value = `${value.teamCard.firstName} ${value.teamCard.lastName}`;
        }
        if (value && this.teamManagers.length) {
            const filterValue = value.toLowerCase();
            return this.filteredOptions = this.teamManagers
                .filter(user => `${user.teamCard.firstName} ${user.teamCard.lastName}`.toLowerCase().includes(filterValue));
        }
        this.filteredOptions = this.teamManagers;
    }

    displayFn(user?: any): string|undefined {
        return user ? `${user.teamCard.firstName} ${user.teamCard.lastName}` : undefined;
    }
}
