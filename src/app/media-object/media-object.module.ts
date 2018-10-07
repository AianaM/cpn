import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MediaObjectRoutingModule} from './media-object-routing.module';
import {IndexComponent} from './index/index.component';
import {FilterFormComponent} from './filter-form/filter-form.component';

@NgModule({
    imports: [
        CommonModule,
        MediaObjectRoutingModule
    ],
    declarations: [IndexComponent, FilterFormComponent]
})
export class MediaObjectModule {
}
