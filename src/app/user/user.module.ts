import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {IndexComponent} from './index/index.component';
import {SharedModule} from '../shared/shared.module';
import {ProfileComponent} from './profile/profile.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RolesFormComponent } from './roles-form/roles-form.component';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule, SharedModule
    ],
    declarations: [IndexComponent, ProfileComponent, SignInComponent, SignUpComponent, UserFormComponent, RolesFormComponent]
})
export class UserModule {
}
