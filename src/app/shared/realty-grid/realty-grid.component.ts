import {Component, Input, OnInit} from '@angular/core';
import {Address, Realty} from '../../realty/realty';
import {combineLatest, Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {AppService} from '../../app.service';

@Component({
    selector: 'app-realty-grid',
    templateUrl: './realty-grid.component.html',
    styleUrls: ['./realty-grid.component.scss']
})
export class RealtyGridComponent implements OnInit {
    @Input() realtyGroups: { title: string, realty: Realty[] }[];
    @Input() addressGroups: { title: string, addresses: Address[] }[];

    cols$: Observable<number> = combineLatest(
        this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]),
        this.appService.sideOpened$
    ).pipe(
        map(([breakpoints, side]) => {
            let cols = 1;
            for (const value of Object.values(breakpoints.breakpoints)) {
                if (value) {
                    if (this.breakpointObserver.isMatched('(min-width: 1600px)')) {
                        // return side ? 4 : 5;
                        console.log(5);
                    }
                    console.log(Object.values(breakpoints.breakpoints), side && cols > 1 ? cols - 1 : cols);
                    return side && cols > 1 ? cols - 1 : cols;
                }
                cols++;
            }
        })
    );

    constructor(private breakpointObserver: BreakpointObserver, private appService: AppService) {
    }

    ngOnInit() {
    }

}
