import { Component, Input } from '@angular/core';
import { Calculation } from 'src/app/shared/models/calculation.model';
import { MultiOutput } from 'src/app/shared/models/multi-output.model';
import { TertiaryToMultiParams } from 'src/app/shared/models/tertiary-to-multi-params.model';

@Component({
  selector: 'app-tertiary-to-multi-results[calculation]',
  templateUrl: './tertiary-to-multi-results.component.html',
  styleUrls: ['./tertiary-to-multi-results.component.scss'],
})
export class TertiaryToMultiResultsComponent {
  @Input() calculation: Calculation<TertiaryToMultiParams, MultiOutput> | undefined;
}
