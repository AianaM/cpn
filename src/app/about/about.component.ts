import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {map} from 'rxjs/operators';
import * as groupBy from 'lodash/groupBy';
import {User} from '../user/user';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    team$ = this.userService.team$.pipe(
        map(team => {
            const groups = groupBy(<User[]>team['hydra:member'], x => x.teamCard.team || 'other');
            delete groups.other;
            return Object.values(groups);
        })
    );

    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

}
