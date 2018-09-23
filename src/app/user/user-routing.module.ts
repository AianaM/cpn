import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {LoginComponent} from './login/login.component';
import {EditComponent} from './edit/edit.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
    {path: '', component: IndexComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'edit', component: EditComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
