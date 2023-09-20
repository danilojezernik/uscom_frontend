// Angular core imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// Angular material imports
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Custom module and routing imports
import { AppRoutingModule } from '../app-routing.module';

// Importing shared components
import { DialogPostComponent } from './components/dialog-post/dialog-post.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { GoBackComponent } from './components/go-back/go-back.component';
import { HeroComponent } from './components/hero/hero.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    DialogPostComponent,
    ErrorMessageComponent,
    GoBackComponent,
    HeroComponent,
    SpinnerComponent,
  ],
  exports: [
    DialogPostComponent,
    ErrorMessageComponent,
    GoBackComponent,
    HeroComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class SharedModule {}
