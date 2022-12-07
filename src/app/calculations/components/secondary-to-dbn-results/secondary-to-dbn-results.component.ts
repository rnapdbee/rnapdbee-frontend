import { Component } from '@angular/core';
import { ResultsComponent } from 'src/app/shared/components/results/results.component';
import { SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/params/secondary-to-dbn-params.model';
import { SecondarySelect } from 'src/app/shared/models/select/secondary-select.model';
import { SecondaryToDbnService } from 'src/app/shared/services/calculation/secondary-to-dbn.service';
import { DescriptionService } from 'src/app/shared/services/result/description.service';

@Component({
  selector: 'app-secondary-to-dbn-results[calculation]',
  templateUrl: './secondary-to-dbn-results.component.html',
  styleUrls: ['./secondary-to-dbn-results.component.scss'],
})
export class SecondaryToDbnResultsComponent extends ResultsComponent<SecondaryToDbnParams, SecondaryOutput, SecondarySelect> {
  constructor(
    calculationService: SecondaryToDbnService,
    private readonly descriptionService: DescriptionService,
  ) {
    super(calculationService, SecondarySelect);
  }

  getDescription(params: SecondaryToDbnParams) {
    return this.descriptionService.generateSecondaryDescription(params);
  }
}
