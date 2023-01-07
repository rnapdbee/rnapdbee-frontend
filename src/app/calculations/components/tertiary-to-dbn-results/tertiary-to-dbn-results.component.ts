import { Component } from '@angular/core';
import { ResultsComponent } from 'src/app/shared/components/results/results.component';
import { Calculation } from 'src/app/shared/models/calculation/calculation.model';
import { TertiaryOutput } from 'src/app/shared/models/output/tertiary-output.model';
import { TertiaryToDbnParams } from 'src/app/shared/models/params/tertiary-to-dbn-params.model';
import { TertiarySelect } from 'src/app/shared/models/select/tertiary-select.model';
import { TertiaryToDbnService } from 'src/app/shared/services/calculation/tertiary-to-dbn.service';
import { DownloadService } from 'src/app/shared/services/downlaod/download.service';
import { ApiPaths } from 'src/environments/environment';

@Component({
  selector: 'app-tertiary-to-dbn-results[calculation]',
  templateUrl: './tertiary-to-dbn-results.component.html',
  styleUrls: ['./tertiary-to-dbn-results.component.scss'],
})
export class TertiaryToDbnResultsComponent extends ResultsComponent<TertiaryToDbnParams, TertiaryOutput, TertiarySelect> {
  constructor(
    calculationService: TertiaryToDbnService,
    downloadService: DownloadService,
  ) {
    super(calculationService, downloadService, ApiPaths.Tertiary);
    this.selected = new TertiarySelect([]);
  }

  populateSelectedList(calculation: Calculation<TertiaryToDbnParams, TertiaryOutput>): void {
    const modelLengths = calculation.results.map(item => item.output.models.length);
    this.selected = new TertiarySelect(modelLengths);
  }
}
