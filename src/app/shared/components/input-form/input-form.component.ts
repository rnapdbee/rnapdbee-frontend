import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  calculateCallback = () => {
    if (!this.params) {
      throw new Error('Parameters could not be determined.');
    }
    if (!this.uploadMethod) {
      throw new Error('Upload method could not be determined.');
    }
    return this.calculationService.calculate(this.params, this.uploadMethod);
  };

  isValid(): boolean {
    return !!(this.uploadMethod && this.uploadMethod.valid);
  }

  onParamsChange(event: P) {
    this.params = event;
  }

  onUploadMethodChange(event: UploadMethod) {
    this.uploadMethod = event;
  }

  onSubmit(event: Observable<Calculation<Params, unknown>>) {
    event.subscribe(data => {
      // eslint-disable-next-line no-void
      void this.router.navigate([this.routePath, data.id]);
    });
  }
}
