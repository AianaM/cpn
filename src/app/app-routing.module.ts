import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {SideComponent} from './side/side.component';

const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'user', loadChildren: './user/user.module#UserModule'},
    {path: 'show', component: SideComponent, outlet: 'side'},
    {path: 'show/:id', component: SideComponent, outlet: 'side'},
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
