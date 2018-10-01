import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RealtyRoutingModule} from './realty-routing.module';
import {IndexComponent} from './index/index.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RealtyRoutingModule, SharedModule
    ],
    declarations: [IndexComponent]
})
export class RealtyModule {
}
