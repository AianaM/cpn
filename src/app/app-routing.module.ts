import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';

const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'index', component: IndexComponent},
    {path: 'user', loadChildren: './user/user.module#UserModule'},
    {path: 'realty', loadChildren: './realty/realty.module#RealtyModule'},
    {path: 'show', loadChildren: './side/side.module#SideModule', outlet: 'side'},
    {path: 'login', redirectTo: '/user/login', pathMatch: 'full'},
    {path: 'registration', redirectTo: '/user/registration', pathMatch: 'full'},
    {path: '**', redirectTo: '/'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
