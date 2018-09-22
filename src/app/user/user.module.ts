import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {IndexComponent} from './index/index.component';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule, SharedModule
    ],
    declarations: [IndexComponent, LoginComponent]
})
export class UserModule {
}
