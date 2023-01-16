import { Component } from '@angular/core';
import { ResultsComponent } from 'src/app/shared/components/results/results.component';
import { Calculation } from 'src/app/shared/models/calculation/calculation.model';
import { MultiOutput } from 'src/app/shared/models/output/multi-output.model';
import { TertiaryToMultiParams } from 'src/app/shared/models/params/tertiary-to-multi-params.model';
import { MultiSelect } from 'src/app/shared/models/select/multi-select.model';
import { TertiaryToMultiService } from 'src/app/shared/services/calculation/tertiary-to-multi.service';
import { DownloadService } from 'src/app/shared/services/downlaod/download.service';
import { ApiPaths } from 'src/environments/environment';

@Component({
  selector: 'app-tertiary-to-multi-results[calculation]',
  templateUrl: './tertiary-to-multi-results.component.html',
  styleUrls: ['./tertiary-to-multi-results.component.scss'],
})
export class TertiaryToMultiResultsComponent extends ResultsComponent<TertiaryToMultiParams, MultiOutput, MultiSelect> {
  constructor(
    calculationService: TertiaryToMultiService,
    downloadService: DownloadService,
  ) {
    super(calculationService, downloadService, ApiPaths.Multi);
    this.selected = new MultiSelect([]);
  }

  populateSelectedList(calculation: Calculation<TertiaryToMultiParams, MultiOutput>): void {
    const modelLengths = calculation.results.map(item => item.output.entries.length);
    this.selected = new MultiSelect(modelLengths);
  }
}
