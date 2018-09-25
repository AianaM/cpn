import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-side',
    templateUrl: './side.component.html',
    styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {

    selected = 0;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    sideClose() {
        this.router.navigate([{outlets: {side: null}}]);
    }

}
