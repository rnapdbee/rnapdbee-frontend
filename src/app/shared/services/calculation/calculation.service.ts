import { Injectable } from '@angular/core';
import { defer } from 'rxjs';
import { SecondaryToDbnParams } from '../../models/secondary-to-dbn-params.module';
import { UploadMethod } from '../../models/upload-type.model';
import { SecondaryToDbnService } from './secondary-to-dbn.service';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  constructor(private readonly secondaryToDbnService: SecondaryToDbnService) {}

  calculateSecondaryToDbn(params: SecondaryToDbnParams, content: UploadMethod) {
    defer(() => {
      this.navigateToLoadingScreen();
      return this.secondaryToDbnService.calculate(params, content);
    }).subscribe(data => {
      if (data) {
        // TODO: this.navigateToResultsScreen(data.id, data.results);
      } else {
        // TODO: this.navigateToErrorScreen(data.id, 'errormsg');
      }
    });
  }

  private navigateToLoadingScreen(): void {
    // TODO: router.navigate['loading'];
  }
}
