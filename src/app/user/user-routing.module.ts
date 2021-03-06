import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AuthGuard} from './auth.guard';
import {ProfileComponent} from './profile/profile.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ManagerGuard} from './manager.guard';

const routes: Routes = [
    {path: '', component: IndexComponent, canActivate: [AuthGuard]},
    {path: 'login', component: SignInComponent},
    {path: 'registration', component: SignUpComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'profile/:id', component: ProfileComponent, canActivate: [ManagerGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
