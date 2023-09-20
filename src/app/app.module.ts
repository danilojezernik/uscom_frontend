import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from "./header/header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FooterComponent} from "./footer/footer.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {CommonModule} from "@angular/common";
import {HeroComponent} from "./components/hero/hero.component";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


import {GoBackComponent} from "./components/go-back/go-back.component";
import {ErrorMessageComponent} from "./components/error-message/error-message.component";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatExpansionModule} from "@angular/material/expansion";
import {DialogPostComponent} from "./components/dialog-post/dialog-post.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {PostIdComponent} from "./pages/post-id/post-id.component";
import {PostComponent} from "./pages/post/post.component";

@NgModule({
  declarations: [
    AppComponent,
    DialogPostComponent,
    ErrorMessageComponent,
    SpinnerComponent,
    HeroComponent,
    FooterComponent,
    GoBackComponent,
    ContactComponent,
    PostIdComponent,
    PostComponent,
    HeaderComponent

  ],
  imports: [
    AppRoutingModule,
    MatProgressSpinnerModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    FlexModule,
    MatSnackBarModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    CommonModule,
    MatInputModule,
    RouterLink,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatSortModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
