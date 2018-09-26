import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RealtyRoutingModule} from './realty-routing.module';
import {IndexComponent} from './index/index.component';
import {SharedModule} from '../shared/shared.module';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
    imports: [
        CommonModule,
        RealtyRoutingModule, SharedModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, LayoutModule
    ],
    declarations: [IndexComponent]
})
export class RealtyModule {
}
