// Angular core imports
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Angular material imports
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';

// Angular flex layout import
import {FlexModule} from '@angular/flex-layout';

// Custom module and routing imports
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';

// Custom component imports
import {ContactComponent} from './pages/contact/contact.component';
import {PostComponent} from './pages/post/post.component';
import {PostIdComponent} from './pages/post-id/post-id.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

@NgModule({
  declarations: [
    ContactComponent,
    PostComponent,
    PostIdComponent,
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    ContactComponent,
    PostComponent,
    PostIdComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    SharedModule,
    MatSnackBarModule,
  ]
})
export class CoreModule {
}
