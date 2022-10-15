import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { defer, finalize } from 'rxjs';
import { Calculation } from 'src/app/shared/models/calculation.model';
import { SecondaryOutput } from 'src/app/shared/models/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/secondary-to-dbn-params.module';
import { UploadMethod } from 'src/app/shared/models/upload-type.model';
import { SecondaryToDbnService } from 'src/app/shared/services/calculation/secondary-to-dbn.service';
import { SnackBarService } from 'src/app/shared/services/notifications/snack-bar.service';

@Component({
  selector: 'app-secondary-to-dbn-input-form',
  templateUrl: './secondary-to-dbn-input-form.component.html',
  styleUrls: ['./secondary-to-dbn-input-form.component.scss'],
})
export class SecondaryToDbnInputFormComponent {
  constructor(
    private readonly router: Router,
    private readonly secondaryToDbnService: SecondaryToDbnService,
    private readonly snackBar: SnackBarService,
  ) { }

  uploadMethod: UploadMethod | undefined;
  params: SecondaryToDbnParams | undefined;
  loading = false;


  isValid(): boolean {
    return !!(this.uploadMethod && this.uploadMethod.valid);
  }

  onParamsChange(event: SecondaryToDbnParams) {
    this.params = event;
  }

  onUploadMethodChange(event: UploadMethod): void {
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

        return this.secondaryToDbnService.calculate(this.params, this.uploadMethod);
      })
        .pipe(
          finalize(() => { this.loading = false; }),
        )
        .subscribe({
          next: (data: Calculation<SecondaryToDbnParams, SecondaryOutput>) => {
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
