import { Component } from '@angular/core';
import { CommonModule, Location  } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-go-back',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatButtonModule],
  templateUrl: './go-back.component.html'
})
export class GoBackComponent {
  constructor(
      private location: Location
  ) {
  }

  // Method to navigate back
  goBack() {
    this.location.back()
  }
}
