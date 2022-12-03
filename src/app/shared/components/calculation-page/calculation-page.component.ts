import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Calculation } from '../../models/calculation/calculation.model';
import { Params } from '../../models/params/params.model';
import { CalculationRequestService } from '../../services/calculation/calculation-request.service';

export abstract class CalculationPageComponent<P extends Params, O> {
  calculationResults$: Observable<Calculation<P, O> | null>;
  error: string | null = null;

  constructor(
    protected route: ActivatedRoute,
    protected calculationService: CalculationRequestService<P, O>,
  ) {
    this.calculationResults$ = this.calculationService.calculationResults$;

    this.getId().subscribe({
      next: id => {
        if (this.calculationService.calculationResults?.id !== id) {
          this.findById(id);
        }
      },
      error: (error: Error) => {
        this.handleError(error);
      },
    });
  }

  protected getId(): Observable<string> {
    return this.route.params.pipe(map(params => {
      const { id } = params;
      if (id) {
        return id as string;
      }
      throw new Error('Calculation ID could not be read. Please provide valid ID in url path');
    }));
  }

  private findById(id: string) {
    this.calculationService.find(id).subscribe({
      error: (error: Error) => {
        this.handleError(error);
      },
    });
  }

  private handleError(error: Error) {
    this.error = error.message;
  }
}
