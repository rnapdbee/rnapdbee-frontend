import { Component, Input } from '@angular/core';
import { Calculation } from 'src/app/shared/models/calculation/calculation.model';
import { MultiOutput } from 'src/app/shared/models/output/multi-output.model';
import { TertiaryToMultiParams } from 'src/app/shared/models/params/tertiary-to-multi-params.model';

@Component({
  selector: 'app-tertiary-to-multi-results[calculation]',
  templateUrl: './tertiary-to-multi-results.component.html',
  styleUrls: ['./tertiary-to-multi-results.component.scss'],
})
export class TertiaryToMultiResultsComponent {
  @Input() calculation: Calculation<TertiaryToMultiParams, MultiOutput> | undefined;
}
