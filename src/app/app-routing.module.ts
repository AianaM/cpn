import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';

const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'user', loadChildren: './user/user.module#UserModule'},
    {path: 'login', redirectTo: '/user/login', pathMatch: 'full'},
    {path: '**', redirectTo: '/'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
