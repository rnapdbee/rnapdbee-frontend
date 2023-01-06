import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { Calculation } from '../../models/calculation/calculation.model';
import { Params } from '../../models/params/params.model';
import { UploadMethod } from '../../models/upload/upload-type.model';
import { CalculationRequestService } from '../../services/calculation/calculation-request.service';
import { RequestLoadingService } from '../../services/loading/request-loading.service';
import { SnackBarService } from '../../services/notifications/snack-bar.service';

export abstract class InputFormComponent<P extends Params, O> {
  constructor(
    protected router: Router,
    protected snackBar: SnackBarService,
    protected calculationService: CalculationRequestService<P, O>,
    protected loadingService: RequestLoadingService,
    protected routePath: string,
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  uploadMethod: UploadMethod | undefined;
  params: P | undefined;
  loading$: Observable<boolean>;

  calculateCallback = () => {
    if (!this.params) {
      throw new Error('Parameters could not be determined.');
    }
    if (!this.uploadMethod) {
      throw new Error('Upload method could not be determined.');
    }
    this.onLoadingStart();
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
    event.pipe(
      finalize(() => this.onLoadingEnd()),
    ).subscribe(data => {
      // eslint-disable-next-line no-void
      void this.router.navigate([this.routePath, data.id]);
    });
  }

  protected onLoadingEnd(): void {
    this.loadingService.loading = false;
    this.loadingService.loadingData = undefined;
  }

  protected abstract onLoadingStart(): void
}
