import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InputFormComponent } from 'src/app/shared/components/input-form/input-form.component';
import { SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/params/secondary-to-dbn-params.model';
import { SecondaryToDbnService } from 'src/app/shared/services/calculation/secondary-to-dbn.service';
import { RequestLoadingService } from 'src/app/shared/services/loading/request-loading.service';
import { SnackBarService } from 'src/app/shared/services/notifications/snack-bar.service';
import { DescriptionService } from 'src/app/shared/services/result/description.service';

@Component({
  selector: 'app-secondary-to-dbn-input-form',
  templateUrl: './secondary-to-dbn-input-form.component.html',
  styleUrls: ['./secondary-to-dbn-input-form.component.scss'],
})
export class SecondaryToDbnInputFormComponent extends InputFormComponent<SecondaryToDbnParams, SecondaryOutput> {
  constructor(
    router: Router,
    snackBar: SnackBarService,
    calculationService: SecondaryToDbnService,
    loadingService: RequestLoadingService,
    private readonly descriptionService: DescriptionService,
  ) {
    super(router, snackBar, calculationService, loadingService, 'results/2d');
  }

  onLoadingStart() {
    if (this.params) {
      this.loadingService.loading = true;
      this.loadingService.loadingData = {
        scenario: '2D → (...)',
        scenarioInfo: 'Secondary structure topology of RNA derived from base pair list provided in BPSEQ, CT or DBN.',
        description: this.descriptionService.generateSecondaryDescription(this.params),
      };
    }
  }
}
