import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) { }

  // Function to display a snackbar with the provided message
  showSnackbar(message: string) {

    // Configure the snackbar duration and position
    const config: MatSnackBarConfig = {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    };

    // Open the snackbar with the given message and configured options
    this.snackBar.open(message, '', config);
  }
}
