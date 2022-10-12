import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { OpenCloseAnimation } from 'src/app/shared/animations/open-close';
import { Calculation } from 'src/app/shared/models/calculation.model';
import { TertiaryOutput } from 'src/app/shared/models/tertiary-output.model';
import { TertiaryToDbnParams } from 'src/app/shared/models/tertiary-to-dbn-params.model';
import { TertiaryToDbnService } from 'src/app/shared/services/calculation/tertiary-to-dbn.service';

@Component({
  selector: 'app-tertiary-results',
  templateUrl: './tertiary-results.component.html',
  styleUrls: ['./tertiary-results.component.scss'],
  animations: [OpenCloseAnimation],
})
export class TertiaryResultsComponent {
  results$: Observable<Calculation<TertiaryToDbnParams, TertiaryOutput> | null>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly tertiaryToDbnService: TertiaryToDbnService,
  ) {
    this.results$ = this.tertiaryToDbnService.results$;

    this.getId().subscribe({
      next: id => {
        if (this.tertiaryToDbnService.results?.id !== id) {
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
    this.tertiaryToDbnService.find(id).subscribe({
      error: (error: Error) => {
        this.handleError(error);
      },
    });
  }

  private handleError(_: Error) {
    // TODO: handle errors;
  }
}
