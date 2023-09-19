import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent {

}
