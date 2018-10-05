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
        this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]),
        this.realtyService.app.sideOpened$
    ).pipe(
        map(([breakpoints, side]) => {
            // (max-width: 599px): false
            // (min-width: 600px) and (max-width: 959px): true
            // (min-width: 960px) and (max-width: 1279px): false
            // (min-width: 1280px) and (max-width: 1919px): false
            // (min-width: 1920px): false

            let cols = 1;
            for (const value of Object.values(breakpoints.breakpoints)) {
                if (value) {
                    return side ? cols - 1 : cols;
                }
                cols++;
            }
        })
    );

    constructor(private breakpointObserver: BreakpointObserver, private realtyService: RealtyService) {
    }
}
