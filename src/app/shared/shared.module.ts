import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    exports: [
        FlexLayoutModule,
        MatButtonModule
    ]
})
export class SharedModule {
}
