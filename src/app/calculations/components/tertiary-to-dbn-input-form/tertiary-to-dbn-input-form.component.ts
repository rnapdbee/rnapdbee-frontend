import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InputFormComponent } from 'src/app/shared/components/input-form/input-form.component';
import { TertiaryOutput } from 'src/app/shared/models/output/tertiary-output.model';
import { TertiaryToDbnParams } from 'src/app/shared/models/params/tertiary-to-dbn-params.model';
import { TertiaryToDbnService } from 'src/app/shared/services/calculation/tertiary-to-dbn.service';
import { RequestLoadingService } from 'src/app/shared/services/loading/request-loading.service';
import { SnackBarService } from 'src/app/shared/services/notifications/snack-bar.service';
import { DescriptionService } from 'src/app/shared/services/result/description.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-tertiary-to-dbn-input-form',
  templateUrl: './tertiary-to-dbn-input-form.component.html',
  styleUrls: ['./tertiary-to-dbn-input-form.component.scss'],
})
export class TertiaryToDBNInputFormComponent extends InputFormComponent<TertiaryToDbnParams, TertiaryOutput> {
  @Input() isTestLayout: boolean = false;
  constructor(
    router: Router,
    snackBar: SnackBarService,
    calculationService: TertiaryToDbnService,
    loadingService: RequestLoadingService,
    private readonly descriptionService: DescriptionService,
  ) {
    super(router, snackBar, calculationService, loadingService, 'results/3d');
  }

  onLoadingStart() {
    if (this.params) {
      this.loadingService.loading = true;
      this.loadingService.loadingData = {
        scenario: '3D → (...)',
        scenarioInfo: 'Secondary structure of RNA derived from its tertiary structure provided in PDB or PDBx/mmCIF file.',
        description: this.descriptionService.generateTertiaryDescription(this.params),
      };
    }
  }
}
