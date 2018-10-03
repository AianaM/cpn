import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSelectModule,
    MatCheckboxModule, MatTabsModule, MatGridListModule, MatExpansionModule, MatAutocompleteModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {FormsModule} from '@angular/forms';
import {SafeUrlPipe} from './safe-url.pipe';
import {PhoneFormComponent} from './phone-form/phone-form.component';
import {TeamCardComponent} from './team-card/team-card.component';
import {PhoneComponent} from './phone/phone.component';
import {UserCardComponent} from './user-card/user-card.component';
import {LogoComponent} from './logo/logo.component';
import {RealtyCardComponent} from './realty-card/realty-card.component';
import {RoomsPipe} from './rooms.pipe';
import {RealtyFilterFormComponent} from './realty-filter-form/realty-filter-form.component';
import {AddressAutocompleteComponent} from './address-autocomplete/address-autocomplete.component';
import {OwnerAutocompleteComponent} from './owner-autocomplete/owner-autocomplete.component';
import {ManagerAutocompleteFormComponent} from './manager-autocomplete-form/manager-autocomplete-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatAutocompleteModule
    ],
    declarations: [SafeUrlPipe, PhoneFormComponent, TeamCardComponent, PhoneComponent, UserCardComponent,
        LogoComponent,
        RealtyCardComponent,
        RoomsPipe,
        RealtyFilterFormComponent,
        AddressAutocompleteComponent,
        OwnerAutocompleteComponent,
        ManagerAutocompleteFormComponent
    ],
    exports: [
        FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTabsModule,
        MatGridListModule,
        MatExpansionModule,
        SafeUrlPipe,
        PhoneFormComponent,
        TeamCardComponent,
        PhoneComponent,
        UserCardComponent,
        LogoComponent,
        RealtyCardComponent,
        RoomsPipe,
        RealtyFilterFormComponent,
        AddressAutocompleteComponent,
        OwnerAutocompleteComponent,
        ManagerAutocompleteFormComponent
    ]
})
export class SharedModule {
}
