import { Router } from '@angular/router';
import { defer, finalize } from 'rxjs';
import { Calculation } from '../../models/calculation/calculation.model';
import { Params } from '../../models/params/params.model';
import { UploadMethod } from '../../models/upload/upload-type.model';
import { CalculationRequestService } from '../../services/calculation/calculation-request.service';
import { SnackBarService } from '../../services/notifications/snack-bar.service';

export abstract class InputFormComponent<P extends Params, O> {
  constructor(
    protected router: Router,
    protected snackBar: SnackBarService,
    protected calculationService: CalculationRequestService<P, O>,
    protected routePath: string,
  ) { }

  uploadMethod: UploadMethod | undefined;
  params: P | undefined;
  loading = false;

  isValid(): boolean {
    return !!(this.uploadMethod && this.uploadMethod.valid);
  }

  onParamsChange(event: P) {
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

        return this.calculationService.calculate(this.params, this.uploadMethod);
      })
        .pipe(
          finalize(() => { this.loading = false; }),
        )
        .subscribe({
          next: (data: Calculation<P, O>) => {
            // eslint-disable-next-line no-void
            void this.router.navigate([this.routePath, data.id]);
          },
          error: (error: Error) => {
            this.snackBar.error(error.message);
          },
        });
    }
  }
}
