import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Calculation } from '../../models/calculation/calculation.model';
import { Params } from '../../models/params/params.model';
import { CalculationRequestService } from '../../services/calculation/calculation-request.service';
import { ErrorService } from '../../services/error/error.service';

export abstract class CalculationPageComponent<P extends Params, O> {
  calculationResults$: Observable<Calculation<P, O> | null>;
  error: string | null = null;
  id: string | undefined;

  constructor(
    protected route: ActivatedRoute,
    protected calculationService: CalculationRequestService<P, O>,
    protected errorService: ErrorService,
    protected titleService: Title,
  ) {
    this.calculationResults$ = this.calculationService.calculationResults$;
    this.titleService.setTitle('Results | RNApdbee');

    this.getId().subscribe({
      next: id => {
        if (this.calculationService.calculationResults?.id !== id) {
          this.findById(id);
        }
      },
      error: (error: Error | HttpErrorResponse) => {
        this.handleError(error);
      },
    });

    this.calculationResults$.subscribe(data => {
      if (data != null && data.filename) {
        this.titleService.setTitle(`${data.filename} results | RNApdbee`);
      }
    });
  }

  protected getId(): Observable<string> {
    return this.route.params.pipe(
      map(params => {
        const { id } = params;
        if (id) {
          return id as string;
        }
        throw new Error('Calculation ID could not be read. Please provide valid ID in url path');
      }),
      tap(id => { this.id = id; }),
    );
  }

  private findById(id: string) {
    this.calculationService.find(id).subscribe({
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
        this.titleService.setTitle('Results error | RNApdbee');
      },
    });
  }

  private handleError(error: Error | HttpErrorResponse) {
    this.error = this.errorService.getErrorMessage(error);
  }
}
