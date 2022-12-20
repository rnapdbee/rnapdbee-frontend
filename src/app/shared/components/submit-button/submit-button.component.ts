import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { catchError, defer, finalize, Observable, throwError } from 'rxjs';
import { Calculation } from '../../models/calculation/calculation.model';
import { RNApdbeeError } from '../../models/error/error.model';
import { Params } from '../../models/params/params.model';
import { SnackBarService } from '../../services/notifications/snack-bar.service';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent {
  @Input() callback: (() => Observable<Calculation<Params, unknown>>) | undefined;
  @Input() disabled = false;
  @Output() buttonSubmit = new EventEmitter<Observable<Calculation<Params, unknown>>>();
  loading = false;

  constructor(private readonly snackBar: SnackBarService) { }

  bind(fn: () => Observable<Calculation<Params, unknown>>): void {
    this.callback = fn;
  }

  onSubmit() {
    this.buttonSubmit.emit(
      defer(() => {
        this.loading = true;
        if (this.callback === undefined) {
          throw new Error('Submit-button: Callback function is not provided');
        }
        return this.callback();
      })
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
          catchError((error: HttpErrorResponse) => {
            if ('message' in error.error) {
              this.snackBar.error(`${(error.error as RNApdbeeError).message}`);
            } else {
              this.snackBar.error(`${error.name}: ${error.statusText}. Please try again later.`);
            }
            return throwError(() => error);
          }),
        ),
    );
  }
}
