import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiModule} from './services/api/api.module';
import {environment} from "../environments/environment";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from "./header/header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FooterComponent} from "./footer/footer.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ApiModule.forRoot({rootUrl: environment.backUrl}),
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HeaderComponent,
        MatToolbarModule,
        MatButtonModule,
        FlexModule,
        MatSnackBarModule,
        FooterComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
