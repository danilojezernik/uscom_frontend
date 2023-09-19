import { Component } from '@angular/core';
import { CommonModule, Location  } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-go-back',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatButtonModule],
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.css']
})
export class GoBackComponent {
  constructor(
      private location: Location
  ) {
  }

  goBack() {
    this.location.back()
  }
}
