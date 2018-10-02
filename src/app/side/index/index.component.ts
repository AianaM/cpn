import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RealtyService} from '../../realty/realty.service';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    selected = 0;
    realty$;

    constructor(private route: ActivatedRoute, private realtyService: RealtyService) {
    }

    ngOnInit() {
        this.realty$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.realtyService.getRealty(params.get('id'))),
            tap(realty => this.selected = realty ? 1 : 0)
        );
    }

}
