import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Calculation } from 'src/app/shared/models/calculation.model';
import { SecondaryOutput } from 'src/app/shared/models/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/secondary-to-dbn-params.module';
import { SecondaryToDbnService } from 'src/app/shared/services/calculation/secondary-to-dbn.service';

@Component({
  selector: 'app-secondary-page',
  templateUrl: './secondary-page.component.html',
  styleUrls: ['./secondary-page.component.scss'],
})
export class SecondaryPageComponent {
  results$: Observable<Calculation<SecondaryToDbnParams, SecondaryOutput> | null>;
  error: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly secondaryToDbnService: SecondaryToDbnService,
  ) {
    this.results$ = this.secondaryToDbnService.results$;

    this.getId().subscribe({
      next: id => {
        if (this.secondaryToDbnService.results?.id !== id) {
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
    this.secondaryToDbnService.find(id).subscribe({
      error: (error: Error) => {
        this.handleError(error);
      },
    });
  }

  private handleError(error: Error) {
    this.error = error.message;
  }
}
