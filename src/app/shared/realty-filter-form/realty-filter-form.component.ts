import {Component, OnInit} from '@angular/core';
import {RealtyService} from '../../realty/realty.service';
import {Address, BANKS, Realty, RealtyFilter} from '../../realty/realty';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
    selector: 'app-realty-filter-form',
    templateUrl: './realty-filter-form.component.html',
    styleUrls: ['./realty-filter-form.component.scss']
})
export class RealtyFilterFormComponent implements OnInit {

    filters: RealtyFilter = new RealtyFilter();

    readonly categories = Realty.categories;
    readonly roomsArr = Realty.roomsArr;
    readonly floorsArr = Address.floorsArr;
    readonly features = Realty.features;
    readonly districts = Address.districts;
    readonly buildingTypes = Address.buildingTypes;
    readonly developers = Address.developers;
    readonly quarters = Address.quarters;
    readonly banks = BANKS;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
        .pipe(
            map(result => result.matches)
        );

    constructor(private realtyService: RealtyService, private breakpointObserver: BreakpointObserver, private router: Router) {
    }

    ngOnInit() {
        this.realtyService.filter.asObservable().subscribe(val => this.filters = val);
    }

    onAddressChange(event) {
        this.filters.street = event.street;
        this.filters.number = event.number;
    }

    resetForm() {
        this.realtyService.filter.next(new RealtyFilter());
    }

    onSubmit() {
        this.realtyService.filter.next(this.filters);
        this.router.navigate(['/realty']);
    }
}
