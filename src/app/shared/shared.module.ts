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
    MatCheckboxModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {FormsModule} from '@angular/forms';
import {SafeUrlPipe} from './safe-url.pipe';
import {PhoneFormComponent} from './phone-form/phone-form.component';
import { TeamCardComponent } from './team-card/team-card.component';
import { PhoneComponent } from './phone/phone.component';
import { UserCardComponent } from './user-card/user-card.component';

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
        MatCardModule
    ],
    declarations: [SafeUrlPipe, PhoneFormComponent, TeamCardComponent, PhoneComponent, UserCardComponent],
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
        SafeUrlPipe,
        PhoneFormComponent,
        TeamCardComponent,
        PhoneComponent,
        UserCardComponent
    ]
})
export class SharedModule {
}
