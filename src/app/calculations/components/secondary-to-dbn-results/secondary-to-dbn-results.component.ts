import { Component } from '@angular/core';
import { ResultsComponent } from 'src/app/shared/components/results/results.component';
import { Calculation } from 'src/app/shared/models/calculation/calculation.model';
import { SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/params/secondary-to-dbn-params.model';
import { SecondarySelect } from 'src/app/shared/models/select/secondary-select.model';
import { SecondaryToDbnService } from 'src/app/shared/services/calculation/secondary-to-dbn.service';
import { DownloadService } from 'src/app/shared/services/downlaod/download.service';
import { ApiPaths } from 'src/environments/environment';

@Component({
  selector: 'app-secondary-to-dbn-results[calculation]',
  templateUrl: './secondary-to-dbn-results.component.html',
  styleUrls: ['./secondary-to-dbn-results.component.scss'],
})
export class SecondaryToDbnResultsComponent extends ResultsComponent<SecondaryToDbnParams, SecondaryOutput, SecondarySelect> {
  constructor(
    calculationService: SecondaryToDbnService,
    downloadService: DownloadService,
  ) {
    super(calculationService, downloadService, ApiPaths.Secondary);
    this.selected = new SecondarySelect(0);
  }

  populateSelectedList(calculation: Calculation<SecondaryToDbnParams, SecondaryOutput>) {
    this.selected = new SecondarySelect(calculation.results.length);
  }
}
