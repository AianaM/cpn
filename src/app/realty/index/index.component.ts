import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {Breakpoints, BreakpointState, BreakpointObserver} from '@angular/cdk/layout';
import {RealtyService} from '../realty.service';
import {combineLatest, Observable} from 'rxjs';
import {Realty} from '../realty';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent {

    realty$: Observable<Realty> = this.realtyService.realty$.pipe(
        map(realty => realty['hydra:member'])
    );

    cols$: Observable<number> = combineLatest(
        this.breakpointObserver.observe(Breakpoints.Handset),
        this.realtyService.app.sideOpened$
    ).pipe(
        map(([breakpoints, side]) => breakpoints.matches ? 1 : side ? 2 : 4)
    );

    constructor(private breakpointObserver: BreakpointObserver, private realtyService: RealtyService) {
    }
}
