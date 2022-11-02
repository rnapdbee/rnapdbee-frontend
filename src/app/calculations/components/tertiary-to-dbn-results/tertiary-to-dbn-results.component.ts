import { Component, Input } from '@angular/core';
import { Calculation } from 'src/app/shared/models/calculation.model';
import { TertiaryOutput } from 'src/app/shared/models/tertiary-output.model';
import { TertiaryToDbnParams } from 'src/app/shared/models/tertiary-to-dbn-params.model';

@Component({
  selector: 'app-tertiary-to-dbn-results[calculation]',
  templateUrl: './tertiary-to-dbn-results.component.html',
  styleUrls: ['./tertiary-to-dbn-results.component.scss'],
})
export class TertiaryToDbnResultsComponent {
  @Input() calculation: Calculation<TertiaryToDbnParams, TertiaryOutput> | undefined;
}
