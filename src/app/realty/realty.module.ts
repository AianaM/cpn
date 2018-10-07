import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RealtyRoutingModule} from './realty-routing.module';
import {IndexComponent} from './index/index.component';
import {SharedModule} from '../shared/shared.module';
import {AddressComponent} from './address/address.component';

@NgModule({
    imports: [
        CommonModule,
        RealtyRoutingModule, SharedModule
    ],
    declarations: [IndexComponent, AddressComponent]
})
export class RealtyModule {
}
