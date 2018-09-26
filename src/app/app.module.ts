import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';

import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {NavComponent} from './nav/nav.component';
import {IndexComponent} from './index/index.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiInterceptor} from './user/api-interceptor';
import { SideComponent } from './side/side.component';

registerLocaleData(localeRu, 'ru');

@NgModule({
    declarations: [
        AppComponent, NavComponent, IndexComponent, SideComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
        {provide: LOCALE_ID, useValue: 'ru'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
