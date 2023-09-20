// Angular core module
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {RouterLink} from "@angular/router";

// Shared and core modules
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    CoreModule,
    RouterLink,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
