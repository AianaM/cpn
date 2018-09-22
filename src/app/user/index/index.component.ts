import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    currentUser;

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
        this.auth.currentUser$.subscribe(user => {
            this.currentUser = user;
            console.log(user);
        });
    }

}
