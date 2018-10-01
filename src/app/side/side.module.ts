import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SideRoutingModule} from './side-routing.module';
import {SharedModule} from '../shared/shared.module';
import {IndexComponent} from './index/index.component';
import { RealtyFormComponent } from './realty-form/realty-form.component';
import { AddressFormComponent } from './address-form/address-form.component';

@NgModule({
    imports: [
        CommonModule,
        SideRoutingModule, SharedModule
    ],
    declarations: [IndexComponent, RealtyFormComponent, AddressFormComponent]
})
export class SideModule {
}
