import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AddressComponent} from './address/address.component';

const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'a/:id', component: AddressComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RealtyRoutingModule {
}
