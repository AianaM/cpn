import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {RealtyService} from '../realty/realty.service';

@Component({
    selector: 'app-side',
    templateUrl: './side.component.html',
    styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit, AfterViewInit {

    selected = 0;
    realty$;

    constructor(private route: ActivatedRoute, private realtyService: RealtyService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.realty$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.realtyService.getRealty(params.get('id'))),
            tap(realty => this.selected = realty ? 1 : 0)
        );
    }
}
