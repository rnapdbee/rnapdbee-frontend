import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Calculation } from 'src/app/shared/models/calculation.model';
import { MultiOutput } from 'src/app/shared/models/multi-output.model';
import { TertiaryToMultiParams } from 'src/app/shared/models/tertiary-to-multi-params.model';
import { TertiaryToMultiService } from 'src/app/shared/services/calculation/tertiary-to-multi.service';

@Component({
  selector: 'app-multi-page',
  templateUrl: './multi-page.component.html',
  styleUrls: ['./multi-page.component.scss'],
})
export class MultiPageComponent {
  calculationResults$: Observable<Calculation<TertiaryToMultiParams, MultiOutput> | null>;
  error: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly tertiaryToMultiService: TertiaryToMultiService,
  ) {
    this.calculationResults$ = this.tertiaryToMultiService.calculationResults$;

    this.getId().subscribe({
      next: id => {
        if (this.tertiaryToMultiService.calculationResults?.id !== id) {
          this.findById(id);
        }
      },
      error: (error: Error) => {
        this.handleError(error);
      },
    });
  }

  private getId(): Observable<string> {
    return this.route.params.pipe(map(params => {
      const { id } = params;
      if (id) {
        return id as string;
      }
      throw new Error('Calculation ID could not be read. Please provide valid ID in url path');
    }));
  }

  private findById(id: string) {
    this.tertiaryToMultiService.find(id).subscribe({
      error: (error: Error) => {
        this.handleError(error);
      },
    });
  }

  private handleError(error: Error) {
    this.error = error.message;
  }
}
