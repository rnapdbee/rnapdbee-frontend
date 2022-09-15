import { Injectable } from '@angular/core';
import { defer } from 'rxjs';
import { DbnToImageParams } from '../../models/dbn-to-image-params.model';
import { SecondaryToDbnParams } from '../../models/secondary-to-dbn-params.module';
import { TertiaryToDbnParams } from '../../models/tertiary-to-dbn-params.model';
import { TertiaryToMultiParams } from '../../models/tertiary-to-multi-params.model';
import { UploadMethod } from '../../models/upload-type.model';
import { DbnToImageService } from './dbn-to-image.service';
import { SecondaryToDbnService } from './secondary-to-dbn.service';
import { TertiaryToDbnService } from './tertiary-to-dbn.service';
import { TertiaryToMultiService } from './tertiary-to-multi.service';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  constructor(
    private readonly tertiaryToDbnService: TertiaryToDbnService,
    private readonly secondaryToDbnService: SecondaryToDbnService,
    private readonly dbnToImageService: DbnToImageService,
    private readonly tertiaryToMultiService: TertiaryToMultiService,
  ) { }

  calculateTertiaryToDbn(params: TertiaryToDbnParams, content: UploadMethod) {
    defer(() => {
      this.navigateToLoadingScreen();
      return this.tertiaryToDbnService.calculate(params, content);
    }).subscribe({
      next: _ => {
        // TODO: this.navigateTo3DResultsScreen(data);
      },
      error: _ => {
        // TODO: this.navigateToErrorScreen(data);
      },
    });
  }

  findTertiaryToDbnById(id: string) {
    defer(() => {
      this.navigateToLoadingScreen();
      return this.tertiaryToDbnService.findById(id);
    }).subscribe({
      next: _ => {
        // TODO: this.navigateTo3DResultsScreen(data);
      },
      error: _ => {
        // TODO: this.navigateToErrorScreen(data);
      },
    });
  }

  calculateSecondaryToDbn(params: SecondaryToDbnParams, content: UploadMethod) {
    defer(() => {
      this.navigateToLoadingScreen();
      return this.secondaryToDbnService.calculate(params, content);
    }).subscribe({
      next: _ => {
        // TODO: this.navigateTo2DResultsScreen(data);
      },
      error: _ => {
        // TODO: this.navigateToErrorScreen(data);
      },
    });
  }

  findSecondaryToDbnById(id: string) {
    defer(() => {
      this.navigateToLoadingScreen();
      return this.secondaryToDbnService.findById(id);
    }).subscribe({
      next: _ => {
        // TODO: this.navigateTo2DResultsScreen(data);
      },
      error: _ => {
        // TODO: this.navigateToErrorScreen(data);
      },
    });
  }

  calculateDbnToImage(params: DbnToImageParams, content: UploadMethod) {
    defer(() => {
      this.navigateToLoadingScreen();
      return this.dbnToImageService.calculate(params, content);
    }).subscribe({
      next: _ => {
        // TODO: this.navigateTo2DResultsScreen(data);
      },
      error: _ => {
        // TODO: this.navigateToErrorScreen(data);
      },
    });
  }

  findDbnToImageById(id: string) {
    defer(() => {
      this.navigateToLoadingScreen();
      return this.dbnToImageService.findById(id);
    }).subscribe({
      next: _ => {
        // TODO: this.navigateTo2DResultsScreen(data);
      },
      error: _ => {
        // TODO: this.navigateToErrorScreen(data);
      },
    });
  }

  calculateTertiaryToMulti(params: TertiaryToMultiParams, content: UploadMethod) {
    defer(() => {
      this.navigateToLoadingScreen();
      return this.tertiaryToMultiService.calculate(params, content);
    }).subscribe({
      next: _ => {
        // TODO: this.navigateToMutliResultsScreen(data);
      },
      error: _ => {
        // TODO: this.navigateToErrorScreen(data);
      },
    });
  }

  findTertiaryToMultiById(id: string) {
    defer(() => {
      this.navigateToLoadingScreen();
      return this.tertiaryToMultiService.findById(id);
    }).subscribe({
      next: _ => {
        // TODO: this.navigateToMultiResultsScreen(data);
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
