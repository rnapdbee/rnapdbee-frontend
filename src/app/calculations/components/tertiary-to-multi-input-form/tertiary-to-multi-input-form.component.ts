import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InputFormComponent } from 'src/app/shared/components/input-form/input-form.component';
import { MultiOutput } from 'src/app/shared/models/output/multi-output.model';
import { TertiaryToMultiParams } from 'src/app/shared/models/params/tertiary-to-multi-params.model';
import { TertiaryToMultiService } from 'src/app/shared/services/calculation/tertiary-to-multi.service';
import { RequestLoadingService } from 'src/app/shared/services/loading/request-loading.service';
import { SnackBarService } from 'src/app/shared/services/notifications/snack-bar.service';
import { DescriptionService } from 'src/app/shared/services/result/description.service';

@Component({
  selector: 'app-tertiary-to-multi-input-form',
  templateUrl: './tertiary-to-multi-input-form.component.html',
  styleUrls: ['./tertiary-to-multi-input-form.component.scss'],
})
export class TertiaryToMultiInputFormComponent extends InputFormComponent<TertiaryToMultiParams, MultiOutput> {
  constructor(
    router: Router,
    snackBar: SnackBarService,
    calculationService: TertiaryToMultiService,
    loadingService: RequestLoadingService,
    private readonly descriptionService: DescriptionService,
  ) {
    super(router, snackBar, calculationService, loadingService, 'results/multi');
  }

  onLoadingStart() {
    if (this.params) {
      this.loadingService.loading = true;
      this.loadingService.loadingData = {
        scenario: '3D → multi 2D',
        scenarioInfo: `Set of multiple secondary structures of RNA derived from its tertiary structure provided in PDB or PDBx/mmCIF file
          based on various results of intermediate processing steps.`,
        description: this.descriptionService.generateMultiDescription(this.params),
      };
    }
  }
}
