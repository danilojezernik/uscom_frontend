import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) { }

  showSnackbar(message: string) {
    const config: MatSnackBarConfig = {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    };
    this.snackBar.open(message, '', config);
  }
}
