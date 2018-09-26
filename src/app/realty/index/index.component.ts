import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {Breakpoints, BreakpointState, BreakpointObserver} from '@angular/cdk/layout';
import {RealtyService} from '../realty.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    realty$ = this.realtyService.realty$.pipe(
        map(realty => realty['hydra:member'])
    );

    constructor(private breakpointObserver: BreakpointObserver, private realtyService: RealtyService) {
    }
}
