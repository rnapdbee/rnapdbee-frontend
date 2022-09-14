import { Injectable } from '@angular/core';
import { defer } from 'rxjs';
import { SecondaryToDbnParams } from '../../models/secondary-to-dbn-params.module';
import { UploadMethod } from '../../models/upload-type.model';
import { SecondaryToDbnService } from './secondary-to-dbn.service';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  constructor(private readonly secondaryToDbnService: SecondaryToDbnService) { }

  calculateSecondaryToDbn(params: SecondaryToDbnParams, content: UploadMethod) {
    defer(() => {
      this.navigateToLoadingScreen();
      return this.secondaryToDbnService.calculate(params, content);
    }).subscribe({
      next: _ => {
        // TODO: this.navigateToResultsScreen(data);
      },
      error: _ => {
        // TODO: this.navigateToErrorScreen(data);
      },
    });
  }

  private navigateToLoadingScreen(): void {
    // TODO: router.navigate['loading'];
  }
}
