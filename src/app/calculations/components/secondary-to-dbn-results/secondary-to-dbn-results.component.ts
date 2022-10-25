import { Component, Input } from '@angular/core';
import { Calculation } from 'src/app/shared/models/calculation.model';
import { SecondaryOutput } from 'src/app/shared/models/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/secondary-to-dbn-params.module';

@Component({
  selector: 'app-secondary-to-dbn-results',
  templateUrl: './secondary-to-dbn-results.component.html',
  styleUrls: ['./secondary-to-dbn-results.component.scss'],
})
export class SecondaryToDbnResultsComponent {
  @Input() results: Calculation<SecondaryToDbnParams, SecondaryOutput> | undefined;
  reanalyzeParams: SecondaryToDbnParams | undefined;
  loading = false;

  onParamsChange(event: SecondaryToDbnParams) {
    this.reanalyzeParams = event;
  }

  reanalyze() {
    // TODO: reanalyze with different parameters
    this.loading = true;
  }
}
