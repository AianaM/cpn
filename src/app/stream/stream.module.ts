import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StreamRoutingModule} from './stream-routing.module';
import {IndexComponent} from './index/index.component';
import {SharedModule} from '../shared/shared.module';
import {FilterFormComponent} from './filter-form/filter-form.component';

@NgModule({
    imports: [
        CommonModule,
        StreamRoutingModule, SharedModule
    ],
    declarations: [IndexComponent, FilterFormComponent]
})
export class StreamModule {
}
