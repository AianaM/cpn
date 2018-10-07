import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RealtyService} from '../realty.service';
import {switchMap} from 'rxjs/operators';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Address} from '../realty';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

    address: Address;
    displayedColumns: string[] = ['area', 'rooms', 'floor', 'price', 'status'];
    realty: MatTableDataSource = new MatTableDataSource([]);

    @ViewChild(MatSort) sort: MatSort;

    constructor(private route: ActivatedRoute, private realtyService: RealtyService) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.realtyService.getAddress(params.get('id'))))
            .subscribe(address => {
                this.address = address;
                this.setDataSource();
            });
    }

    setDataSource() {
        this.realty = new MatTableDataSource(this.address.realty);
        this.realty.sort = this.sort;
    }

}
