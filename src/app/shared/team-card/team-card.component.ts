import {Component, Input, OnInit} from '@angular/core';
import {TeamCard} from '../../user/user';

@Component({
    selector: 'app-team-card',
    templateUrl: './team-card.component.html',
    styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {

    @Input() teamCard: TeamCard;
    @Input() small = false;

    constructor() {
    }

    ngOnInit() {
    }

}
