import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { defer, finalize } from 'rxjs';
import { Calculation } from 'src/app/shared/models/calculation.model';
import { MultiOutput } from 'src/app/shared/models/multi-output.model';
import { TertiaryToMultiParams } from 'src/app/shared/models/tertiary-to-multi-params.model';
import { UploadMethod } from 'src/app/shared/models/upload-type.model';
import { TertiaryToMultiService } from 'src/app/shared/services/calculation/tertiary-to-multi.service';
import { SnackBarService } from 'src/app/shared/services/notifications/snack-bar.service';

@Component({
  selector: 'app-tertiary-to-multi-input-form',
  templateUrl: './tertiary-to-multi-input-form.component.html',
  styleUrls: ['./tertiary-to-multi-input-form.component.scss'],
})
export class TertiaryToMultiInputFormComponent {
  constructor(
    private readonly router: Router,
    private readonly tertiaryToMultiService: TertiaryToMultiService,
    private readonly snackBar: SnackBarService,
  ) { }

  uploadMethod: UploadMethod | undefined;
  params: TertiaryToMultiParams | undefined;
  loading = false;


  isValid(): boolean {
    return !!(this.uploadMethod && this.uploadMethod.valid);
  }

  onParamsChange(event: TertiaryToMultiParams) {
    this.params = event;
  }

  onUploadMethodChange(event: UploadMethod) {
    this.uploadMethod = event;
  }

  onSubmit(): void {
    if (this.isValid()) {
      defer(() => {
        this.loading = true;

        if (!this.uploadMethod) {
          throw new Error('Upload method could not be defined.');
        }

        if (!this.params) {
          throw new Error('Parameters could not be defined.');
        }

        return this.tertiaryToMultiService.calculate(this.params, this.uploadMethod);
      })
        .pipe(
          finalize(() => { this.loading = false; }),
        )
        .subscribe({
          next: (data: Calculation<TertiaryToMultiParams, MultiOutput>) => {
            // eslint-disable-next-line no-void
            void this.router.navigate(['results/3d', data.id]);
          },
          error: (error: Error) => {
            this.snackBar.error(error.message);
          },
        });
    }
  }
}
