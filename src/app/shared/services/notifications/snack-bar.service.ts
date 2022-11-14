import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const config: MatSnackBarConfig = {
  duration: 4000,
  verticalPosition: 'bottom',
  horizontalPosition: 'center',
};

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private readonly snackBar: MatSnackBar) { }

  error(message: string) {
    this.snackBar.open(message, 'OK', {
      ...config,
      panelClass: ['snack-error'],
    });
  }
}
