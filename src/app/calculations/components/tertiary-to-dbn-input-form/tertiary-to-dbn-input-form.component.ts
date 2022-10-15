import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { defer, finalize } from 'rxjs';
import { Calculation } from 'src/app/shared/models/calculation.model';
import { TertiaryOutput } from 'src/app/shared/models/tertiary-output.model';
import { TertiaryToDbnParams } from 'src/app/shared/models/tertiary-to-dbn-params.model';
import { UploadMethod } from 'src/app/shared/models/upload-type.model';
import { TertiaryToDbnService } from 'src/app/shared/services/calculation/tertiary-to-dbn.service';
import { SnackBarService } from 'src/app/shared/services/notifications/snack-bar.service';

@Component({
  selector: 'app-tertiary-to-dbn-input-form',
  templateUrl: './tertiary-to-dbn-input-form.component.html',
  styleUrls: ['./tertiary-to-dbn-input-form.component.scss'],
})
export class TertiaryToDBNInputFormComponent {
  constructor(
    private readonly router: Router,
    private readonly tertiaryToDbnService: TertiaryToDbnService,
    private readonly snackBar: SnackBarService,
  ) { }

  uploadMethod: UploadMethod | undefined;
  params: TertiaryToDbnParams | undefined;
  loading = false;


  isValid(): boolean {
    return !!(this.uploadMethod && this.uploadMethod.valid);
  }

  onParamsChange(event: TertiaryToDbnParams) {
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

        return this.tertiaryToDbnService.calculate(this.params, this.uploadMethod);
      })
        .pipe(
          finalize(() => { this.loading = false; }),
        )
        .subscribe({
          next: (data: Calculation<TertiaryToDbnParams, TertiaryOutput>) => {
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
